import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { colors, spacing, typography, borderRadius } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { t } from '../utils/translations';

export const HousingScreen: React.FC = () => {
  const { user, language } = useAppStore();
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [rent, setRent] = useState(1800);
  const [utilities, setUtilities] = useState(150);
  const [insurance, setInsurance] = useState(30);

  const totalHousingCost = rent + utilities + insurance;
  const housingRatio = (totalHousingCost / monthlyIncome) * 100;
  const disposableIncome = monthlyIncome - totalHousingCost;

  const tenantRights = [
    {
      province: 'QC',
      name: language === 'fr' ? 'Québec' : 'Quebec',
      board: 'TAL',
      deposit: language === 'fr' ? '1er mois max' : '1st month max',
      notice: language === 'fr' ? '3 mois' : '3 months',
      increase: '2024: 3-4%',
      color: colors.primary,
    },
    {
      province: 'ON',
      name: 'Ontario',
      board: 'LTB',
      deposit: language === 'fr' ? 'Interdit' : 'Prohibited',
      notice: language === 'fr' ? '60 jours' : '60 days',
      increase: '2024: 2.5%',
      color: colors.secondary,
    },
    {
      province: 'BC',
      name: language === 'fr' ? 'C.-B.' : 'BC',
      board: 'RTB',
      deposit: language === 'fr' ? '½ mois' : '½ month',
      notice: language === 'fr' ? '1 mois' : '1 month',
      increase: '2024: 3.5%',
      color: colors.accent,
    },
    {
      province: 'AB',
      name: 'Alberta',
      board: 'RTDRS',
      deposit: language === 'fr' ? '1 mois' : '1 month',
      notice: language === 'fr' ? '1 mois' : '1 month',
      increase: language === 'fr' ? 'Aucun plafond' : 'No cap',
      color: colors.danger,
    },
  ];

  const housingResources = [
    {
      name: 'Kijiji',
      url: 'https://www.kijiji.ca',
      description: language === 'fr' ? 'Petites annonces' : 'Classifieds',
    },
    {
      name: 'Centris',
      url: 'https://www.centris.ca',
      description: language === 'fr' ? 'Québec immobilier' : 'Quebec real estate',
    },
    {
      name: 'Rentals.ca',
      url: 'https://www.rentals.ca',
      description: language === 'fr' ? 'Locations Canada' : 'Canada rentals',
    },
    {
      name: 'Zumper',
      url: 'https://www.zumper.com',
      description: language === 'fr' ? 'Appartements' : 'Apartments',
    },
    {
      name: 'Facebook Marketplace',
      url: 'https://www.facebook.com/marketplace',
      description: language === 'fr' ? 'Annonces locales' : 'Local listings',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('modules.housing.title', language)} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Budget Calculator */}
        <Card title={t('modules.housing.calculator', language)}>
          <View style={styles.calculatorRow}>
            <Text style={styles.calcLabel}>{t('housing.monthlyIncome', language)}</Text>
            <Text style={styles.calcValue}>${monthlyIncome}</Text>
          </View>
          <View style={styles.calculatorRow}>
            <Text style={styles.calcLabel}>{t('housing.rent', language)}</Text>
            <Text style={styles.calcValue}>${rent}</Text>
          </View>
          <View style={styles.calculatorRow}>
            <Text style={styles.calcLabel}>{t('housing.utilities', language)}</Text>
            <Text style={styles.calcValue}>${utilities}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.resultContainer}>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>{t('housing.ratio', language)}</Text>
              <Text
                style={[
                  styles.resultValue,
                  housingRatio > 30
                    ? styles.ratioHigh
                    : housingRatio > 25
                    ? styles.ratioMedium
                    : styles.ratioGood,
                ]}
              >
                {housingRatio.toFixed(1)}%
              </Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>{t('housing.disposableIncome', language)}</Text>
              <Text style={[styles.resultValue, styles.incomeValue]}>${disposableIncome}</Text>
            </View>
          </View>

          {housingRatio > 30 && (
            <View style={styles.warningContainer}>
              <Text style={styles.warningText}>
                ⚠️ {language === 'fr'
                  ? 'Le ratio logement dépasse 30% de vos revenus.'
                  : 'Housing ratio exceeds 30% of your income.'}
              </Text>
            </View>
          )}
        </Card>

        {/* Tenant Rights */}
        <Text style={styles.sectionTitle}>
          {t('modules.housing.rights', language)}
        </Text>

        {tenantRights.map((rights) => {
          const cardStyle = user?.province === rights.province
            ? { ...styles.rightsCard, borderWidth: 2, borderColor: colors.primary }
            : styles.rightsCard;
          return (
            <Card
              key={rights.province}
              style={cardStyle}
            >
            <View style={[styles.rightsHeader, { backgroundColor: rights.color }]}>
              <Text style={styles.rightsProvince}>{rights.name}</Text>
            </View>
            <View style={styles.rightsContent}>
              <View style={styles.rightsRow}>
                <Text style={styles.rightsLabel}>Tribunal:</Text>
                <Text style={styles.rightsValue}>{rights.board}</Text>
              </View>
              <View style={styles.rightsRow}>
                <Text style={styles.rightsLabel}>
                  {language === 'fr' ? 'Dépôt:' : 'Deposit:'}
                </Text>
                <Text style={styles.rightsValue}>{rights.deposit}</Text>
              </View>
              <View style={styles.rightsRow}>
                <Text style={styles.rightsLabel}>
                  {language === 'fr' ? 'Préavis:' : 'Notice:'}
                </Text>
                <Text style={styles.rightsValue}>{rights.notice}</Text>
              </View>
              <View style={styles.rightsRow}>
                <Text style={styles.rightsLabel}>
                  {language === 'fr' ? 'Augmentation:' : 'Increase:'}
                </Text>
                <Text style={styles.rightsValue}>{rights.increase}</Text>
              </View>
            </View>
          </Card>
          );
        })}

        {/* Housing Resources */}
        <Text style={styles.sectionTitle}>
          {t('modules.housing.search', language)}
        </Text>

        <View style={styles.resourcesGrid}>
          {housingResources.map((resource, index) => (
            <TouchableOpacity key={index} style={styles.resourceCard}>
              <Text style={styles.resourceName}>{resource.name}</Text>
              <Text style={styles.resourceDesc}>{resource.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips */}
        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>
            💡 {language === 'fr' ? 'Conseils pour éviter les arnaques' : 'Tips to avoid scams'}
          </Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              {language === 'fr'
                ? 'Ne payez jamais avant de visiter le logement'
                : 'Never pay before visiting the property'}
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              {language === 'fr'
                ? 'Méfiez-vous des prix trop bas'
                : 'Be wary of prices that are too low'}
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              {language === 'fr'
                ? 'Vérifiez que le "propriétaire" a accès au logement'
                : 'Verify the "landlord" has access to the property'}
            </Text>
          </View>
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
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  calculatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  calcLabel: {
    ...typography.body,
    color: colors.text,
  },
  calcValue: {
    ...typography.h4,
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resultItem: {
    alignItems: 'center',
  },
  resultLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  resultValue: {
    ...typography.h2,
  },
  ratioGood: {
    color: colors.success,
  },
  ratioMedium: {
    color: colors.warning,
  },
  ratioHigh: {
    color: colors.danger,
  },
  incomeValue: {
    color: colors.primary,
  },
  warningContainer: {
    backgroundColor: `${colors.warning}20`,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  warningText: {
    ...typography.bodySmall,
    color: colors.warning,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  rightsCard: {
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  rightsHeader: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  rightsProvince: {
    ...typography.h4,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  rightsContent: {
    padding: spacing.md,
  },
  rightsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  rightsLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  rightsValue: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '500',
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  resourceCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  resourceName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  resourceDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  tipsCard: {
    marginTop: spacing.xl,
    backgroundColor: `${colors.info}10`,
  },
  tipsTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  tipBullet: {
    ...typography.body,
    color: colors.info,
    marginRight: spacing.sm,
  },
  tipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
  },
});
