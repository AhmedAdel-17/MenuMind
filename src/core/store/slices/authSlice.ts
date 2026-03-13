import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api/apiClient';
import { API_ENDPOINTS } from '../../api/endpoints';
import { ENV } from '../../config/env';

export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    restaurant: string;
    location: string;
}

export interface AuthState {
    isOnboarded: boolean;
    user: UserProfile;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isOnboarded: false,
    user: {
        name: '',
        email: '',
        phone: '',
        restaurant: '',
        location: '',
    },
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<UserProfile, Partial<UserProfile>>(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            if (ENV.MOCK_API) {
                // Return mock user if MOCK_API is enabled
                return new Promise<UserProfile>(resolve => setTimeout(() => resolve({
                    name: credentials.name || 'Mock User',
                    email: credentials.email || 'mock@example.com',
                    phone: credentials.phone || '+1234567890',
                    restaurant: credentials.restaurant || 'Mock Restaurant',
                    location: credentials.location || 'Mock Location',
                }), 1000));
            }
            const response = await apiClient.post<{ user: UserProfile }>(API_ENDPOINTS.AUTH.LOGIN, credentials);
            return response.user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        completeOnboarding(state) {
            state.isOnboarded = true;
        },
        setUserProfile(state, action: PayloadAction<Partial<UserProfile>>) {
            state.user = { ...state.user, ...action.payload };
        },
        resetAuth() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.loading = false;
                state.user = action.payload;
                state.isOnboarded = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { completeOnboarding, setUserProfile, resetAuth } = authSlice.actions;
export default authSlice.reducer;
