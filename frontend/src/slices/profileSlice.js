import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfiles = createAsyncThunk(
  "profiles/fetch",
  async (_, rejectWithValue) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/profiles/team-members",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log(`Rejected with value ${error.response?.data?.detail}`);
      return rejectWithValue(
        error.response?.data?.detail || { error: "Network error" }
      );
    }
  }
);

export const fetchSelectedProfile = createAsyncThunk(
  "profile/fetchSingle",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/profiles/team-members/${userId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log(`Rejected with value ${error.response?.data?.detail}`);
      return rejectWithValue(
        error.response?.data?.detail || { error: "Network error" }
      );
    }
  }
);

const initialState = {
  profile_list: [],
  status: "idle",
  error: null,
  selected_profile: null,
  selected_profile_status: "idle",
  selected_profile_error: null,
};

const profileSlice = createSlice({
  name: "profiles",
  initialState,
  extraReducers: (builder) => {
    //selecting full profiles
    builder.addCase(fetchProfiles.pending, (state) => {
      console.log("fetching profiles...");
      state.status = "loading";
    });
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      console.log("fetched profiles successfully.");
      console.log(action.payload);
      state.profile_list = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchProfiles.rejected, (state, action) => {
      console.log("failed to fetch profiles.");
      console.log(action.payload);
      state.error = action.error.message;
      state.status = "failed";
    });

    //selecting single task
    builder.addCase(fetchSelectedProfile.pending, (state) => {
      console.log("fetching selected profile...");
      state.selected_profile_status = "loading";
    });
    builder.addCase(fetchSelectedProfile.fulfilled, (state, action) => {
      console.log("fetched selected profile successfully.");
      console.log(action.payload);
      state.selected_profile = action.payload;
      state.selected_profile_status = "succeeded";
    });
    builder.addCase(fetchSelectedProfile.rejected, (state, action) => {
      console.log("failed to fetch selected profile.");
      console.log(action.payload);
      state.selected_profile_error = action.error.message;
      state.selected_profile_status = "failed";
    });
  },
});

export default profileSlice.reducer;
