import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URLs
const API_BASE_URL = 'http://localhost:5000/api/Videos';

// Add a video to a playlist
export const addVideoToPlaylist = createAsyncThunk(
  'videos/add',
  async ({ playlistId, videoData }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${playlistId}`, videoData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.video;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update a video by ID
export const updateVideo = createAsyncThunk(
  'videos/update',
  async ({ videoId, updateData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${videoId}`, updateData);
      return response.data.video;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete a video by ID
export const deleteVideo = createAsyncThunk(
  'videos/delete',
  async (videoId, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE_URL}/${videoId}`);
      return videoId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    videos: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addVideoToPlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos.push(action.payload);
      })
      .addCase(addVideoToPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(updateVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = state.videos.map((video) =>
          video._id === action.payload._id ? action.payload : video
        );
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = state.videos.filter((video) => video._id !== action.payload);
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default videoSlice.reducer;
