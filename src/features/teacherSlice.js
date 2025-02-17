import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Endpoints
const API_BASE = "http://localhost:5000/api/teachers";

// Async Thunks

// Register Teacher
export const registerTeacher = createAsyncThunk(
  "teacher/register",
  async (teacherData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/register`, teacherData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// Login Teacher
export const loginTeacher = createAsyncThunk(
  "teacher/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/login`, credentials);
      localStorage.setItem("teacherToken", response.data.token); // Save token
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Get Teacher Profile
export const getTeacherProfile = createAsyncThunk(
  "teacher/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("teacherToken");
      if (!token) throw new Error("Unauthorized");

      const response = await axios.get(`${API_BASE}/getTeacher`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// Create Course
export const createCourse = createAsyncThunk(
  "teacher/createCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("teacherToken");
      const response = await axios.post(`${API_BASE}/course`, courseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Course creation failed");
    }
  }
);

// Logout Teacher
export const logoutTeacher = createAsyncThunk("teacher/logout", async () => {
  localStorage.removeItem("teacherToken");
  return null;
});

// Teacher Slice
const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacher: null,
    token: localStorage.getItem("teacherToken") || null,
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerTeacher.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacher = action.payload;
        state.token = action.payload.token;
        state.success = true;
      })
      .addCase(registerTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Login
      .addCase(loginTeacher.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacher = action.payload;
        state.token = action.payload.token;
        state.success = true;
      })
      .addCase(loginTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Get Teacher Profile
      .addCase(getTeacherProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTeacherProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teacher = action.payload;
      })
      .addCase(getTeacherProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create Course
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutTeacher.fulfilled, (state) => {
        state.teacher = null;
        state.token = null;
        state.success = false;
      });
  },
});

export default teacherSlice.reducer;
