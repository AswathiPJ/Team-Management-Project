import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (userId, { rejectWithValue }) => {
    console.log(`user id used for fetching tasks: ${userId}`);
    try {
      const response = await axios.get(
        `http://localhost:8000/tasks/?assigned_to=${userId}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(`rejected with value ${error.response.data.detail}`);
         return rejectWithValue(error.response.data.detail);
      } else {
        console.log("rejected with value network error");
         return rejectWithValue({ error: "Network error" });
      }
    }
  }
);

const initialState = {
  task_list: [],
  status: "idle",
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      console.log("fetching tasks...")
      state.status = "loading";
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      console.log("fetched tasks successfully.")
      console.log(action.payload)
      state.task_list = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      console.log("failed to fetch tasks.")
      console.log(action.payload)
      state.error = action.error.message;
      state.status = "failed";
    });
  },
});

export default taskSlice.reducer;
