import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { ScreenHeader } from '../../common/components/ScreenHeader';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Button } from '../../common/components/Button';
import { Spacing, BorderRadius } from '../../core/theme';

const plans = [
    {
        name: 'Basic',
        price: { egp: 1000, usd: 49 },
        features: [
            'Up to 50 menu items',
            'Basic analytics dashboard',
            'QR code generation',
            'Email support',
            '1 location',
            '2 team members',
        ],
        recommended: false,
    },
    {
        name: 'Premium',
        price: { egp: 3000, usd: 149 },
        features: [
            'Unlimited menu items',
            'Advanced AI recommendations',
            'Full analytics & insights',
            'Priority support',
            'Up to 5 locations',
            '10 team members',
            'Custom branding on QR codes',
            'Export reports',
        ],
        recommended: true,
    },
];

const billingHistory = [
    { date: 'March 11, 2026', amount: 3000, status: 'Paid' },
    { date: 'February 11, 2026', amount: 3000, status: 'Paid' },
    { date: 'January 11, 2026', amount: 3000, status: 'Paid' },
];

const SubscriptionScreen: React.FC = () => {
    const { colors } = useAppTheme();

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <ScreenHeader
                title="Subscription Plans"
                subtitle="Choose the plan that fits your restaurant needs"
            />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                {/* Setup Fee Notice */}
                <Card borderColor={colors.accent + '33'}>
                    <View style={styles.noticeRow}>
                        <Icon
                            name="credit-card"
                            size={20}
                            color={colors.accent}
                            style={styles.noticeIcon}
                        />
                        <View style={styles.flex1}>
                            <Text style={[styles.noticeTitle, { color: colors.foreground }]}>
                                One-Time Setup Fee
                            </Text>
                            <Text style={[styles.noticeDesc, { color: colors.mutedForeground }]}>
                                All plans include a one-time setup fee of{' '}
                                <Text style={styles.boldText}>EGP 12,500 ($400)</Text> to
                                get your restaurant onboarded.
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* Plans */}
                {plans.map(plan => (
                    <Card
                        key={plan.name}
                        variant="bordered"
                        borderColor={
                            plan.recommended ? colors.primary : colors.border
                        }
                        style={plan.recommended ? styles.recommendedCard : undefined}>
                        {plan.recommended && (
                            <View style={styles.recommendedBadgeContainer}>
                                <Badge
                                    backgroundColor={colors.primary}
                                    textColor={colors.primaryForeground}>
                                    Recommended
                                </Badge>
                            </View>
                        )}

                        <Text style={[styles.planName, { color: colors.foreground }]}>
                            {plan.name}
                        </Text>
                        <View style={styles.priceRow}>
                            <Text style={[styles.planPrice, { color: colors.foreground }]}>
                                EGP {plan.price.egp.toLocaleString()}
                            </Text>
                            <Text style={[styles.planPeriod, { color: colors.mutedForeground }]}>
                                /month
                            </Text>
                        </View>
                        <Text style={[styles.planUsd, { color: colors.mutedForeground }]}>
                            or ${plan.price.usd}/month
                        </Text>

                        <View style={styles.featureList}>
                            {plan.features.map((feature, idx) => (
                                <View key={idx} style={styles.featureRow}>
                                    <Icon name="check" size={18} color={colors.primary} />
                                    <Text style={[styles.featureText, { color: colors.foreground }]}>
                                        {feature}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <Button
                            variant={plan.recommended ? 'primary' : 'secondary'}
                            size="lg"
                            fullWidth>
                            {plan.recommended ? 'Current Plan' : 'Upgrade'}
                        </Button>
                    </Card>
                ))}

                {/* Payment Methods */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                        Payment Methods
                    </Text>
                    <View
                        style={[styles.paymentRow, { backgroundColor: colors.muted }]}>
                        <View style={styles.paymentLeft}>
                            <View
                                style={[
                                    styles.paymentIcon,
                                    { backgroundColor: colors.primary },
                                ]}>
                                <Icon name="credit-card" size={18} color="#fff" />
                            </View>
                            <View>
                                <Text style={[styles.paymentName, { color: colors.foreground }]}>
                                    Visa ending in 4242
                                </Text>
                                <Text style={[styles.paymentExpiry, { color: colors.mutedForeground }]}>
                                    Expires 12/2027
                                </Text>
                            </View>
                        </View>
                        <Badge>Primary</Badge>
                    </View>
                    <Button variant="outline" fullWidth style={styles.addButton}>
                        <Icon name="credit-card" size={16} color={colors.foreground} />
                        <Text style={[styles.addButtonText, { color: colors.foreground }]}>
                            Add Payment Method
                        </Text>
                    </Button>
                </Card>

                {/* Billing History */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                        Billing History
                    </Text>
                    {billingHistory.map((invoice, idx) => (
                        <View
                            key={idx}
                            style={[styles.invoiceRow, { backgroundColor: colors.muted }]}>
                            <View>
                                <Text style={[styles.invoiceDate, { color: colors.foreground }]}>
                                    {invoice.date}
                                </Text>
                                <Text style={[styles.invoicePlan, { color: colors.mutedForeground }]}>
                                    Premium Plan
                                </Text>
                            </View>
                            <View style={styles.invoiceRight}>
                                <Text
                                    style={[styles.invoiceAmount, { color: colors.foreground }]}>
                                    EGP {invoice.amount.toLocaleString()}
                                </Text>
                                <Badge
                                    backgroundColor={colors.primary + '1A'}
                                    textColor={colors.primary}
                                    style={styles.invoiceBadge}>
                                    {invoice.status}
                                </Badge>
                            </View>
                        </View>
                    ))}
                </Card>

                {/* FAQ */}
                <Card>
                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                        Frequently Asked Questions
                    </Text>
                    {[
                        {
                            q: 'Can I cancel anytime?',
                            a: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
                        },
                        {
                            q: 'What payment methods do you accept?',
                            a: 'We accept all major credit cards (Visa, Mastercard, Amex) and local payment methods like Fawry for Egyptian customers.',
                        },
                        {
                            q: 'Can I switch plans?',
                            a: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.',
                        },
                        {
                            q: 'Is there a free trial?',
                            a: 'We offer a 14-day free trial on all plans so you can explore all features before committing.',
                        },
                    ].map((faq, idx) => (
                        <View key={idx} style={styles.faqItem}>
                            <Text style={[styles.faqQuestion, { color: colors.foreground }]}>
                                {faq.q}
                            </Text>
                            <Text style={[styles.faqAnswer, { color: colors.mutedForeground }]}>
                                {faq.a}
                            </Text>
                        </View>
                    ))}
                </Card>

                <View style={{ height: Spacing['2xl'] }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
    content: { padding: Spacing.xl, gap: Spacing.xl }, // Maximize breathing room for premium feel
    flex1: { flex: 1 },
    noticeRow: { flexDirection: 'row', gap: Spacing.md },
    noticeIcon: { marginTop: 2 },
    noticeTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    noticeDesc: { fontSize: 14, lineHeight: 20 },
    recommendedCard: {
        shadowOpacity: 0.08, // Keep it diffused but broader
        shadowRadius: 24,
        elevation: 6,
        borderWidth: 2, // Thicker border for the premium tier
    },
    recommendedBadgeContainer: {
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    planName: { fontSize: 24, fontWeight: '700', marginBottom: Spacing.sm },
    priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.sm },
    planPrice: { fontSize: 36, fontWeight: '700' },
    planPeriod: { fontSize: 16 },
    planUsd: { fontSize: 14, marginTop: 4, marginBottom: Spacing.lg },
    featureList: { gap: Spacing.md, marginBottom: Spacing.xl },
    featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
    featureText: { fontSize: 14, flex: 1 },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: Spacing.md },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.xl,
        borderRadius: BorderRadius.lg, // Use the new softer lg token
    },
    paymentLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
    paymentIcon: {
        width: 40,
        height: 28,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paymentName: { fontSize: 15, fontWeight: '500' },
    invoiceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.xl,
        borderRadius: BorderRadius.lg, // Use the new softer lg token
        marginBottom: Spacing.sm,
    },
    invoiceDate: { fontSize: 15, fontWeight: '500', marginBottom: 2 },
    faqItem: { marginBottom: Spacing.lg },
    faqQuestion: { fontSize: 15, fontWeight: '600', marginBottom: Spacing.sm },
    faqAnswer: { fontSize: 14, lineHeight: 20 },
    boldText: { fontWeight: '700' },
    paymentExpiry: { fontSize: 12 },
    addButton: { marginTop: Spacing.md },
    addButtonText: { fontWeight: '600' },
    invoicePlan: { fontSize: 13 },
    invoiceRight: { alignItems: 'flex-end' },
    invoiceAmount: { fontWeight: '600', fontSize: 15 },
    invoiceBadge: { marginTop: 4 },
});

export default SubscriptionScreen;
