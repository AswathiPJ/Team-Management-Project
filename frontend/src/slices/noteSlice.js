import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postNote = createAsyncThunk(
  "notes/postNote",
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/notes/",
        noteData,
        { withCredentials: true }
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
        `http://localhost:8000/notes/?user=${userId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getSelectedNote = createAsyncThunk(
  "notes/getSelectedNote",
  async (noteId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/notes/${noteId}`,
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

export const editNote = createAsyncThunk(
  "notes/editNote",
  async (noteContent, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/notes/${noteContent.id}/`,
        noteContent,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error editing note:", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  notes: [],
  error: null,
  postStatus: "idle",
  postError: null,
  editNoteStatus: "idle",
  editNoteError: null,
  getNotesStatus: "idle",
  getNotesError: null,
  selectedNote: null,
  getSelectedNoteStatus: "idle",
  getSelectedNoteError: null,
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
        state.notes.push(action.payload);
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
    builder
      .addCase(getSelectedNote.pending, (state) => {
        console.log("Fetching selected note...");
        state.getSelectedNoteStatus = "loading";
      })
      .addCase(getSelectedNote.fulfilled, (state, action) => {
        console.log("Fetched selected note successfully");
        console.log(action.payload);
        state.selectedNote = action.payload;
        state.getSelectedNoteStatus = "success";
      })
      .addCase(getSelectedNote.rejected, (state, action) => {
        console.log("Failed to fetch selected note");
        console.log(action.payload);
        state.getSelectedNoteError = action.error.message;
        state.getSelectedNoteStatus = "failed";
      });
    builder
      .addCase(editNote.pending, (state) => {
        console.log("Editing note...");
        state.editNoteStatus = "loading";
      })
      .addCase(editNote.fulfilled, (state, action) => {
        console.log("Edit request for notes completed.");
        console.log(action.payload);
        state.editNoteStatus = "succeeded";
      })
      .addCase(editNote.rejected, (state, action) => {
        console.log("Failed to edit note.");
        console.log(action.error);
        state.editNoteError = action.error.message;
        state.editNoteStatus = "failed";
      });
  },
});

export default noteSlice.reducer;
