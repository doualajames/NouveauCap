import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { colors, spacing, typography, borderRadius } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { authAPI, tokenManager } from '../services/api';
import { t } from '../utils/translations';

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { setUser, setToken, language } = useAppStore();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = language === 'fr' ? 'Email requis' : 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = language === 'fr' ? 'Email invalide' : 'Invalid email';
    }

    if (!password) {
      newErrors.password = language === 'fr' ? 'Mot de passe requis' : 'Password required';
    } else if (password.length < 6) {
      newErrors.password = language === 'fr' ? 'Min. 6 caractères' : 'Min. 6 characters';
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = language === 'fr' ? 'Les mots de passe ne correspondent pas' : 'Passwords do not match';
    }

    if (!isLogin && !name.trim()) {
      newErrors.name = language === 'fr' ? 'Nom requis' : 'Name required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      let response;
      if (isLogin) {
        response = await authAPI.login(email, password);
      } else {
        response = await authAPI.register({ email, password, name });
      }

      const { user, token } = response;

      await tokenManager.save(token);
      setToken(token);
      setUser(user);
      // Navigation will happen automatically based on isAuthenticated state
    } catch (error: any) {
      Alert.alert(
        t('auth.loginError', language),
        error.response?.data?.error || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo & Title */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>🇨🇦</Text>
            </View>
            <Text style={styles.title}>NouveauCap</Text>
            <Text style={styles.subtitle}>
              {t('onboarding.subtitle', language)}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.formTitle}>
              {isLogin ? t('auth.login', language) : t('auth.register', language)}
            </Text>

            {!isLogin && (
              <Input
                label={t('auth.name', language)}
                value={name}
                onChangeText={setName}
                placeholder="John Doe"
                error={errors.name}
                autoCapitalize="words"
              />
            )}

            <Input
              label={t('auth.email', language)}
              value={email}
              onChangeText={setEmail}
              placeholder="email@example.com"
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label={t('auth.password', language)}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              error={errors.password}
              secureTextEntry
            />

            {!isLogin && (
              <Input
                label={t('auth.confirmPassword', language)}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                error={errors.confirmPassword}
                secureTextEntry
              />
            )}

            <Button
              title={loading ? t('common.loading', language) : isLogin ? t('auth.login', language) : t('auth.register', language)}
              onPress={handleSubmit}
              loading={loading}
              fullWidth
              style={styles.submitButton}
            />

            <Button
              title={isLogin ? t('auth.noAccount', language) : t('auth.hasAccount', language)}
              onPress={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              variant="ghost"
              fullWidth
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    fontSize: 40,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  formTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
});
