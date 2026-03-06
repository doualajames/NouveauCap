import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { colors, spacing, typography, borderRadius } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { t } from '../utils/translations';

const modules = [
  {
    id: 'immigration',
    icon: '🛡️',
    color: colors.immigration,
    title: { fr: 'Immigration', en: 'Immigration' },
    description: { fr: 'Tâches, CRS, Alertes', en: 'Tasks, CRS, Alerts' },
  },
  {
    id: 'employment',
    icon: '💼',
    color: colors.employment,
    title: { fr: 'Emploi', en: 'Employment' },
    description: { fr: 'CV IA, Candidatures', en: 'AI CV, Applications' },
  },
  {
    id: 'housing',
    icon: '🏠',
    color: colors.housing,
    title: { fr: 'Logement', en: 'Housing' },
    description: { fr: 'Budget, Droits', en: 'Budget, Rights' },
  },
  {
    id: 'health',
    icon: '🏥',
    color: colors.health,
    title: { fr: 'Santé', en: 'Health' },
    description: { fr: 'Cliniques, Carte santé', en: 'Clinics, Health Card' },
  },
  {
    id: 'finance',
    icon: '💰',
    color: colors.finance,
    title: { fr: 'Finances', en: 'Finance' },
    description: { fr: 'Impôts, Banques', en: 'Taxes, Banks' },
  },
  {
    id: 'community',
    icon: '👥',
    color: colors.community,
    title: { fr: 'Communauté', en: 'Community' },
    description: { fr: 'Forum, Événements', en: 'Forum, Events' },
  },
];

export const HomeScreen: React.FC = () => {
  const { user, tasks, alerts, language } = useAppStore();

  const pendingTasks = tasks.filter((t) => t.status === 'PENDING').length;
  const urgentAlerts = alerts.filter((a) => !a.isRead).length;

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Status Card */}
        <Card variant="elevated" style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIconContainer}>
              <Text style={styles.statusIcon}>
                {user?.immigrationStatus === 'PERMANENT_RESIDENT'
                  ? '🛡️'
                  : user?.immigrationStatus === 'FOREIGN_STUDENT'
                  ? '🎓'
                  : '💼'}
              </Text>
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusLabel}>
                {language === 'fr' ? 'Votre statut' : 'Your status'}
              </Text>
              <Text style={styles.statusValue}>
                {t(`status.${user?.immigrationStatus}`, language)}
              </Text>
              {user?.province && (
                <Badge
                  label={user.province}
                  variant="primary"
                  size="sm"
                  style={styles.provinceBadge}
                />
              )}
            </View>
          </View>
        </Card>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{pendingTasks}</Text>
            <Text style={styles.statLabel}>
              {language === 'fr' ? 'Tâches en attente' : 'Pending tasks'}
            </Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{urgentAlerts}</Text>
            <Text style={styles.statLabel}>
              {language === 'fr' ? 'Alertes' : 'Alerts'}
            </Text>
          </Card>
        </View>

        {/* Modules Grid */}
        <Text style={styles.sectionTitle}>
          {language === 'fr' ? 'Modules' : 'Modules'}
        </Text>
        <View style={styles.modulesGrid}>
          {modules.map((module) => (
            <TouchableOpacity
              key={module.id}
              style={[styles.moduleCard, { borderLeftColor: module.color }]}
              activeOpacity={0.7}
            >
              <Text style={styles.moduleIcon}>{module.icon}</Text>
              <Text style={styles.moduleTitle}>
                {language === 'fr' ? module.title.fr : module.title.en}
              </Text>
              <Text style={styles.moduleDescription}>
                {language === 'fr' ? module.description.fr : module.description.en}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Tips */}
        <Card variant="outlined" style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>
            💡 {language === 'fr' ? 'Conseil du jour' : 'Tip of the day'}
          </Text>
          <Text style={styles.tipsText}>
            {language === 'fr'
              ? "N'oubliez pas de mettre à jour votre profil pour recevoir des recommandations personnalisées."
              : "Don't forget to update your profile to receive personalized recommendations."}
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  statusCard: {
    marginTop: spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIcon: {
    fontSize: 28,
  },
  statusInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  statusLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statusValue: {
    ...typography.h4,
    color: colors.text,
  },
  provinceBadge: {
    marginTop: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.h1,
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  moduleCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderLeftWidth: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  moduleIcon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  moduleTitle: {
    ...typography.h4,
    color: colors.text,
  },
  moduleDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  tipsCard: {
    marginTop: spacing.xl,
  },
  tipsTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  tipsText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
