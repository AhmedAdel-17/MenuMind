import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { BorderRadius, Spacing } from '../../core/theme';

interface BadgeProps {
    children: string;
    variant?: 'default' | 'outline' | 'custom';
    backgroundColor?: string;
    textColor?: string;
    style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    backgroundColor,
    textColor,
    style,
}) => {
    const { colors } = useAppTheme();

    const bgColor =
        backgroundColor ||
        (variant === 'outline' ? 'transparent' : colors.primary);
    const txtColor =
        textColor ||
        (variant === 'outline' ? colors.foreground : colors.primaryForeground);
    const borderClr = variant === 'outline' ? colors.border : 'transparent';

    return (
        <View
            style={[
                styles.badge,
                { backgroundColor: bgColor, borderColor: borderClr },
                variant === 'outline' && styles.outlineBadge,
                style,
            ]}>
            <Text style={[styles.text, { color: txtColor }]}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.md, // Wider, elegant pill
        paddingVertical: 4,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.3, // Slight uppercase feel
    },
    outlineBadge: {
        borderWidth: 1,
    },
});
