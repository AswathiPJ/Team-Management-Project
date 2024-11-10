import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetch",
  async (userId, { rejectWithValue }) => {
    console.log(`user id used for fetching projects: ${userId}`);
    try {
      const response = await axios.get(
        `http://localhost:8000/projects/users/?user=${userId}`, {withCredentials: true}
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

export const fetchSelectedProject = createAsyncThunk(
  "projects/fetchSingle",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/projects/${projectId}`, {withCredentials: true});
      return response.data;
    } catch (error) {
      console.log(`Rejected with value ${error.response?.data?.detail}`);
      return rejectWithValue(error.response?.data?.detail || { error: "Network error" });
    }
  }
);

const initialState = {
  project_list: [],
  status: "idle",
  error: null,
  selected_project: null,
  selected_project_status: "idle",
  selected_project_error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  extraReducers: (builder) => {
    //selecting full projects of user
    builder.addCase(fetchProjects.pending, (state) => {
      console.log("fetching projects...")
      state.status = "loading";
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      console.log("fetched projects successfully.")
      console.log(action.payload)
      state.project_list = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      console.log("failed to fetch projects.")
      console.log(action.error)
      state.error = action.error.message;
      state.status = "failed";
    });

    //selecting single project
    builder.addCase(fetchSelectedProject.pending, (state) => {
      console.log("fetching selected project...")
      state.selected_project_status = "loading";
    });
    builder.addCase(fetchSelectedProject.fulfilled, (state, action) => {
      console.log("fetched selected project successfully.")
      console.log(action.payload)
      state.selected_project = action.payload;
      state.selected_project_status = "succeeded"
    });
    builder.addCase(fetchSelectedProject.rejected, (state, action) => {
      console.log("failed to fetch selected project.")
      console.log(action.payload)
      state.selected_project_error = action.error.message;
      state.selected_project_status = "failed";
    });
  },
});

export default projectSlice.reducer;
