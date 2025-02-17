import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_BASE_URL = 'http://localhost:5001/api/playList';

// Fetch all playlists
export const fetchAllPlaylists = createAsyncThunk(
  'playlists/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data.playlists;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch a single playlist by ID
export const fetchPlaylistById = createAsyncThunk(
  'playlists/fetchById',
  async (playlistId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${playlistId}`);
      return response.data.playlist;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch playlists by teacher ID
export const fetchPlaylistsByTeacher= createAsyncThunk(
  'playlists/fetchByTeacher',
  async (teacherId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teacher/${teacherId}`);
      return response.data.playlists;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete a playlist by ID
export const deletePlaylist = createAsyncThunk(
  'playlists/delete',
  async (playlistId, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE_URL}/${playlistId}`);
      return playlistId; // Return the deleted playlist ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const playlistSlice = createSlice({
  name: 'playlists',
  initialState: {
    playlists: [],
    currentPlaylist: null,
    teacherPlaylists: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlaylists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPlaylists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = action.payload;
      })
      .addCase(fetchAllPlaylists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchPlaylistById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlaylistById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPlaylist = action.payload;
      })
      .addCase(fetchPlaylistById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchPlaylistsByTeacher.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlaylistsByTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacherPlaylists = action.payload;
      })
      .addCase(fetchPlaylistsByTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deletePlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = state.playlists.filter(
          (playlist) => playlist._id !== action.payload
        );
        state.teacherPlaylists = state.teacherPlaylists.filter(
          (playlist) => playlist._id !== action.payload
        );
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default playlistSlice.reducer;
