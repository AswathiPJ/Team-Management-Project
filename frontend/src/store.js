import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice"
import profileReducer from "./slices/profileSlice"
import projectReducer from "./slices/projectSlice"
import noteReducer from "./slices/noteSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    profiles: profileReducer,
    projects: projectReducer,
    notes: noteReducer,
  },
});
