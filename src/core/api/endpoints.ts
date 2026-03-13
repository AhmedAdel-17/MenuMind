export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        PROFILE: '/auth/profile',
    },
    MENU: {
        LIST: '/menu',
        CREATE: '/menu',
        UPDATE: (id: string) => `/menu/${id}`,
        DELETE: (id: string) => `/menu/${id}`,
    },
    FEEDBACK: {
        LIST: '/feedback',
        SUBMIT: '/feedback',
    },
    INSIGHTS: {
        RECOMMENDATIONS: '/insights/recommendations',
        RESPOND: (id: string) => `/insights/recommendations/${id}/respond`,
        PROFIT: '/insights/profit',
        CATEGORY_PERFORMANCE: '/insights/categories',
    },
} as const;
