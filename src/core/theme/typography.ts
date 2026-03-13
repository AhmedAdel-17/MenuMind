import { TextStyle } from 'react-native';

export const Typography = {
    h1: {
        fontSize: 32,
        fontWeight: '800' as TextStyle['fontWeight'],
        lineHeight: 40,
        letterSpacing: -1,
    },
    h2: {
        fontSize: 24,
        fontWeight: '700' as TextStyle['fontWeight'],
        lineHeight: 32,
        letterSpacing: -0.5,
    },
    h3: {
        fontSize: 20,
        fontWeight: '700' as TextStyle['fontWeight'],
        lineHeight: 28,
        letterSpacing: -0.3,
    },
    h4: {
        fontSize: 18,
        fontWeight: '600' as TextStyle['fontWeight'],
        lineHeight: 26,
        letterSpacing: -0.2,
    },
    body: {
        fontSize: 16,
        fontWeight: '400' as TextStyle['fontWeight'],
        lineHeight: 24,
        letterSpacing: 0,
    },
    bodySmall: {
        fontSize: 14,
        fontWeight: '400' as TextStyle['fontWeight'],
        lineHeight: 20,
    },
    caption: {
        fontSize: 12,
        fontWeight: '400' as TextStyle['fontWeight'],
        lineHeight: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500' as TextStyle['fontWeight'],
        lineHeight: 20,
    },
    button: {
        fontSize: 16,
        fontWeight: '600' as TextStyle['fontWeight'],
        lineHeight: 24,
    },
} as const;
