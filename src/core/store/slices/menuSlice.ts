import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { MenuItem, menuItems as defaultMenuItems } from '../../data/mockData';
import { apiClient } from '../../api/apiClient';
import { API_ENDPOINTS } from '../../api/endpoints';
import { ENV } from '../../config/env';

export interface MenuState {
    items: MenuItem[];
    searchQuery: string;
    loading: boolean;
    error: string | null;
}

const initialState: MenuState = {
    items: defaultMenuItems,
    searchQuery: '',
    loading: false,
    error: null,
};

export const fetchMenuItems = createAsyncThunk<MenuItem[]>(
    'menu/fetchMenuItems',
    async (_, { rejectWithValue }) => {
        try {
            if (ENV.MOCK_API) {
                return new Promise<MenuItem[]>(resolve => setTimeout(() => resolve(defaultMenuItems), 1000));
            }
            return await apiClient.get<MenuItem[]>(API_ENDPOINTS.MENU.LIST);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch menu items');
        }
    }
);

export const createMenuItemAsync = createAsyncThunk<MenuItem, MenuItem>(
    'menu/createMenuItemAsync',
    async (newItem, { rejectWithValue }) => {
        try {
            if (ENV.MOCK_API) {
                return new Promise<MenuItem>(resolve => setTimeout(() => resolve(newItem), 1000));
            }
            return await apiClient.post<MenuItem>(API_ENDPOINTS.MENU.CREATE, newItem);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to create menu item');
        }
    }
);

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuItems(state, action: PayloadAction<MenuItem[]>) {
            state.items = action.payload;
        },
        addMenuItem(state, action: PayloadAction<MenuItem>) {
            state.items.push(action.payload);
        },
        updateMenuItem(state, action: PayloadAction<MenuItem>) {
            const index = state.items.findIndex(i => i.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        removeMenuItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Menu Items
            .addCase(fetchMenuItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenuItems.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchMenuItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create Menu Item
            .addCase(createMenuItemAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMenuItemAsync.fulfilled, (state, action: PayloadAction<MenuItem>) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(createMenuItemAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setMenuItems,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
    setSearchQuery,
    setLoading,
} = menuSlice.actions;
export default menuSlice.reducer;
