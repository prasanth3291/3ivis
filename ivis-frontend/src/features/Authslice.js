import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';  // Ensure this is imported correctly

// Thunk for registering a user
export const register = createAsyncThunk(
    'users/register',
    async ({ formData }, thunkAPI) => {
        const { first_name, last_name, username, email, password, confirm_password } = formData;
        const body = JSON.stringify({ first_name, last_name, username, email, password, confirm_password });
        
        try {
            const res = await axios.post('http://localhost:8000/api/register/', body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 201) {
                return res.data;
            } else {
                return thunkAPI.rejectWithValue(res.data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// Thunk for logging in a user
export const login = createAsyncThunk(
    'users/login',
    async ({ loginData }, thunkAPI) => {
        const { username, password } = loginData;
        const body = JSON.stringify({ username, password });

        try {
            const res = await axios.post('http://localhost:8000/api/login/', body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                const tokens = res.data;
                localStorage.setItem('authTokens', JSON.stringify(tokens));
                return tokens;
            } else {
                return thunkAPI.rejectWithValue(res.data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// Thunk for refreshing access tokens
export const refreshAccessToken = createAsyncThunk(
	'users/refreshAccessToken',
	async (_, thunkAPI) => {
		const authTokens = JSON.parse(localStorage.getItem('authTokens'));
		const refresh = authTokens.refresh

		try {
			const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh });
			const newTokens = response.data;
			newTokens.user = authTokens.user;
			localStorage.setItem('authTokens', JSON.stringify(newTokens));
			return newTokens;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

// Helper function to decode tokens
const loadUserFromTokens = () => {
    const storedTokens = localStorage.getItem('authTokens');
    if (storedTokens) {
        const tokens = JSON.parse(storedTokens);
        const decodedUser = jwtDecode(tokens.access);
        return {
            user: decodedUser,
            access: tokens.access,
            refresh: tokens.refresh,
            isAuthenticated: true,
        };
    }
    return {
        user: null,
        access: null,
        refresh: null,
        isAuthenticated: false,
    };
};

// Initial state for user slice
const initialState = {
    ...loadUserFromTokens(),
    loading: false,
    registered: false,
    error: null,
    register_error: null,
};

// User slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetRegistered: (state) => {
            state.registered = false;
        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.access = null;
            state.refresh = null;
            localStorage.removeItem('authTokens');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.registered = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.register_error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                const tokens = action.payload;
                const decodedUser = jwtDecode(tokens.access);
                state.user = decodedUser;
                state.access = tokens.access;
                state.refresh = tokens.refresh;
				state.error=null
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
				state.access = action.payload.access;
				state.refresh = action.payload.refresh;
				state.user=JSON.parse(localStorage.getItem('authTokens'))
			})
			.addCase(refreshAccessToken.rejected, state => {
				state.isAuthenticated = false;
				state.access = null;
				state.refresh = null;
				state.user = null;
			});;
            
    },
});

export const { logoutUser, resetRegistered } = userSlice.actions;
export default userSlice.reducer;
