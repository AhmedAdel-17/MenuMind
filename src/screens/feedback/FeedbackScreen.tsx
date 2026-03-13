import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { useAppSelector } from '../../core/store/hooks';
import { ScreenHeader } from '../../common/components/ScreenHeader';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Button } from '../../common/components/Button';
import { ProgressBar } from '../../common/components/ProgressBar';
import { StarRating } from '../../common/components/StarRating';
import { Spacing } from '../../core/theme';

const FeedbackScreen: React.FC = () => {
    const { colors } = useAppTheme();
    const feedbackData = useAppSelector(state => state.feedback.items);

    const avgRating = feedbackData.length > 0 ?
        feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length : 0;
    const positiveCount = feedbackData.filter(
        f => f.sentiment === 'positive',
    ).length;
    const neutralCount = feedbackData.filter(
        f => f.sentiment === 'neutral',
    ).length;
    const negativeCount = feedbackData.filter(
        f => f.sentiment === 'negative',
    ).length;

    const getSentimentColor = (sentiment: string) => {
        if (sentiment === 'positive') return colors.primary;
        if (sentiment === 'negative') return colors.destructive;
        return colors.mutedForeground;
    };

    const getSentimentBg = (sentiment: string) => {
        if (sentiment === 'positive') return colors.primary + '1A';
        if (sentiment === 'negative') return colors.destructive + '1A';
        return colors.muted;
    };

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <ScreenHeader
                title="Customer Feedback"
                subtitle="Collect and analyze customer reviews via QR codes"
            />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                {/* Summary Stats */}
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <View style={styles.statHeader}>
                            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                                Total Reviews
                            </Text>
                            <Icon name="message-square" size={16} color={colors.primary} />
                        </View>
                        <Text style={[styles.statValue, { color: colors.foreground }]}>
                            {feedbackData.length}
                        </Text>
                        <Text style={[styles.statNote, { color: colors.mutedForeground }]}>
                            This week
                        </Text>
                    </Card>

                    <Card style={styles.statCard}>
                        <View style={styles.statHeader}>
                            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                                Avg Rating
                            </Text>
                            <Icon name="star" size={16} color={colors.accent} />
                        </View>
                        <Text style={[styles.statValue, { color: colors.foreground }]}>
                            {avgRating.toFixed(1)}
                        </Text>
                        <Text style={[styles.statNote, { color: colors.mutedForeground }]}>
                            Out of 5.0
                        </Text>
                    </Card>

                    <Card style={styles.statCard}>
                        <View style={styles.statHeader}>
                            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                                Positive
                            </Text>
                            <Icon name="thumbs-up" size={16} color={colors.primary} />
                        </View>
                        <Text style={[styles.statValue, { color: colors.foreground }]}>
                            {positiveCount}
                        </Text>
                        <Text style={[styles.statNote, { color: colors.mutedForeground }]}>
                            {feedbackData.length > 0 ? ((positiveCount / feedbackData.length) * 100).toFixed(0) : 0}%
                        </Text>
                    </Card>

                    <Card style={styles.statCard}>
                        <View style={styles.statHeader}>
                            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                                Negative
                            </Text>
                            <Icon name="thumbs-down" size={16} color={colors.destructive} />
                        </View>
                        <Text style={[styles.statValue, { color: colors.foreground }]}>
                            {negativeCount}
                        </Text>
                        <Text style={[styles.statNote, { color: colors.mutedForeground }]}>
                            {feedbackData.length > 0 ? ((negativeCount / feedbackData.length) * 100).toFixed(0) : 0}%
                        </Text>
                    </Card>
                </View>

                {/* QR Code Section */}
                <Card>
                    <View style={styles.qrHeader}>
                        <Icon name="maximize" size={20} color={colors.foreground} />
                        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                            Generate Feedback QR Codes
                        </Text>
                    </View>
                    <Text style={[styles.qrDesc, { color: colors.mutedForeground }]}>
                        Create QR codes for tables or menu items to collect customer
                        feedback
                    </Text>
                    <View style={styles.qrButtons}>
                        <Button fullWidth>
                            <Icon name="maximize" size={16} color="#fff" />
                            <Text style={styles.primaryButtonText}>
                                Generate Table QR Code
                            </Text>
                        </Button>
                        <Button variant="outline" fullWidth>
                            <Icon name="maximize" size={16} color={colors.foreground} />
                            <Text style={[styles.outlineButtonText, { color: colors.foreground }]}>
                                Generate Item QR Code
                            </Text>
                        </Button>
                    </View>
                </Card>

                {/* Recent Feedback */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                        Recent Feedback
                    </Text>
                    {feedbackData.map(feedback => (
                        <Card key={feedback.id} style={styles.feedbackCard}>
                            <View style={styles.feedbackHeader}>
                                <View>
                                    <Text
                                        style={[
                                            styles.feedbackItem,
                                            { color: colors.foreground },
                                        ]}>
                                        {feedback.itemName}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.feedbackDate,
                                            { color: colors.mutedForeground },
                                        ]}>
                                        {feedback.date}
                                    </Text>
                                </View>
                                <Badge
                                    backgroundColor={getSentimentBg(feedback.sentiment)}
                                    textColor={getSentimentColor(feedback.sentiment)}>
                                    {feedback.sentiment.charAt(0).toUpperCase() +
                                        feedback.sentiment.slice(1)}
                                </Badge>
                            </View>
                            <StarRating rating={feedback.rating} size={14} />
                            <Text
                                style={[
                                    styles.feedbackComment,
                                    { color: colors.mutedForeground },
                                ]}>
                                {feedback.comment}
                            </Text>
                        </Card>
                    ))}
                </Card>

                {/* Sentiment Distribution */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                        Sentiment Distribution
                    </Text>

                    <View style={styles.sentimentItem}>
                        <View style={styles.sentimentLabel}>
                            <Icon name="thumbs-up" size={16} color={colors.primary} />
                            <Text style={[styles.sentimentLabelText, { color: colors.foreground }]}>
                                Positive
                            </Text>
                        </View>
                        <Text style={[styles.sentimentValueText, { color: colors.foreground }]}>
                            {positiveCount}
                        </Text>
                    </View>
                    <ProgressBar
                        progress={feedbackData.length > 0 ? (positiveCount / feedbackData.length) * 100 : 0}
                        color={colors.primary}
                    />

                    <View style={[styles.sentimentItem, { marginTop: Spacing.lg }]}>
                        <View style={styles.sentimentLabel}>
                            <Icon
                                name="message-square"
                                size={16}
                                color={colors.mutedForeground}
                            />
                            <Text style={[styles.sentimentLabelText, { color: colors.foreground }]}>
                                Neutral
                            </Text>
                        </View>
                        <Text style={[styles.sentimentValueText, { color: colors.foreground }]}>
                            {neutralCount}
                        </Text>
                    </View>
                    <ProgressBar
                        progress={feedbackData.length > 0 ? (neutralCount / feedbackData.length) * 100 : 0}
                        color={colors.mutedForeground}
                    />

                    <View style={[styles.sentimentItem, { marginTop: Spacing.lg }]}>
                        <View style={styles.sentimentLabel}>
                            <Icon name="thumbs-down" size={16} color={colors.destructive} />
                            <Text style={[styles.sentimentLabelText, { color: colors.foreground }]}>
                                Negative
                            </Text>
                        </View>
                        <Text style={[styles.sentimentValueText, { color: colors.foreground }]}>
                            {negativeCount}
                        </Text>
                    </View>
                    <ProgressBar
                        progress={feedbackData.length > 0 ? (negativeCount / feedbackData.length) * 100 : 0}
                        color={colors.destructive}
                    />
                </Card>

                <View style={{ height: Spacing['2xl'] }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
    content: { padding: Spacing.lg, gap: Spacing.lg },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.md,
    },
    statCard: { width: '47%', flexGrow: 1 },
    statHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    statLabel: { fontSize: 13 },
    statValue: { fontSize: 28, fontWeight: '700' },
    statNote: { fontSize: 12, marginTop: 4 },
    qrHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: Spacing.md },
    qrDesc: { fontSize: 14, marginBottom: Spacing.lg, lineHeight: 20 },
    qrButtons: { gap: Spacing.md },
    feedbackCard: { marginBottom: Spacing.md },
    feedbackHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    feedbackItem: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
    feedbackDate: { fontSize: 12 },
    feedbackComment: { fontSize: 14, lineHeight: 20, marginTop: Spacing.sm },
    sentimentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    sentimentLabel: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
    primaryButtonText: { color: '#fff', fontWeight: '600' },
    outlineButtonText: { fontWeight: '600' },
    sentimentLabelText: { fontSize: 14, fontWeight: '500' },
    sentimentValueText: { fontWeight: '700' },
});

export default FeedbackScreen;
