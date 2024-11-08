import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice"
import profileReducer from "./slices/profileSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    profiles: profileReducer
  },
});
