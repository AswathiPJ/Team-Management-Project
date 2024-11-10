import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

const initialState = {
    token: Cookies.get("token") || null,
    refreshToken: Cookies.get("refreshToken") || null,
    username: Cookies.get("username") || null,
    userid: Cookies.get("userid") || null,
    email: Cookies.get("email") || null,
    timezone: Cookies.get('timezone') || null,
    status: Cookies.get("status") || 'idle',
    error: null
}

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8000/api/token/', credentials, {withCredentials: true});
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.log(`rejected with value ${error.response.data.detail}`);
            return rejectWithValue(error.response.data.detail);
        } else {
            console.log("rejected with value network error")
            return rejectWithValue({ error: 'Network error' });
        }
    }
});


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.username = null;
            state.email = null;
            state.timezone = null,
            state.userid = null;
            state.status = 'idle';
            state.error = null;
            Cookies.remove('token')
            Cookies.remove('refreshToken')
            Cookies.remove('username')
            Cookies.remove('email')
            Cookies.remove('timezone')
            Cookies.remove('status')
            Cookies.remove('userid')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                console.log("Login call starting.")
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("Login call succeeded.")
                console.log(action.payload)
                state.status = 'succeeded';
                state.token = action.payload.access;
                state.refreshToken = action.payload.refresh;
                state.username = action.payload.profile.username;
                state.userid = action.payload.profile.id;
                state.email = action.payload.profile.email
                state.timezone = action.payload.profile.timezone
                Cookies.set('token', action.payload.access)
                Cookies.set('refreshToken', action.payload.refresh)
                Cookies.set('username', action.payload.profile.username)
                Cookies.set('userid', action.payload.profile.id)
                Cookies.set('email', action.payload.profile.email)
                Cookies.set('timezone', action.payload.profile.timezone)
                Cookies.set('status', "succeeded")
            })
            .addCase(login.rejected, (state, action) => {
                console.log("Login call got rejected.")
                console.log(action.payload)
                state.status = 'failed';
                state.error = action.payload || 'Failed to login';
            });
    },
});

export const { logout } = authSlice.actions
export default authSlice.reducer