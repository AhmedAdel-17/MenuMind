import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { useAppSelector } from '../../core/store/hooks';
import type { MenuStackParamList } from '../../navigation/MainTabNavigator';
import { ScreenHeader } from '../../common/components/ScreenHeader';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Button } from '../../common/components/Button';
import { Spacing, BorderRadius } from '../../core/theme';

type MenuItemDetailsRouteProp = RouteProp<MenuStackParamList, 'MenuItemDetails'>;

const MenuItemDetailsScreen: React.FC = () => {
    const { colors } = useAppTheme();
    const route = useRoute<MenuItemDetailsRouteProp>();
    const { itemId } = route.params;

    // Fetch the specific item from the Redux store
    const item = useAppSelector(state => 
        state.menu.items.find(i => i.id === itemId)
    );

    if (!item) {
        return (
            <View style={[styles.screen, { backgroundColor: colors.background }]}>
                <ScreenHeader title="Item Not Found" showBack />
                <View style={styles.centerContent}>
                    <Text style={{ color: colors.mutedForeground }}>This menu item could not be found.</Text>
                </View>
            </View>
        );
    }

    const getMarginBadgeColors = (marginPercent: number) => {
        if (marginPercent >= 60)
            return { bg: colors.primary + '1A', text: colors.primary };
        if (marginPercent >= 55)
            return { bg: colors.accent + '1A', text: colors.accent };
        return { bg: colors.destructive + '1A', text: colors.destructive };
    };

    const badgeColors = getMarginBadgeColors(item.marginPercent);

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <ScreenHeader title="Item Details" showBack />
            
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                
                {/* Header Card */}
                <Card>
                    <View style={styles.headerRow}>
                        <View style={styles.flex1}>
                            <Text style={[styles.itemName, { color: colors.foreground }]}>
                                {item.name}
                            </Text>
                            <View style={styles.categoryRow}>
                                <Badge variant="outline">{item.category}</Badge>
                                <View style={styles.ratingRow}>
                                    <Icon name="star" size={16} color={colors.accent} />
                                    <Text style={[styles.ratingText, { color: colors.foreground }]}>
                                        {item.rating}
                                    </Text>
                                    <Text style={[styles.ratingCount, { color: colors.mutedForeground }]}>
                                        ({item.feedback} reviews)
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Card>

                {/* Financials Card */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                        Financial Performance
                    </Text>
                    
                    <View style={styles.financialGrid}>
                        <View style={[styles.financeBox, { backgroundColor: colors.muted }]}>
                            <Text style={[styles.financeLabel, { color: colors.mutedForeground }]}>Cost</Text>
                            <Text style={[styles.financeValue, { color: colors.foreground }]}>EGP {item.cost}</Text>
                        </View>
                        <View style={[styles.financeBox, { backgroundColor: colors.muted }]}>
                            <Text style={[styles.financeLabel, { color: colors.mutedForeground }]}>Price</Text>
                            <Text style={[styles.financeValue, { color: colors.foreground }]}>EGP {item.price}</Text>
                        </View>
                    </View>

                    <View style={[styles.marginRow, { backgroundColor: badgeColors.bg }]}>
                        <View>
                            <Text style={[styles.marginLabel, { color: badgeColors.text }]}>Profit Margin</Text>
                            <Text style={[styles.marginValue, { color: badgeColors.text }]}>EGP {item.margin} / unit</Text>
                        </View>
                        <Text style={[styles.marginPercent, { color: badgeColors.text }]}>
                            {item.marginPercent.toFixed(0)}%
                        </Text>
                    </View>
                </Card>

                {/* Recent Feedback Mock */}
                <Card>
                    <View style={styles.feedbackHeader}>
                        <Text style={[styles.sectionTitle, { color: colors.foreground, marginBottom: 0 }]}>
                            Recent Feedback
                        </Text>
                        <Icon name="message-square" size={20} color={colors.mutedForeground} />
                    </View>
                    
                    {[
                        { date: 'Today', text: 'Absolutely delicious! Best in town.', rating: 5 },
                        { date: 'Yesterday', text: 'Good portion size, but a bit salty.', rating: 4 },
                        { date: '3 days ago', text: 'Perfectly cooked, highly recommend.', rating: 5 },
                    ].map((review, idx) => (
                        <View 
                            key={idx} 
                            style={[
                                styles.reviewRow, 
                                { borderBottomColor: colors.border },
                                idx === 2 && { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }
                            ]}
                        >
                            <View style={styles.reviewTop}>
                                <View style={styles.ratingRowSmall}>
                                    <Icon name="star" size={12} color={colors.accent} />
                                    <Text style={[styles.ratingTextSmall, { color: colors.foreground }]}>{review.rating}.0</Text>
                                </View>
                                <Text style={[styles.reviewDate, { color: colors.mutedForeground }]}>{review.date}</Text>
                            </View>
                            <Text style={[styles.reviewText, { color: colors.foreground }]}>{review.text}</Text>
                        </View>
                    ))}
                </Card>

                <View style={{ height: Spacing['2xl'] }} />
            </ScrollView>

            <View style={[styles.bottomBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
                <Button fullWidth>
                    <Icon name="edit-2" size={18} color="#fff" style={{ marginRight: Spacing.sm }} />
                    <Text style={styles.buttonTextPrimary}>Edit Menu Item</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
    content: { padding: Spacing.xl, gap: Spacing.xl },
    centerContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    flex1: { flex: 1 },
    headerRow: { flexDirection: 'row', alignItems: 'flex-start' },
    itemName: { fontSize: 24, fontWeight: '700', marginBottom: Spacing.sm },
    categoryRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ratingText: { fontSize: 15, fontWeight: '600' },
    ratingCount: { fontSize: 14 },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: Spacing.lg },
    financialGrid: { flexDirection: 'row', gap: Spacing.lg, marginBottom: Spacing.lg },
    financeBox: {
        flex: 1,
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
    },
    financeLabel: { fontSize: 13, marginBottom: 4 },
    financeValue: { fontSize: 20, fontWeight: '700' },
    marginRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.xl,
        borderRadius: BorderRadius.lg,
    },
    marginLabel: { fontSize: 13, fontWeight: '500', marginBottom: 2 },
    marginValue: { fontSize: 16, fontWeight: '700' },
    marginPercent: { fontSize: 28, fontWeight: '700' },
    feedbackHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    reviewRow: {
        borderBottomWidth: 1,
        paddingBottom: Spacing.md,
        marginBottom: Spacing.md,
    },
    reviewTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    ratingRowSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingTextSmall: { fontSize: 13, fontWeight: '600' },
    reviewDate: { fontSize: 12 },
    reviewText: { fontSize: 15, lineHeight: 22 },
    bottomBar: {
        padding: Spacing.xl,
        borderTopWidth: 1,
    },
    buttonTextPrimary: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default MenuItemDetailsScreen;
