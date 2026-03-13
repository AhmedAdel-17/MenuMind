/**
 * Plateful Mobile App
 * React Native conversion of the Plateful restaurant menu optimization website
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/core/store';
import { useAppSelector } from './src/core/store/hooks';
import RootNavigator from './src/navigation/RootNavigator';

function AppContent() {
  const mode = useAppSelector(state => state.theme.mode);
  const isDark = mode === 'dark';

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#1a1a1a' : '#ffffff'}
      />
      <RootNavigator />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
