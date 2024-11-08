import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postNote = createAsyncThunk(
  "notes/postNote",
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/notes/",
        noteData
      );
      return response.data;
    } catch (error) {
      console.error("Error posting note:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (userId, { rejectWithValue }) => {
    console.log(`user id used for fetching notes: ${userId}`);
    try {
      const response = await axios.get(
        `http://localhost:8000/notes/?user=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  notes: [],
  error: null,
  postStatus: "idle",
  postError: null,
  getNotesStatus: "idle",
  getNotesError: null,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postNote.pending, (state) => {
        console.log("posting note...");
        state.postStatus = "loading";
      })
      .addCase(postNote.fulfilled, (state, action) => {
        console.log("post request for notes completed.");
        console.log(action.payload);
        state.notes.push(action.payload)
        state.postStatus = "succeeded";
      })
      .addCase(postNote.rejected, (state, action) => {
        console.log("failed to post note.");
        console.log(action.payload);
        state.postError = action.error.message;
        state.postStatus = "failed";
      })
      .addCase(getNotes.pending, (state) => {
        console.log("fetching notes...");
        state.getNotesStatus = "loading";
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        console.log("fetched notes successfully");
        console.log(action.payload);
        state.notes = action.payload;
        state.getNotesStatus = "success";
      })
      .addCase(getNotes.rejected, (state, action) => {
        console.log("failed to fetch notes");
        console.log(action.payload);
        state.getNotesError = action.error.message;
        state.getNotesStatus = "failed";
      });
  },
});

export default noteSlice.reducer;
