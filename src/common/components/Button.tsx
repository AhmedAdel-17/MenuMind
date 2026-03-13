import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
} from 'react-native';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { BorderRadius, Spacing } from '../../core/theme';

interface ButtonProps {
    children: React.ReactNode;
    onPress?: () => void;
    variant?: 'primary' | 'outline' | 'ghost' | 'destructive' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    style,
    textStyle,
    fullWidth = false,
}) => {
    const { colors } = useAppTheme();

    const getBackgroundColor = () => {
        if (disabled) return colors.muted;
        switch (variant) {
            case 'primary':
                return colors.primary;
            case 'outline':
                return 'transparent';
            case 'ghost':
                return 'transparent';
            case 'destructive':
                return colors.destructive;
            case 'secondary':
                return colors.secondary;
            default:
                return colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return colors.mutedForeground;
        switch (variant) {
            case 'primary':
                return colors.primaryForeground;
            case 'outline':
                return colors.foreground;
            case 'ghost':
                return colors.foreground;
            case 'destructive':
                return colors.destructiveForeground;
            case 'secondary':
                return colors.secondaryForeground;
            default:
                return colors.primaryForeground;
        }
    };

    const getBorderColor = () => {
        if (variant === 'outline') return colors.border;
        return 'transparent';
    };

    const getPadding = () => {
        switch (size) {
            case 'sm':
                return { paddingVertical: 8, paddingHorizontal: 16 };
            case 'md':
                return { paddingVertical: 14, paddingHorizontal: 20 };
            case 'lg':
                return { paddingVertical: 16, paddingHorizontal: 32 };
        }
    };

    const getFontSize = () => {
        switch (size) {
            case 'sm':
                return 13;
            case 'md':
                return 15;
            case 'lg':
                return 16;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            style={[
                styles.button,
                getPadding(),
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                },
                variant === 'outline' && styles.outlineButton,
                fullWidth && styles.fullWidth,
                style,
            ]}>
            {loading ? (
                <ActivityIndicator color={getTextColor()} size="small" />
            ) : typeof children === 'string' ? (
                <Text
                    style={[
                        styles.text,
                        { color: getTextColor(), fontSize: getFontSize() },
                        textStyle,
                    ]}>
                    {children}
                </Text>
            ) : (
                children
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    text: {
        fontWeight: '600',
        letterSpacing: -0.2, // Premium typographic crispness
    },
    outlineButton: {
        borderWidth: 1,
    },
    fullWidth: {
        width: '100%',
    },
});
