import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { useAppDispatch, useAppSelector } from '../../core/store/hooks';
import { toggleTheme } from '../../core/store/slices/themeSlice';
import { resetAuth } from '../../core/store/slices/authSlice';
import { ScreenHeader } from '../../common/components/ScreenHeader';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';
import { Spacing, BorderRadius } from '../../core/theme';
import type { ProfileStackParamList } from '../../navigation/MainTabNavigator';

type ProfileNavProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
    const { colors, isDark } = useAppTheme();
    const dispatch = useAppDispatch();
    const navigation = useNavigation<ProfileNavProp>();
    const user = useAppSelector(state => state.auth.user);

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <ScreenHeader
                title="Profile & Settings"
                subtitle="Manage your account and preferences"
            />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                {/* Profile Info */}
                <Card>
                    <View style={styles.cardHeader}>
                        <Icon name="user" size={20} color={colors.foreground} />
                        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
                            Profile Information
                        </Text>
                    </View>

                    <View style={styles.profileRow}>
                        <View
                            style={[
                                styles.avatar,
                                { backgroundColor: colors.primary },
                            ]}>
                            <Icon name="user" size={32} color="#fff" />
                        </View>
                        <View style={styles.flex1}>
                            <Text style={[styles.profileName, { color: colors.foreground }]}>
                                {user.name || 'Set your name'}
                            </Text>
                            <Text style={[styles.profileRole, { color: colors.mutedForeground }]}>
                                Owner • {user.restaurant || 'Your Restaurant'}
                            </Text>
                            <Badge
                                backgroundColor={colors.accent + '1A'}
                                textColor={colors.accent}
                                style={{ marginTop: Spacing.sm }}>
                                Premium Plan
                            </Badge>
                        </View>
                    </View>

                    <View style={styles.formGrid}>
                        <Input label="Full Name" defaultValue={user.name} />
                        <Input label="Restaurant Name" defaultValue={user.restaurant} />
                        <Input
                            label="Email"
                            defaultValue={user.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Input
                            label="Phone"
                            defaultValue={user.phone}
                            keyboardType="phone-pad"
                        />
                        <Input label="Location" defaultValue={user.location} />
                        <Input label="Cuisine Type" defaultValue="Mediterranean" />
                    </View>

                    <Button style={{ marginTop: Spacing.lg }}>Save Changes</Button>
                </Card>

                {/* Subscription */}
                <Card>
                    <View style={styles.cardHeader}>
                        <Icon name="credit-card" size={20} color={colors.foreground} />
                        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
                            Subscription
                        </Text>
                    </View>

                    <View
                        style={[styles.subCard]}>
                        <View style={styles.subRow}>
                            <View>
                                <Text style={[styles.subLabel, { color: colors.mutedForeground }]}>
                                    Current Plan
                                </Text>
                                <Text style={[styles.subPlan, { color: colors.foreground }]}>
                                    Premium
                                </Text>
                            </View>
                            <Badge
                                backgroundColor={colors.primary}
                                textColor={colors.primaryForeground}>
                                Active
                            </Badge>
                        </View>
                        <View style={styles.subDetails}>
                            <View style={styles.subDetailRow}>
                                <Text style={[styles.subDetailLabel, { color: colors.mutedForeground }]}>
                                    Monthly Cost
                                </Text>
                                <Text
                                    style={[styles.subDetailValue, { color: colors.foreground }]}>
                                    EGP 3,000 / $149
                                </Text>
                            </View>
                            <View style={styles.subDetailRow}>
                                <Text style={[styles.subDetailLabel, { color: colors.mutedForeground }]}>
                                    Next Billing Date
                                </Text>
                                <Text
                                    style={[styles.subDetailValue, { color: colors.foreground }]}>
                                    April 11, 2026
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Button
                        onPress={() => navigation.navigate('Subscription')}
                        variant="outline"
                        fullWidth>
                        Manage Subscription
                    </Button>
                </Card>

                {/* Team Members */}
                <Card>
                    <View style={styles.cardHeader}>
                        <Icon name="users" size={20} color={colors.foreground} />
                        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
                            Team Members
                        </Text>
                    </View>

                    {[
                        {
                            name: 'Ahmed Hassan',
                            email: 'ahmed@cairobistro.com',
                            role: 'Owner',
                            bgColor: colors.primary,
                        },
                        {
                            name: 'Sarah Ahmed',
                            email: 'sarah@cairobistro.com',
                            role: 'Manager',
                            bgColor: colors.secondary,
                        },
                        {
                            name: 'Mohamed Ali',
                            email: 'mohamed@cairobistro.com',
                            role: 'Staff',
                            bgColor: colors.mutedForeground,
                        },
                    ].map((member, idx) => (
                        <View
                            key={idx}
                            style={[
                                styles.memberRow,
                                { backgroundColor: colors.muted },
                            ]}>
                            <View style={styles.memberLeft}>
                                <View
                                    style={[
                                        styles.memberAvatar,
                                        { backgroundColor: member.bgColor },
                                    ]}>
                                    <Icon name="user" size={16} color="#fff" />
                                </View>
                                <View>
                                    <Text style={[styles.memberName, { color: colors.foreground }]}>
                                        {member.name}
                                    </Text>
                                    <Text
                                        style={[styles.memberEmail, { color: colors.mutedForeground }]}>
                                        {member.email}
                                    </Text>
                                </View>
                            </View>
                            <Badge variant={idx === 0 ? 'default' : 'outline'}>
                                {member.role}
                            </Badge>
                        </View>
                    ))}

                    <Button variant="outline" fullWidth style={styles.inviteButton}>
                        <Icon name="users" size={16} color={colors.foreground} />
                        <Text style={[styles.buttonTextOutline, { color: colors.foreground }]}>
                            Invite Team Member
                        </Text>
                    </Button>
                </Card>

                {/* Preferences */}
                <Card>
                    <View style={styles.cardHeader}>
                        <Icon name="settings" size={20} color={colors.foreground} />
                        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
                            Preferences
                        </Text>
                    </View>

                    <View style={styles.prefRow}>
                        <View style={styles.prefLeft}>
                            <Icon name="bell" size={20} color={colors.mutedForeground} />
                            <View style={styles.flex1}>
                                <Text style={[styles.prefTitle, { color: colors.foreground }]}>
                                    Email Notifications
                                </Text>
                                <Text style={[styles.prefDesc, { color: colors.mutedForeground }]}>
                                    Receive weekly insights and alerts
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={true}
                            trackColor={{
                                false: colors.switchBackground,
                                true: colors.primary + '66',
                            }}
                            thumbColor={colors.primary}
                        />
                    </View>

                    <View style={styles.prefRow}>
                        <View style={styles.prefLeft}>
                            <Icon name="globe" size={20} color={colors.mutedForeground} />
                            <View style={styles.flex1}>
                                <Text style={[styles.prefTitle, { color: colors.foreground }]}>
                                    Language
                                </Text>
                                <Text style={[styles.prefDesc, { color: colors.mutedForeground }]}>
                                    English
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.prefRow}>
                        <View style={styles.prefLeft}>
                            <Icon
                                name={isDark ? 'moon' : 'sun'}
                                size={20}
                                color={colors.mutedForeground}
                            />
                            <View style={styles.flex1}>
                                <Text style={[styles.prefTitle, { color: colors.foreground }]}>
                                    Dark Mode
                                </Text>
                                <Text style={[styles.prefDesc, { color: colors.mutedForeground }]}>
                                    Toggle dark/light theme
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={isDark}
                            onValueChange={(_value: boolean) => { dispatch(toggleTheme()); }}
                            trackColor={{
                                false: colors.switchBackground,
                                true: colors.primary + '66',
                            }}
                            thumbColor={isDark ? colors.primary : '#f4f3f4'}
                        />
                    </View>

                    <View style={styles.prefRow}>
                        <View style={styles.prefLeft}>
                            <Icon
                                name="credit-card"
                                size={20}
                                color={colors.mutedForeground}
                            />
                            <View style={styles.flex1}>
                                <Text style={[styles.prefTitle, { color: colors.foreground }]}>
                                    Currency
                                </Text>
                                <Text style={[styles.prefDesc, { color: colors.mutedForeground }]}>
                                    EGP (Egyptian Pound)
                                </Text>
                            </View>
                        </View>
                    </View>
                </Card>

                {/* Account Actions */}
                <Card>
                    <Button 
                        variant="outline" 
                        fullWidth 
                        onPress={() => dispatch(resetAuth())}
                    >
                        <Icon name="log-out" size={20} color={colors.foreground} style={{ marginRight: Spacing.sm }} />
                        <Text style={[styles.buttonTextOutline, { color: colors.foreground }]}>Log Out</Text>
                    </Button>
                </Card>

                {/* Danger Zone */}
                <Card borderColor={colors.destructive + '33'}>
                    <Text
                        style={[styles.cardTitle, { color: colors.destructive, marginBottom: Spacing.md }]}>
                        Danger Zone
                    </Text>
                    <Button variant="destructive" fullWidth>
                        Delete Account
                    </Button>
                </Card>

                <View style={{ height: Spacing['2xl'] }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
    content: { padding: Spacing.xl, gap: Spacing.xl }, // Maximize breathing room
    flex1: { flex: 1 },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: Spacing.lg,
    },
    cardTitle: { fontSize: 18, fontWeight: '700' },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.lg,
        marginBottom: Spacing.xl,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileName: { fontSize: 20, fontWeight: '700' },
    profileRole: { fontSize: 14, marginTop: 2 },
    formGrid: { gap: Spacing.lg },
    subCard: {
        marginBottom: Spacing.lg,
    },
    subRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.lg,
    },
    subLabel: { fontSize: 13, marginBottom: 4 },
    subPlan: { fontSize: 24, fontWeight: '700' },
    subDetails: { gap: Spacing.sm },
    subDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    memberRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.lg, // Added breathing room
        borderRadius: BorderRadius.lg, // Softer circles/cards
        marginBottom: Spacing.sm,
    },
    memberLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        flex: 1,
    },
    memberAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    memberName: { fontSize: 15, fontWeight: '500' },
    prefRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    prefLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        flex: 1,
    },
    prefTitle: { fontSize: 15, fontWeight: '500', marginBottom: 2 },
    subDetailLabel: { fontSize: 14 },
    subDetailValue: { fontWeight: '600', fontSize: 14 },
    memberEmail: { fontSize: 12 },
    inviteButton: { marginTop: Spacing.md },
    buttonTextOutline: { fontWeight: '600' },
    prefDesc: { fontSize: 13 },
});

export default ProfileScreen;
