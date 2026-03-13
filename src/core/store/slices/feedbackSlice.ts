import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Feedback, feedbackData as defaultFeedback } from '../../data/mockData';
import { apiClient } from '../../api/apiClient';
import { API_ENDPOINTS } from '../../api/endpoints';
import { ENV } from '../../config/env';

export interface FeedbackState {
    items: Feedback[];
    loading: boolean;
    error: string | null;
}

const initialState: FeedbackState = {
    items: defaultFeedback,
    loading: false,
    error: null,
};

export const fetchFeedback = createAsyncThunk<Feedback[]>(
    'feedback/fetchFeedback',
    async (_, { rejectWithValue }) => {
        try {
            if (ENV.MOCK_API) {
                return new Promise<Feedback[]>(resolve => setTimeout(() => resolve(defaultFeedback), 1000));
            }
            return await apiClient.get<Feedback[]>(API_ENDPOINTS.FEEDBACK.LIST);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch feedback');
        }
    }
);

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        setFeedback(state, action: PayloadAction<Feedback[]>) {
            state.items = action.payload;
        },
        addFeedback(state, action: PayloadAction<Feedback>) {
            state.items.unshift(action.payload);
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedback.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeedback.fulfilled, (state, action: PayloadAction<Feedback[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setFeedback, addFeedback, setLoading } = feedbackSlice.actions;
export default feedbackSlice.reducer;
