import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { colors, spacing, typography, borderRadius } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { t } from '../utils/translations';
import { languageManager, authAPI } from '../services/api';

export const ProfileScreen: React.FC = () => {
  const { user, language, setLanguage, logout } = useAppStore();

  const handleLanguageChange = async (newLang: 'fr' | 'en') => {
    setLanguage(newLang);
    await languageManager.save(newLang);
  };

  const handleLogout = async () => {
    Alert.alert(
      t('common.logout', language),
      language === 'fr'
        ? 'Êtes-vous sûr de vouloir vous déconnecter?'
        : 'Are you sure you want to logout?',
      [
        { text: t('common.cancel', language), style: 'cancel' },
        {
          text: t('common.logout', language),
          style: 'destructive',
          onPress: async () => {
            try {
              await authAPI.logout();
            } catch (error) {
              // Ignore logout errors
            }
            logout();
          },
        },
      ]
    );
  };

  const subscriptionTier = user?.subscriptionTier || 'FREE';
  const tierColors: Record<string, string> = {
    FREE: colors.textSecondary,
    ESSENTIEL: colors.primary,
    PREMIUM: colors.accent,
    FAMILLE: colors.secondary,
  };

  const tierLabels: Record<string, { fr: string; en: string }> = {
    FREE: { fr: 'Gratuit', en: 'Free' },
    ESSENTIEL: { fr: 'Essentiel', en: 'Essential' },
    PREMIUM: { fr: 'Premium', en: 'Premium' },
    FAMILLE: { fr: 'Famille', en: 'Family' },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('common.profile', language)} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Utilisateur'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>

          <View style={styles.statusRow}>
            <Badge
              label={t(`status.${user?.immigrationStatus}`, language)}
              variant="primary"
            />
            {user?.province && (
              <Badge label={user.province} variant="secondary" />
            )}
          </View>
        </Card>

        {/* Subscription */}
        <Card title={language === 'fr' ? 'Abonnement' : 'Subscription'}>
          <View style={styles.subscriptionRow}>
            <View>
              <Text style={styles.tierLabel}>
                {language === 'fr' ? tierLabels[subscriptionTier].fr : tierLabels[subscriptionTier].en}
              </Text>
              {subscriptionTier === 'FREE' && (
                <Text style={styles.tierDesc}>
                  {language === 'fr'
                    ? 'Passez à Premium pour plus de fonctionnalités'
                    : 'Upgrade to Premium for more features'}
                </Text>
              )}
            </View>
            <View
              style={[
                styles.tierBadge,
                { backgroundColor: tierColors[subscriptionTier] },
              ]}
            >
              <Text style={styles.tierBadgeText}>
                {subscriptionTier === 'FREE' ? 'Ⓜ️' : '⭐'}
              </Text>
            </View>
          </View>
          {subscriptionTier === 'FREE' && (
            <Button
              title={language === 'fr' ? 'Passer à Premium' : 'Upgrade to Premium'}
              variant="primary"
              fullWidth
              style={styles.upgradeButton}
              onPress={() => {}}
            />
          )}
        </Card>

        {/* Language */}
        <Card title={t('common.language', language)}>
          <View style={styles.languageRow}>
            <TouchableOpacity
              style={[
                styles.languageOption,
                language === 'fr' && styles.languageActive,
              ]}
              onPress={() => handleLanguageChange('fr')}
            >
              <Text style={styles.languageFlag}>🇫🇷</Text>
              <Text
                style={[
                  styles.languageLabel,
                  language === 'fr' && styles.languageLabelActive,
                ]}
              >
                {t('common.french', language)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.languageOption,
                language === 'en' && styles.languageActive,
              ]}
              onPress={() => handleLanguageChange('en')}
            >
              <Text style={styles.languageFlag}>🇬🇧</Text>
              <Text
                style={[
                  styles.languageLabel,
                  language === 'en' && styles.languageLabelActive,
                ]}
              >
                {t('common.english', language)}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Settings Links */}
        <Card>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={styles.menuLabel}>
              {language === 'fr' ? 'Notifications' : 'Notifications'}
            </Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔒</Text>
            <Text style={styles.menuLabel}>
              {language === 'fr' ? 'Confidentialité' : 'Privacy'}
            </Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuLabel}>
              {language === 'fr' ? 'Aide et support' : 'Help & Support'}
            </Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📄</Text>
            <Text style={styles.menuLabel}>
              {language === 'fr' ? 'Conditions d\'utilisation' : 'Terms of Service'}
            </Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </Card>

        {/* Logout */}
        <Button
          title={t('common.logout', language)}
          onPress={handleLogout}
          variant="danger"
          fullWidth
          style={styles.logoutButton}
        />

        {/* Version */}
        <Text style={styles.version}>NouveauCap v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  profileCard: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    ...typography.h1,
    color: '#FFFFFF',
  },
  userName: {
    ...typography.h3,
    color: colors.text,
  },
  userEmail: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tierLabel: {
    ...typography.h4,
    color: colors.text,
  },
  tierDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  tierBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierBadgeText: {
    fontSize: 20,
  },
  upgradeButton: {
    marginTop: spacing.md,
  },
  languageRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  languageOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  languageFlag: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  languageLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  languageLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  menuLabel: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  menuArrow: {
    ...typography.body,
    color: colors.textLight,
  },
  logoutButton: {
    marginTop: spacing.xl,
  },
  version: {
    ...typography.caption,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
