import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { BorderRadius, Spacing } from '../../core/theme';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'default' | 'bordered';
    borderColor?: string;
}

export const Card: React.FC<CardProps> = ({
    children,
    style,
    variant = 'default',
    borderColor,
}) => {
    const { colors } = useAppTheme();

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderColor: borderColor || colors.border,
                    shadowColor: colors.foreground,
                },
                variant === 'bordered' && styles.borderedCard,
                style,
            ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: BorderRadius.xl, // Softer curves for premium feel
        padding: Spacing.xl,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.03, // Extremely diffused
        shadowRadius: 16,
        elevation: 3,
        borderWidth: 1, // Will use theme border color for a hairline crisp edge
    },
    borderedCard: {
        borderWidth: 1.5,
    },
});
