import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { useAppDispatch } from '../../core/store/hooks';
import { toggleTheme } from '../../core/store/slices/themeSlice';
import { Spacing } from '../../core/theme';

interface ScreenHeaderProps {
    title: string;
    subtitle?: string;
    showBack?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
    title,
    subtitle,
    showBack = false,
}) => {
    const { colors, isDark } = useAppTheme();
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: colors.card,
                    borderBottomColor: colors.border,
                    paddingTop: insets.top + Spacing.md,
                },
            ]}>
            <View style={styles.leftContainer}>
                {showBack && (
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()} 
                        style={styles.backButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Icon name="chevron-left" size={28} color={colors.foreground} />
                    </TouchableOpacity>
                )}
                <View style={styles.textContainer}>
                    <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
                    {subtitle && (
                        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
                            {subtitle}
                        </Text>
                    )}
                </View>
            </View>
            <TouchableOpacity
                onPress={() => dispatch(toggleTheme())}
                style={[styles.themeButton, { backgroundColor: colors.muted }]}>
                <Icon
                    name={isDark ? 'sun' : 'moon'}
                    size={20}
                    color={colors.foreground}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.lg,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    backButton: {
        marginRight: Spacing.sm,
        marginTop: 2,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 14,
        marginTop: 4,
    },
    themeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
});
