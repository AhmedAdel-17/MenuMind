// In a production app this would use react-native-config or similar for env variable management.
// Placing it here allows a single source of truth for changing API targets.

export const ENV = {
    MOCK_API: true, // While true, features will resolve using async thunks and Mock data.
    DEV_API_URL: 'http://localhost:3000/api/v1',
    PROD_API_URL: 'https://api.plateful.com/v1',
};

// Toggle manually based on whether backend is ready.
export const IS_PRODUCTION = false;

export const API_BASE_URL = IS_PRODUCTION ? ENV.PROD_API_URL : ENV.DEV_API_URL;
