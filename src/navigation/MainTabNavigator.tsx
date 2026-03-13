import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import { useAppTheme } from '../core/theme/useAppTheme';

import DashboardScreen from '../screens/dashboard/DashboardScreen';
import MenuScreen from '../screens/menu/MenuScreen';
import MenuItemDetailsScreen from '../screens/menu/MenuItemDetailsScreen';
import FeedbackScreen from '../screens/feedback/FeedbackScreen';
import InsightsScreen from '../screens/insights/InsightsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SubscriptionScreen from '../screens/subscription/SubscriptionScreen';

export type MainTabParamList = {
    Home: undefined;
    MenuTab: undefined;
    Feedback: undefined;
    Insights: undefined;
    ProfileTab: undefined;
};

export type MenuStackParamList = {
    MenuMain: undefined;
    MenuItemDetails: { itemId: string };
};

export type ProfileStackParamList = {
    Profile: undefined;
    Subscription: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const MenuStack = createNativeStackNavigator<MenuStackParamList>();

const MenuStackNavigator: React.FC = () => {
    return (
        <MenuStack.Navigator screenOptions={{ headerShown: false }}>
            <MenuStack.Screen name="MenuMain" component={MenuScreen} />
            <MenuStack.Screen
                name="MenuItemDetails"
                component={MenuItemDetailsScreen}
            />
        </MenuStack.Navigator>
    );
};

const ProfileStackNavigator: React.FC = () => {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} />
            <ProfileStack.Screen
                name="Subscription"
                component={SubscriptionScreen}
            />
        </ProfileStack.Navigator>
    );
};

const getTabBarIcon = (routeName: string, color: string, size: number) => {
    let iconName: string;
    switch (routeName) {
        case 'Home':
            iconName = 'home';
            break;
        case 'MenuTab':
            iconName = 'book-open';
            break;
        case 'Feedback':
            iconName = 'message-square';
            break;
        case 'Insights':
            iconName = 'bar-chart-2';
            break;
        case 'ProfileTab':
            iconName = 'user';
            break;
        default:
            iconName = 'circle';
    }
    return <Icon name={iconName} size={size} color={color} />;
};

const MainTabNavigator: React.FC = () => {
    const { colors } = useAppTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) =>
                    getTabBarIcon(route.name, color, size),
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.mutedForeground,
                tabBarStyle: {
                    backgroundColor: colors.card,
                    borderTopColor: colors.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 4,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500' as const,
                },
            })}>
            <Tab.Screen name="Home" component={DashboardScreen} />
            <Tab.Screen 
                name="MenuTab" 
                component={MenuStackNavigator} 
                options={{ tabBarLabel: 'Menu' }}
            />
            <Tab.Screen name="Feedback" component={FeedbackScreen} />
            <Tab.Screen name="Insights" component={InsightsScreen} />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStackNavigator}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
