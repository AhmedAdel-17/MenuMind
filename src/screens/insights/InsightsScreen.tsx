import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { useAppSelector, useAppDispatch } from '../../core/store/hooks';
import {
    acceptRecommendation,
    rejectRecommendation,
} from '../../core/store/slices/insightsSlice';
import { ScreenHeader } from '../../common/components/ScreenHeader';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Button } from '../../common/components/Button';
import { Spacing, BorderRadius } from '../../core/theme';

const screenWidth = Dimensions.get('window').width - Spacing.lg * 2 - Spacing.lg * 2;

const InsightsScreen: React.FC = () => {
    const { colors } = useAppTheme();
    const dispatch = useAppDispatch();
    const recommendations = useAppSelector(
        state => state.insights.recommendations,
    );
    const profitTrends = useAppSelector(state => state.insights.profitTrends);
    const categoryPerformance = useAppSelector(
        state => state.insights.categoryPerformance,
    );

    const chartConfig = {
        backgroundColor: colors.card,
        backgroundGradientFrom: colors.card,
        backgroundGradientTo: colors.card,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
        labelColor: () => colors.mutedForeground,
        style: { borderRadius: 16 },
        propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: colors.primary,
        },
    };

    const lineChartData = {
        labels: profitTrends.map(t => t.week.replace('Week ', 'W')),
        datasets: [
            {
                data: profitTrends.map(t => t.profit / 1000),
                color: () => colors.primary,
                strokeWidth: 3,
            },
            {
                data: profitTrends.map(t => t.revenue / 1000),
                color: () => colors.chart2,
                strokeWidth: 3,
            },
        ],
        legend: ['Profit (K)', 'Revenue (K)'],
    };

    const barChartData = {
        labels: categoryPerformance.map(c => c.category.substring(0, 4)),
        datasets: [
            {
                data: categoryPerformance.map(c => c.profit / 1000),
            },
        ],
    };

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <ScreenHeader
                title="AI Insights"
                subtitle="Data-driven recommendations to optimize your menu profitability"
            />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                {/* AI Recommendations */}
                <View style={styles.recHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                        AI Recommendations
                    </Text>
                    <Badge
                        backgroundColor={colors.accent + '1A'}
                        textColor={colors.accent}>
                        {`${recommendations.length} suggestions`}
                    </Badge>
                </View>

                {recommendations.map(rec => (
                    <Card
                        key={rec.id}
                        variant="bordered"
                        borderColor={colors.primary + '33'}>
                        <View style={styles.recTop}>
                            <View style={styles.flex1}>
                                <Text
                                    style={[styles.recItemName, { color: colors.foreground }]}>
                                    {rec.itemName}
                                </Text>
                                <View style={styles.recTypeRow}>
                                    <Icon
                                        name={
                                            rec.type === 'increase'
                                                ? 'trending-up'
                                                : rec.type === 'decrease'
                                                    ? 'trending-down'
                                                    : 'trash-2'
                                        }
                                        size={18}
                                        color={
                                            rec.type === 'increase'
                                                ? colors.primary
                                                : colors.destructive
                                        }
                                    />
                                    <Text
                                        style={[styles.recTypeText, { color: colors.foreground }]}>
                                        {rec.type === 'increase'
                                            ? 'Increase Price'
                                            : rec.type === 'decrease'
                                                ? 'Decrease Price'
                                                : 'Remove Item'}
                                    </Text>
                                </View>
                            </View>
                            <Badge
                                backgroundColor={colors.primary + '1A'}
                                textColor={colors.primary}>
                                {`${rec.confidence}% confidence`}
                            </Badge>
                        </View>

                        {/* Price comparison */}
                        <View
                            style={[styles.priceCompare, { backgroundColor: colors.muted }]}>
                            <View style={styles.priceBox}>
                                <Text style={[styles.priceBoxLabel, { color: colors.mutedForeground }]}>
                                    Current Price
                                </Text>
                                <Text style={[styles.priceBoxValue, { color: colors.foreground }]}>
                                    EGP {rec.currentPrice}
                                </Text>
                            </View>
                            <Text style={[styles.priceArrow, { color: colors.mutedForeground }]}>
                                →
                            </Text>
                            <View style={styles.priceBox}>
                                <Text style={[styles.priceBoxLabel, { color: colors.mutedForeground }]}>
                                    Suggested Price
                                </Text>
                                <Text style={[styles.priceBoxValue, { color: colors.primary }]}>
                                    EGP {rec.suggestedPrice}
                                </Text>
                            </View>
                        </View>

                        {/* Rationale */}
                        <View style={styles.rationaleSection}>
                            <Text style={[styles.rationaleLabel, { color: colors.foreground }]}>
                                Rationale
                            </Text>
                            <Text style={[styles.rationaleText, { color: colors.mutedForeground }]}>
                                {rec.rationale}
                            </Text>
                        </View>

                        {/* Impact */}
                        <View
                            style={[styles.impactBox, { backgroundColor: colors.primary + '1A' }]}>
                            <Icon name="trending-up" size={18} color={colors.primary} />
                            <View style={styles.flex1}>
                                <Text style={[styles.impactLabel, { color: colors.foreground }]}>
                                    Expected Impact
                                </Text>
                                <Text style={[styles.impactText, { color: colors.mutedForeground }]}>
                                    {rec.impact}
                                </Text>
                            </View>
                        </View>

                        {/* Actions */}
                        <View style={styles.actionRow}>
                            <Button
                                onPress={() => dispatch(acceptRecommendation(rec.id))}
                                style={styles.flex1}>
                                <Icon name="check" size={16} color="#fff" />
                                <Text style={styles.buttonTextPrimary}>Accept</Text>
                            </Button>
                            <Button
                                onPress={() => dispatch(rejectRecommendation(rec.id))}
                                variant="outline"
                                style={styles.flex1}>
                                <Icon name="x" size={16} color={colors.foreground} />
                                <Text style={[styles.buttonTextOutline, { color: colors.foreground }]}>
                                    Reject
                                </Text>
                            </Button>
                        </View>
                    </Card>
                ))}

                {recommendations.length === 0 && (
                    <Card>
                        <View style={styles.emptyState}>
                            <View
                                style={[
                                    styles.emptyIcon,
                                    { backgroundColor: colors.primary + '1A' },
                                ]}>
                                <Icon name="check" size={32} color={colors.primary} />
                            </View>
                            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
                                All Caught Up!
                            </Text>
                            <Text style={[styles.emptySubtitle, { color: colors.mutedForeground }]}>
                                No new recommendations at the moment. Check back later for more
                                insights.
                            </Text>
                        </View>
                    </Card>
                )}

                {/* Profit Trends Chart */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                        Profit Trends
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <LineChart
                            data={lineChartData}
                            width={Math.max(screenWidth, 300)}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                            style={styles.chart}
                        />
                    </ScrollView>
                </Card>

                {/* Category Performance Chart */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                        Performance by Category
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <BarChart
                            data={barChartData}
                            width={Math.max(screenWidth, 300)}
                            height={220}
                            chartConfig={{
                                ...chartConfig,
                                color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
                            }}
                            yAxisLabel=""
                            yAxisSuffix="K"
                            style={styles.chart}
                        />
                    </ScrollView>
                </Card>

                {/* Key Insights */}
                <Card
                    borderColor={colors.primary + '33'}
                    style={{ backgroundColor: colors.primary + '1A', elevation: 0, shadowOpacity: 0 }}>
                    <View style={styles.insightHeader}>
                        <Icon name="trending-up" size={20} color={colors.primary} />
                        <Text style={[styles.insightTitle, { color: colors.foreground }]}>
                            Top Opportunity
                        </Text>
                    </View>
                    <Text style={[styles.insightName, { color: colors.foreground }]}>
                        Chocolate Cake price optimization
                    </Text>
                    <Text style={[styles.insightDesc, { color: colors.mutedForeground }]}>
                        Increasing the price from EGP 60 to EGP 75 could generate an
                        additional EGP 1,200 in monthly revenue with minimal impact on
                        sales volume.
                    </Text>
                </Card>

                <Card
                    borderColor={colors.accent + '33'}
                    style={{ backgroundColor: colors.accent + '1A', elevation: 0, shadowOpacity: 0 }}>
                    <View style={styles.insightHeader}>
                        <Icon name="trending-down" size={20} color={colors.accent} />
                        <Text style={[styles.insightTitle, { color: colors.foreground }]}>
                            Watch Out
                        </Text>
                    </View>
                    <Text style={[styles.insightName, { color: colors.foreground }]}>
                        Pasta Carbonara underperforming
                    </Text>
                    <Text style={[styles.insightDesc, { color: colors.mutedForeground }]}>
                        Customer feedback suggests the current price (EGP 110) is too high
                        for the perceived value. Consider reducing to EGP 95.
                    </Text>
                </Card>

                <View style={{ height: Spacing['2xl'] }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
    content: { padding: Spacing.xl, gap: Spacing.xl }, // Premium spacing
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: Spacing.md },
    recHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flex1: { flex: 1 },
    recTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.lg,
    },
    recItemName: { fontSize: 20, fontWeight: '700', marginBottom: Spacing.sm },
    recTypeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
    recTypeText: { fontSize: 15, fontWeight: '600' },
    priceCompare: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.xl, // More breathing room
        borderRadius: BorderRadius.lg, // Softer curves
        gap: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    priceBox: { alignItems: 'center' },
    priceBoxLabel: { fontSize: 13, marginBottom: 4 },
    priceBoxValue: { fontSize: 22, fontWeight: '700' },
    priceArrow: { fontSize: 24, fontWeight: '700' },
    rationaleSection: { marginBottom: Spacing.md },
    rationaleLabel: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
    rationaleText: { fontSize: 14, lineHeight: 20 },
    impactBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: Spacing.md,
        padding: Spacing.lg, // Increased internal padding
        borderRadius: BorderRadius.lg, // Softer curves
        marginBottom: Spacing.lg,
    },
    impactLabel: { fontSize: 14, fontWeight: '600' },
    impactText: { fontSize: 14 },
    actionRow: { flexDirection: 'row', gap: Spacing.md },
    emptyState: { alignItems: 'center', paddingVertical: Spacing['3xl'] },
    emptyIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
    },
    emptyTitle: { fontSize: 20, fontWeight: '700', marginBottom: Spacing.sm },
    chart: { borderRadius: 12, marginLeft: -16 },
    insightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: Spacing.md,
    },
    insightTitle: { fontSize: 16, fontWeight: '700' },
    insightName: { fontSize: 15, fontWeight: '600', marginBottom: Spacing.sm },
    insightDesc: { fontSize: 14, lineHeight: 20 },
    buttonTextPrimary: { color: '#fff', fontWeight: '600' },
    buttonTextOutline: { fontWeight: '600' },
    emptySubtitle: { textAlign: 'center' },
});

export default InsightsScreen;
