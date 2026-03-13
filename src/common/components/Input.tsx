import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { BorderRadius, Spacing } from '../../core/theme';

interface InputProps extends TextInputProps {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, style, ...props }) => {
    const { colors } = useAppTheme();

    return (
        <View style={styles.container}>
            {label && (
                <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>
            )}
            <TextInput
                placeholderTextColor={colors.mutedForeground}
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.inputBackground,
                        color: colors.foreground,
                        borderColor: colors.border,
                    },
                    style,
                ]}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: Spacing.xs,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        fontSize: 16,
    },
});
