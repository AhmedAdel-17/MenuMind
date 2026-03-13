import { API_BASE_URL } from '../config/env';

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export const apiClient = {
    async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        // Build URL with query params
        const url = new URL(`${API_BASE_URL}${endpoint}`);
        if (options.params) {
            Object.keys(options.params).forEach(key =>
                url.searchParams.append(key, options.params![key])
            );
        }

        const headers = new Headers(options.headers);
        headers.set('Content-Type', 'application/json');
        
        // TODO: In a real app, retrieve token from secure storage and inject it here
        // const token = await SecureStore.getItemAsync('auth_token');
        // if (token) headers.set('Authorization', `Bearer ${token}`);

        try {
            const response = await fetch(url.toString(), {
                ...options,
                headers,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new ApiError(response.status, data.message || 'An error occurred');
            }

            return data as T;
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw new Error(error instanceof Error ? error.message : 'Network error');
        }
    },

    get<T>(endpoint: string, params?: Record<string, string>) {
        return this.request<T>(endpoint, { method: 'GET', params });
    },

    post<T>(endpoint: string, body: any) {
        return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) });
    },

    put<T>(endpoint: string, body: any) {
        return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) });
    },

    delete<T>(endpoint: string) {
        return this.request<T>(endpoint, { method: 'DELETE' });
    },
};
