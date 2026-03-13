import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useAppTheme } from '../../core/theme/useAppTheme';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
    rating,
    maxRating = 5,
    size = 16,
}) => {
    const { colors } = useAppTheme();

    return (
        <View style={styles.container}>
            {Array.from({ length: maxRating }, (_, i) => {
                const filledAmount = rating - i;
                let iconName = 'star';
                let color = colors.accent;
                
                if (filledAmount <= 0) {
                    iconName = 'star';
                    color = colors.mutedForeground;
                }
                
                return (
                    <Icon
                        key={i}
                        name={iconName}
                        size={size}
                        color={color}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 2,
    },
});
