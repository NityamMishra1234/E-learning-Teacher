import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/exam";

// ✅ Create Exam
export const createExam = createAsyncThunk("exam/create", async (examData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, examData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

// ✅ Get Submitted Exams by Playlist ID
export const fetchSubmittedExams = createAsyncThunk("exam/fetchSubmitted", async (playlistId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/submitted/playlist/${playlistId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

// ✅ Review Exam
export const reviewExam = createAsyncThunk("exam/review", async (reviewData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/review`, reviewData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

const examSlice = createSlice({
  name: "exam",
  initialState: {
    exams: [],
    submittedExams: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Create Exam
      .addCase(createExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Submitted Exams
      .addCase(fetchSubmittedExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmittedExams.fulfilled, (state, action) => {
        state.loading = false;
        state.submittedExams = action.payload;
      })
      .addCase(fetchSubmittedExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Review Exam
      .addCase(reviewExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reviewExam.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(reviewExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuccessMessage } = examSlice.actions;
export default examSlice.reducer;
