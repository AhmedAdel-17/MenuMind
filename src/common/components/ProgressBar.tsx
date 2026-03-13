import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { BorderRadius } from '../../core/theme';

interface ProgressBarProps {
    progress: number; // 0-100
    color?: string;
    height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color,
    height = 8,
}) => {
    const { colors } = useAppTheme();
    const barColor = color || colors.primary;

    return (
        <View style={[styles.track, { backgroundColor: colors.muted, height }]}>
            <View
                style={[
                    styles.fill,
                    {
                        backgroundColor: barColor,
                        width: `${Math.min(100, Math.max(0, progress))}%`,
                        height,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    track: {
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
        width: '100%',
    },
    fill: {
        borderRadius: BorderRadius.full,
    },
});
