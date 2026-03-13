import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { useAppDispatch, useAppSelector } from '../../core/store/hooks';
import { completeOnboarding, setUserProfile, loginUser } from '../../core/store/slices/authSlice';
import { Card } from '../../common/components/Card';
import { Button } from '../../common/components/Button';
import { Input } from '../../common/components/Input';
import { Spacing, BorderRadius } from '../../core/theme';

const OnboardingScreen: React.FC = () => {
    const [step, setStep] = useState(1);
    const { colors } = useAppTheme();
    const dispatch = useAppDispatch();

    const [restaurant, setRestaurant] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [formError, setFormError] = useState('');

    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const authLoading = useAppSelector(state => state.auth.loading);
    const authError = useAppSelector(state => state.auth.error);

    const handleNext = () => {
        setFormError('');
        if (step === 2) {
            if (!name || !restaurant || !email || !phone || !location || !cuisine) {
                setFormError('All fields are required.');
                return;
            }
        }
        if (step < 3) setStep(step + 1);
    };

    const handleComplete = () => {
        dispatch(
            setUserProfile({
                name,
                restaurant,
                email,
                phone,
                location,
            }),
        );
        dispatch(completeOnboarding());
    };

    const handleLogin = () => {
        // With MOCK_API enabled, password isn't validated, we just log in via the thunk.
        dispatch(loginUser({ email: loginEmail, name: 'Welcome Back' }));
    };

    // Step 1: Welcome
    if (step === 1) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.centerContainer}>
                        <Card style={styles.welcomeCard}>
                            <View style={styles.logoContainer}>
                                <View
                                    style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
                                    <Icon name="award" size={40} color="#fff" />
                                </View>
                                <Text style={[styles.appTitle, { color: colors.primary }]}>
                                    Welcome to Plateful
                                </Text>
                                <Text style={[styles.appSubtitle, { color: colors.mutedForeground }]}>
                                    Optimize your restaurant menu profitability using AI
                                </Text>
                            </View>

                            <View style={styles.featuresContainer}>
                                <View style={styles.featureRow}>
                                    <View
                                        style={[
                                            styles.featureIcon,
                                            { backgroundColor: colors.primary + '1A' },
                                        ]}>
                                        <Icon name="trending-up" size={24} color={colors.primary} />
                                    </View>
                                    <View style={styles.featureText}>
                                        <Text style={[styles.featureTitle, { color: colors.foreground }]}>
                                            Analyze Margins
                                        </Text>
                                        <Text
                                            style={[
                                                styles.featureDesc,
                                                { color: colors.mutedForeground },
                                            ]}>
                                            See which menu items are most profitable at a glance
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.featureRow}>
                                    <View
                                        style={[
                                            styles.featureIcon,
                                            { backgroundColor: colors.primary + '1A' },
                                        ]}>
                                        <Icon
                                            name="message-square"
                                            size={24}
                                            color={colors.primary}
                                        />
                                    </View>
                                    <View style={styles.featureText}>
                                        <Text style={[styles.featureTitle, { color: colors.foreground }]}>
                                            Collect Feedback
                                        </Text>
                                        <Text
                                            style={[
                                                styles.featureDesc,
                                                { color: colors.mutedForeground },
                                            ]}>
                                            Get real-time customer insights via QR codes
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.featureRow}>
                                    <View
                                        style={[
                                            styles.featureIcon,
                                            { backgroundColor: colors.primary + '1A' },
                                        ]}>
                                        <Icon name="zap" size={24} color={colors.primary} />
                                    </View>
                                    <View style={styles.featureText}>
                                        <Text style={[styles.featureTitle, { color: colors.foreground }]}>
                                            AI Recommendations
                                        </Text>
                                        <Text
                                            style={[
                                                styles.featureDesc,
                                                { color: colors.mutedForeground },
                                            ]}>
                                            Get data-driven pricing suggestions to boost profit
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <Button onPress={() => setStep(2)} size="lg" fullWidth>
                                <Text style={styles.buttonText}>Get Started</Text>
                                <Icon name="arrow-right" size={20} color="#fff" />
                            </Button>
                            
                            <Button 
                                onPress={() => setStep(4)} 
                                variant="outline" 
                                size="lg" 
                                fullWidth 
                                style={{ marginTop: Spacing.md }}
                            >
                                <Text style={[styles.buttonTextOutline, { color: colors.foreground }]}>
                                    Log In to Existing Account
                                </Text>
                            </Button>
                        </Card>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Step 2: Create Account
    if (step === 2) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.centerContainer}>
                        <Card style={styles.welcomeCard}>
                            <Text style={[styles.stepTitle, { color: colors.foreground }]}>
                                Create Your Account
                            </Text>
                            <Text style={[styles.stepSubtitle, { color: colors.mutedForeground }]}>
                                Setup your restaurant details to continue
                            </Text>

                            <View style={[styles.formContainer, { gap: Spacing.xl }]}>
                                <View style={styles.inputGroup}>
                                    <Input
                                        label="Restaurant Name"
                                        placeholder="Enter your restaurant name"
                                        value={restaurant}
                                        onChangeText={setRestaurant}
                                    />
                                    <Input
                                        label="Your Name"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                    <Input
                                        label="Email"
                                        placeholder="you@example.com"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                    <Input
                                        label="Phone Number"
                                        placeholder="+20 123 456 7890"
                                        keyboardType="phone-pad"
                                        value={phone}
                                        onChangeText={setPhone}
                                    />
                                    <Input
                                        label="Location"
                                        placeholder="City, Country"
                                        value={location}
                                        onChangeText={setLocation}
                                    />
                                    <Input
                                        label="Cuisine Type"
                                        placeholder="e.g., Italian, Mexican, American"
                                        value={cuisine}
                                        onChangeText={setCuisine}
                                    />
                                </View>
                                {formError ? <Text style={[styles.errorText, { color: colors.destructive }]}>{formError}</Text> : null}
                            </View>

                            <View style={styles.buttonRow}>
                                <Button
                                    onPress={() => setStep(1)}
                                    variant="outline"
                                    style={styles.flex1}>
                                    Back
                                </Button>
                                <Button onPress={handleNext} style={styles.flex1}>
                                    Continue
                                </Button>
                            </View>
                        </Card>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Step 3: Upload Menu
    if (step === 3) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.centerContainer}>
                        <Card style={styles.welcomeCard}>
                            <Text style={[styles.stepTitle, { color: colors.foreground }]}>
                                Upload Your Menu
                            </Text>
                            <Text
                                style={[styles.stepSubtitle, { color: colors.mutedForeground }]}>
                                You can upload your menu now or do it later from the dashboard
                            </Text>

                            <TouchableOpacity
                                style={[
                                    styles.uploadArea,
                                    { borderColor: colors.border },
                                ]}
                                activeOpacity={0.7}>
                                <View
                                    style={[
                                        styles.uploadIcon,
                                        { backgroundColor: colors.muted },
                                    ]}>
                                    <Icon name="upload" size={32} color={colors.mutedForeground} />
                                </View>
                                <Text style={[styles.uploadTitle, { color: colors.foreground }]}>
                                    Upload CSV File
                                </Text>
                                <Text
                                    style={[
                                        styles.uploadHint,
                                        { color: colors.mutedForeground },
                                    ]}>
                                    Tap to select your menu file
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.buttonRow}>
                                <Button
                                    onPress={() => setStep(2)}
                                    variant="outline"
                                    style={styles.flex1}>
                                    Back
                                </Button>
                                <Button onPress={handleComplete} style={styles.flex1}>
                                    Skip for Now
                                </Button>
                            </View>
                        </Card>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Step 4: Login Account
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <View style={styles.centerContainer}>
                    <Card style={styles.welcomeCard}>
                        <Text style={[styles.stepTitle, { color: colors.foreground }]}>
                            Welcome Back
                        </Text>
                        <Text style={[styles.stepSubtitle, { color: colors.mutedForeground }]}>
                            Sign in to your Plateful account
                        </Text>

                        <View style={[styles.formContainer, { gap: Spacing.xl }]}>
                            <Input
                                label="Email Address"
                                placeholder="you@example.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={loginEmail}
                                onChangeText={setLoginEmail}
                            />
                            <Input
                                label="Password"
                                placeholder="••••••••"
                                secureTextEntry
                                value={loginPassword}
                                onChangeText={setLoginPassword}
                            />
                            {authError ? <Text style={[styles.errorText, { color: colors.destructive }]}>{authError}</Text> : null}
                        </View>

                        <View style={styles.buttonRow}>
                            <Button
                                onPress={() => setStep(1)}
                                variant="outline"
                                style={styles.flex1}
                                disabled={authLoading}
                            >
                                Back
                            </Button>
                            <Button 
                                onPress={handleLogin} 
                                style={styles.flex1}
                                disabled={authLoading}
                            >
                                {authLoading ? 'Signing In...' : 'Log In'}
                            </Button>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: Spacing.lg,
    },
    centerContainer: {
        alignItems: 'center',
        gap: 16,
    },
    inputGroup: {
        gap: 12,
    },
    buttonRow: {
        width: '100%',
        maxWidth: 400,
        flexDirection: 'row',
        gap: Spacing.md,
        marginTop: Spacing.md,
    },
    welcomeCard: {
        width: '100%',
        maxWidth: 400,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: Spacing['3xl'],
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
    },
    appTitle: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: Spacing.sm,
    },
    appSubtitle: {
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22,
    },
    featuresContainer: {
        gap: Spacing.xl,
        marginBottom: Spacing['3xl'],
    },
    featureRow: {
        flexDirection: 'row',
        gap: Spacing.lg,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    featureDesc: {
        fontSize: 14,
        lineHeight: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonTextOutline: {
        fontSize: 16,
        fontWeight: '600',
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: Spacing.sm,
    },
    stepSubtitle: {
        fontSize: 15,
        marginBottom: Spacing.xl,
        lineHeight: 22,
    },
    formContainer: {
        gap: Spacing.lg,
        marginBottom: Spacing.xl,
    },
    flex1: {
        flex: 1,
    },
    uploadArea: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: BorderRadius.lg,
        padding: Spacing['3xl'],
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    uploadIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
    },
    uploadTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    uploadHint: {
        fontSize: 14,
    },
    errorText: {
        textAlign: 'center',
        marginTop: 10,
    },
});

export default OnboardingScreen;
