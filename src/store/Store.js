import { configureStore } from "@reduxjs/toolkit";
import teacherReducer from "../features/teacherSlice";
import playlistReducer from "../features/playlistSlice";
import videoReducer from "../features/videoSlice"
import examReducer from "../features/examSlice"
const store = configureStore({
  reducer: {
    teacher: teacherReducer,
    playlists:playlistReducer,
    video : videoReducer,
    exam : examReducer,
  },
});

export default store;
