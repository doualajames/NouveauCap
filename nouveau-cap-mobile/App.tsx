import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Store
import { useAppStore } from './src/store/useAppStore';

// Services
import { tokenManager, languageManager, authAPI } from './src/services/api';

// Types
import { Language } from './src/types';

// Screens
import { AuthScreen } from './src/screens/AuthScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ImmigrationScreen } from './src/screens/ImmigrationScreen';
import { HousingScreen } from './src/screens/HousingScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

// Theme
import { colors, typography } from './src/utils/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder screens for modules not yet implemented
const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.placeholderContainer}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

// Tab Navigator for main app
const MainTabs: React.FC = () => {
  const { language } = useAppStore();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: language === 'fr' ? 'Accueil' : 'Home',
          tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Immigration"
        component={ImmigrationScreen}
        options={{
          tabBarLabel: language === 'fr' ? 'Immigration' : 'Immigration',
          tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>🛡️</Text>,
        }}
      />
      <Tab.Screen
        name="Housing"
        component={HousingScreen}
        options={{
          tabBarLabel: language === 'fr' ? 'Logement' : 'Housing',
          tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>🏘️</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: language === 'fr' ? 'Profil' : 'Profile',
          tabBarIcon: ({ color }) => <Text style={[styles.tabIcon, { color }]}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, token, setUser, setToken, setLanguage, isAuthenticated, isLoading: storeLoading } = useAppStore();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // Load saved language preference
      const savedLang = await languageManager.get();
      setLanguage(savedLang);

      // Check for existing token
      const savedToken = await tokenManager.get();
      if (savedToken) {
        setToken(savedToken);
        // Fetch current user
        const currentUser = await authAPI.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.log('Auth check failed:', error);
      await tokenManager.remove();
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <Stack.Screen name="Auth" component={AuthScreen} />
          ) : !user?.onboardingCompleted ? (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          ) : (
            <Stack.Screen name="Main" component={MainTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    paddingBottom: 8,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  tabIcon: {
    fontSize: 20,
  },
});
