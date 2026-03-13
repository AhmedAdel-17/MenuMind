import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../core/store/hooks';
import AuthStack from './AuthStack';
import MainTabNavigator from './MainTabNavigator';

const RootNavigator: React.FC = () => {
    const isOnboarded = useAppSelector(state => state.auth.isOnboarded);

    return (
        <NavigationContainer>
            {isOnboarded ? <MainTabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default RootNavigator;
