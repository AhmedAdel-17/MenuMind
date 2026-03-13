import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
    AIRecommendation,
    aiRecommendations as defaultRecs,
    profitTrends as defaultTrends,
    categoryPerformance as defaultPerf,
} from '../../data/mockData';
import { apiClient } from '../../api/apiClient';
import { API_ENDPOINTS } from '../../api/endpoints';
import { ENV } from '../../config/env';

export interface InsightsState {
    recommendations: AIRecommendation[];
    profitTrends: { week: string; profit: number; revenue: number }[];
    categoryPerformance: { category: string; profit: number; margin: number }[];
    loading: boolean;
    error: string | null;
}

const initialState: InsightsState = {
    recommendations: defaultRecs,
    profitTrends: defaultTrends,
    categoryPerformance: defaultPerf,
    loading: false,
    error: null,
};

export const fetchRecommendations = createAsyncThunk<AIRecommendation[]>(
    'insights/fetchRecommendations',
    async (_, { rejectWithValue }) => {
        try {
            if (ENV.MOCK_API) {
                return new Promise<AIRecommendation[]>(resolve => setTimeout(() => resolve(defaultRecs), 1000));
            }
            return await apiClient.get<AIRecommendation[]>(API_ENDPOINTS.INSIGHTS.RECOMMENDATIONS);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch recommendations');
        }
    }
);

const insightsSlice = createSlice({
    name: 'insights',
    initialState,
    reducers: {
        setRecommendations(state, action: PayloadAction<AIRecommendation[]>) {
            state.recommendations = action.payload;
        },
        acceptRecommendation(state, action: PayloadAction<string>) {
            state.recommendations = state.recommendations.filter(
                r => r.id !== action.payload,
            );
        },
        rejectRecommendation(state, action: PayloadAction<string>) {
            state.recommendations = state.recommendations.filter(
                r => r.id !== action.payload,
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecommendations.fulfilled, (state, action: PayloadAction<AIRecommendation[]>) => {
                state.loading = false;
                state.recommendations = action.payload;
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setRecommendations, acceptRecommendation, rejectRecommendation } =
    insightsSlice.actions;
export default insightsSlice.reducer;
