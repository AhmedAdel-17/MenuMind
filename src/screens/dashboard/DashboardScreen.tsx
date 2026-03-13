import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { useAppSelector } from '../../core/store/hooks';
import type { MainTabParamList } from '../../navigation/MainTabNavigator';
import { ScreenHeader } from '../../common/components/ScreenHeader';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Button } from '../../common/components/Button';
import { Spacing, BorderRadius } from '../../core/theme';

const DashboardScreen: React.FC = () => {
    const { colors } = useAppTheme();
    const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList, 'Home'>>();
    const menuItems = useAppSelector(state => state.menu.items);
    const recommendations = useAppSelector(
        state => state.insights.recommendations,
    );

    const totalRevenue = menuItems.reduce(
        (sum, item) => sum + item.price * 30,
        0,
    );
    const totalProfit = menuItems.reduce(
        (sum, item) => sum + item.margin * 30,
        0,
    );
    const avgMargin = menuItems.length > 0 ?
        menuItems.reduce((sum, item) => sum + item.marginPercent, 0) /
        menuItems.length : 0;
    const avgRating = menuItems.length > 0 ?
        menuItems.reduce((sum, item) => sum + item.rating, 0) / menuItems.length : 0;

    const topPerformers = [...menuItems]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <ScreenHeader
                title="Dashboard"
                subtitle="Welcome back! Here's your restaurant overview"
            />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                {/* Key Metrics */}
                <View style={styles.metricsGrid}>
                    <Card style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                            <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>
                                Monthly Revenue
                            </Text>
                            <Icon name="dollar-sign" size={16} color={colors.primary} />
                        </View>
                        <Text style={[styles.metricValue, { color: colors.foreground }]}>
                            EGP {totalRevenue.toLocaleString()}
                        </Text>
                        <View style={styles.trendRow}>
                            <Icon name="trending-up" size={12} color={colors.primary} />
                            <Text style={[styles.trendText, { color: colors.primary }]}>
                                +12.5%
                            </Text>
                        </View>
                    </Card>

                    <Card style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                            <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>
                                Monthly Profit
                            </Text>
                            <Icon name="trending-up" size={16} color={colors.primary} />
                        </View>
                        <Text style={[styles.metricValue, { color: colors.foreground }]}>
                            EGP {totalProfit.toLocaleString()}
                        </Text>
                        <View style={styles.trendRow}>
                            <Icon name="trending-up" size={12} color={colors.primary} />
                            <Text style={[styles.trendText, { color: colors.primary }]}>
                                +8.3%
                            </Text>
                        </View>
                    </Card>

                    <Card style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                            <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>
                                Avg Margin
                            </Text>
                            <View
                                style={[
                                    styles.smallCircle,
                                    { backgroundColor: colors.primary + '33' },
                                ]}
                            />
                        </View>
                        <Text style={[styles.metricValue, { color: colors.foreground }]}>
                            {avgMargin.toFixed(1)}%
                        </Text>
                        <Text style={[styles.metricNote, { color: colors.mutedForeground }]}>
                            Target: 60%
                        </Text>
                    </Card>

                    <Card style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                            <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>
                                Avg Rating
                            </Text>
                            <Icon name="star" size={16} color={colors.accent} />
                        </View>
                        <Text style={[styles.metricValue, { color: colors.foreground }]}>
                            {avgRating.toFixed(1)}
                        </Text>
                        <Text style={[styles.metricNote, { color: colors.mutedForeground }]}>
                            384 reviews
                        </Text>
                    </Card>
                </View>

                {/* AI Alert */}
                <Card
                    style={styles.alertCard}
                    borderColor={colors.accent + '40'}>
                    <View style={styles.alertRow}>
                        <Icon
                            name="alert-circle"
                            size={20}
                            color={colors.accent}
                            style={styles.alertIcon}
                        />
                        <View style={styles.alertContent}>
                            <Text style={[styles.alertTitle, { color: colors.foreground }]}>
                                AI Insights Available
                            </Text>
                            <Text
                                style={[styles.alertDesc, { color: colors.mutedForeground }]}>
                                We've analyzed your menu and found 3 opportunities to increase
                                profit by EGP 3,540/month
                            </Text>
                            <Button
                                onPress={() => navigation.navigate('Insights')}
                                variant="outline"
                                size="sm"
                                style={styles.viewRecsBtn}>
                                <Text style={[styles.viewRecsText, { color: colors.accent }]}>
                                    View Recommendations
                                </Text>
                                <Icon name="arrow-right" size={14} color={colors.accent} />
                            </Button>
                        </View>
                    </View>
                </Card>

                {/* Top Performers */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                        Top Performers
                    </Text>
                    {topPerformers.map(item => (
                        <View
                            key={item.id}
                            style={[
                                styles.performerRow,
                                { backgroundColor: colors.muted },
                            ]}>
                            <View style={styles.performerInfo}>
                                <Text style={[styles.performerName, { color: colors.foreground }]}>
                                    {item.name}
                                </Text>
                                <View style={styles.performerMeta}>
                                    <Icon name="star" size={12} color={colors.accent} />
                                    <Text style={[styles.performerRating, { color: colors.foreground }]}>
                                        {item.rating}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.performerReviews,
                                            { color: colors.mutedForeground },
                                        ]}>
                                        {item.feedback} reviews
                                    </Text>
                                </View>
                            </View>
                            <Badge
                                backgroundColor={
                                    item.marginPercent >= 60
                                        ? colors.primary + '1A'
                                        : colors.accent + '1A'
                                }
                                textColor={
                                    item.marginPercent >= 60 ? colors.primary : colors.accent
                                }>
                                {`${item.marginPercent.toFixed(0)}% margin`}
                            </Badge>
                        </View>
                    ))}
                    <Button
                        onPress={() => navigation.navigate('MenuTab')}
                        variant="outline"
                        fullWidth
                        style={{ marginTop: Spacing.md }}>
                        View All Items
                    </Button>
                </Card>

                {/* Recent AI Suggestions */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                        Recent AI Suggestions
                    </Text>
                    {recommendations.slice(0, 3).map(rec => (
                        <View
                            key={rec.id}
                            style={[styles.suggestionCard, { backgroundColor: colors.muted }]}>
                            <View style={styles.suggestionHeader}>
                                <Text
                                    style={[
                                        styles.suggestionName,
                                        { color: colors.foreground },
                                    ]}>
                                    {rec.itemName}
                                </Text>
                                <Badge variant="outline">{`${rec.confidence}% confidence`}</Badge>
                            </View>
                            <View style={styles.priceRow}>
                                <Icon
                                    name={
                                        rec.type === 'increase' ? 'trending-up' : 'trending-down'
                                    }
                                    size={16}
                                    color={
                                        rec.type === 'increase'
                                            ? colors.primary
                                            : colors.destructive
                                    }
                                />
                                <Text style={[styles.priceText, { color: colors.foreground }]}>
                                    EGP {rec.currentPrice} → EGP {rec.suggestedPrice}
                                </Text>
                            </View>
                            <Text
                                style={[styles.impactText, { color: colors.mutedForeground }]}>
                                {rec.impact}
                            </Text>
                        </View>
                    ))}
                    <Button
                        onPress={() => navigation.navigate('Insights')}
                        variant="outline"
                        fullWidth
                        style={{ marginTop: Spacing.md }}>
                        View All Suggestions
                    </Button>
                </Card>

                {/* Menu Performance Heatmap */}
                <Card>
                    <View style={styles.heatmapHeader}>
                        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                            Menu Performance
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MenuTab')}
                            style={styles.viewDetailsBtn}>
                            <Text style={[styles.viewDetailsText, { color: colors.mutedForeground }]}>
                                View Details
                            </Text>
                            <Icon
                                name="arrow-right"
                                size={14}
                                color={colors.mutedForeground}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.heatmapGrid}>
                        {menuItems.slice(0, 8).map(item => {
                            let bgColor = colors.muted;
                            if (item.marginPercent >= 60) bgColor = colors.primary + '33';
                            else if (item.marginPercent >= 55) bgColor = colors.accent + '33';
                            else if (item.marginPercent < 52)
                                bgColor = colors.destructive + '33';

                            return (
                                <View
                                    key={item.id}
                                    style={[
                                        styles.heatmapItem,
                                        { backgroundColor: bgColor },
                                    ]}>
                                    <Text
                                        style={[
                                            styles.heatmapName,
                                            { color: colors.foreground },
                                        ]}
                                        numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.heatmapCategory,
                                            { color: colors.mutedForeground },
                                        ]}>
                                        {item.category}
                                    </Text>
                                    <View style={styles.heatmapBottom}>
                                        <Text
                                            style={[
                                                styles.heatmapPercent,
                                                { color: colors.foreground },
                                            ]}>
                                            {item.marginPercent.toFixed(0)}%
                                        </Text>
                                        <View style={styles.heatmapRating}>
                                            <Icon name="star" size={11} color={colors.accent} />
                                            <Text style={[styles.heatmapRatingText, { color: colors.foreground }]}>
                                                {item.rating}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    {/* Legend */}
                    <View style={styles.legendRow}>
                        <View style={styles.legendItem}>
                            <View
                                style={[
                                    styles.legendDot,
                                    { backgroundColor: colors.primary + '33' },
                                ]}
                            />
                            <Text style={[styles.legendText, { color: colors.mutedForeground }]}>
                                High (≥60%)
                            </Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View
                                style={[
                                    styles.legendDot,
                                    { backgroundColor: colors.accent + '33' },
                                ]}
                            />
                            <Text style={[styles.legendText, { color: colors.mutedForeground }]}>
                                Medium
                            </Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View
                                style={[
                                    styles.legendDot,
                                    { backgroundColor: colors.destructive + '33' },
                                ]}
                            />
                            <Text style={[styles.legendText, { color: colors.mutedForeground }]}>
                                Low (&lt;52%)
                            </Text>
                        </View>
                    </View>
                </Card>

                <View style={{ height: Spacing['2xl'] }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
    content: { padding: Spacing.xl, gap: Spacing.xl }, // Premium spacing
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.md,
    },
    metricCard: {
        width: '47%',
        flexGrow: 1,
    },
    metricHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    metricLabel: { fontSize: 13 },
    metricValue: { fontSize: 22, fontWeight: '700' },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: Spacing.sm,
    },
    trendText: { fontSize: 12 },
    smallCircle: { width: 16, height: 16, borderRadius: 8 },
    metricNote: { fontSize: 12, marginTop: Spacing.sm },
    alertCard: {},
    alertRow: { flexDirection: 'row', gap: Spacing.md },
    alertIcon: { marginTop: 2 },
    alertContent: { flex: 1 },
    alertTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    alertDesc: { fontSize: 14, lineHeight: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: Spacing.md },
    performerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.lg, // Increased internal padding
        borderRadius: BorderRadius.lg, // Softer curves
        marginBottom: Spacing.sm,
    },
    performerInfo: { flex: 1 },
    performerName: { fontSize: 15, fontWeight: '500', marginBottom: 4 },
    performerMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    performerRating: { fontSize: 12 },
    performerReviews: { fontSize: 12 },
    suggestionCard: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.sm,
    },
    suggestionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    suggestionName: { fontSize: 15, fontWeight: '500', flex: 1 },
    priceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
    priceText: { fontSize: 14 },
    impactText: { fontSize: 12, marginTop: Spacing.sm },
    heatmapHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewDetailsBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    heatmapGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
        marginTop: Spacing.md,
    },
    heatmapItem: {
        width: '47%',
        flexGrow: 1,
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
    },
    heatmapName: { fontSize: 13, fontWeight: '500', marginBottom: 2 },
    heatmapCategory: { fontSize: 11, marginBottom: Spacing.sm },
    heatmapBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heatmapPercent: { fontSize: 18, fontWeight: '700' },
    heatmapRating: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    legendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.xl,
        marginTop: Spacing.lg,
    },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
    legendDot: { width: 16, height: 16, borderRadius: 4 },
    viewRecsBtn: { marginTop: Spacing.sm, alignSelf: 'flex-start' },
    viewRecsText: { fontWeight: '600', fontSize: 13 },
    viewDetailsText: { fontSize: 13 },
    heatmapRatingText: { fontSize: 11 },
    legendText: { fontSize: 12 },
});

export default DashboardScreen;
