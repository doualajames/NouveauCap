import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { colors, spacing, typography, borderRadius } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { onboardingAPI } from '../services/api';
import { t } from '../utils/translations';
import { ImmigrationStatus, Province, FamilyStatus } from '../types';

const { width } = Dimensions.get('window');

const immigrationStatuses: { code: ImmigrationStatus; icon: string }[] = [
  { code: 'PERMANENT_RESIDENT', icon: '🛡️' },
  { code: 'FOREIGN_STUDENT', icon: '🎓' },
  { code: 'OPEN_WORK_PERMIT', icon: '💼' },
  { code: 'CLOSED_WORK_PERMIT', icon: '🏢' },
];

const provinces: { code: Province; name: string; nameEn: string }[] = [
  { code: 'ON', name: 'Ontario', nameEn: 'Ontario' },
  { code: 'QC', name: 'Québec', nameEn: 'Quebec' },
  { code: 'BC', name: 'Colombie-Britannique', nameEn: 'British Columbia' },
  { code: 'AB', name: 'Alberta', nameEn: 'Alberta' },
  { code: 'MB', name: 'Manitoba', nameEn: 'Manitoba' },
  { code: 'SK', name: 'Saskatchewan', nameEn: 'Saskatchewan' },
  { code: 'NS', name: 'Nouvelle-Écosse', nameEn: 'Nova Scotia' },
  { code: 'NB', name: 'Nouveau-Brunswick', nameEn: 'New Brunswick' },
  { code: 'PE', name: 'Île-du-Prince-Édouard', nameEn: 'Prince Edward Island' },
  { code: 'NL', name: 'Terre-Neuve-et-Labrador', nameEn: 'Newfoundland and Labrador' },
];

const familyStatuses: { code: FamilyStatus; icon: string }[] = [
  { code: 'SINGLE', icon: '👤' },
  { code: 'COUPLE', icon: '👫' },
  { code: 'FAMILY_WITH_CHILDREN', icon: '👨‍👩‍👧‍👦' },
];

const sectors = [
  { code: 'technology', label: '💻 Technologie / TI' },
  { code: 'finance', label: '💰 Finance / Comptabilité' },
  { code: 'health', label: '🏥 Santé / Médical' },
  { code: 'education', label: '📚 Éducation' },
  { code: 'engineering', label: '🔧 Ingénierie' },
  { code: 'trades', label: '🔨 Métiers spécialisés' },
  { code: 'hospitality', label: '🍽️ Hôtellerie / Restauration' },
  { code: 'other', label: '📦 Autre' },
];

const goals = [
  { code: 'citizenship', icon: '🏅' },
  { code: 'career', icon: '💼' },
  { code: 'education', icon: '🎓' },
  { code: 'family', icon: '👨‍👩‍👧‍👦' },
  { code: 'business', icon: '🏢' },
];

export const OnboardingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { language, setUser, user } = useAppStore();

  const [data, setData] = useState({
    immigrationStatus: '' as ImmigrationStatus | '',
    province: '' as Province | '',
    city: '',
    alreadyInCanada: true,
    arrivalDate: '',
    professionalSector: '',
    familyStatus: '' as FamilyStatus | '',
    primaryGoal: '',
  });

  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const onboardingData = {
        immigrationStatus: data.immigrationStatus || undefined,
        province: data.province || undefined,
        city: data.city || undefined,
        alreadyInCanada: data.alreadyInCanada,
        arrivalDate: data.arrivalDate || undefined,
        professionalSector: data.professionalSector || undefined,
        familyStatus: data.familyStatus || undefined,
        primaryGoal: data.primaryGoal || undefined,
        onboardingCompleted: true,
      };
      await onboardingAPI.save(onboardingData);
      setUser({ ...user!, onboardingCompleted: true });
      // Navigation will happen automatically based on state
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!data.immigrationStatus;
      case 2:
        return !!data.province;
      case 3:
        return !!data.city;
      case 4:
        return true; // Arrival date is optional
      case 5:
        return !!data.professionalSector;
      case 6:
        return !!data.familyStatus;
      case 7:
        return !!data.primaryGoal;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{t('onboarding.step1Title', language)}</Text>
            <View style={styles.optionsGrid}>
              {immigrationStatuses.map((status) => (
                <TouchableOpacity
                  key={status.code}
                  style={[
                    styles.optionCard,
                    data.immigrationStatus === status.code && styles.optionSelected,
                  ]}
                  onPress={() => setData({ ...data, immigrationStatus: status.code })}
                >
                  <Text style={styles.optionIcon}>{status.icon}</Text>
                  <Text style={styles.optionLabel}>
                    {t(`status.${status.code}`, language)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{t('onboarding.step2Title', language)}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.optionsGrid}>
                {provinces.map((province) => (
                  <TouchableOpacity
                    key={province.code}
                    style={[
                      styles.optionCard,
                      data.province === province.code && styles.optionSelected,
                    ]}
                    onPress={() => setData({ ...data, province: province.code })}
                  >
                    <Text style={styles.optionLabel}>
                      {language === 'fr' ? province.name : province.nameEn}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{t('onboarding.step3Title', language)}</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  data.alreadyInCanada && styles.toggleActive,
                ]}
                onPress={() => setData({ ...data, alreadyInCanada: true })}
              >
                <Text style={[styles.toggleText, data.alreadyInCanada && styles.toggleTextActive]}>
                  {language === 'fr' ? 'Déjà au Canada' : 'Already in Canada'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  !data.alreadyInCanada && styles.toggleActive,
                ]}
                onPress={() => setData({ ...data, alreadyInCanada: false })}
              >
                <Text style={[styles.toggleText, !data.alreadyInCanada && styles.toggleTextActive]}>
                  {language === 'fr' ? 'Pas encore arrivé' : 'Not yet arrived'}
                </Text>
              </TouchableOpacity>
            </View>
            {/* City input would go here */}
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{t('onboarding.step4Title', language)}</Text>
            <Text style={styles.stepDescription}>
              {language === 'fr'
                ? 'Quand êtes-vous arrivé ou prévoyez-vous arriver au Canada?'
                : 'When did you arrive or plan to arrive in Canada?'}
            </Text>
            {/* Date picker would go here */}
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{t('onboarding.step5Title', language)}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.optionsList}>
                {sectors.map((sector) => (
                  <TouchableOpacity
                    key={sector.code}
                    style={[
                      styles.listOption,
                      data.professionalSector === sector.code && styles.listOptionSelected,
                    ]}
                    onPress={() => setData({ ...data, professionalSector: sector.code })}
                  >
                    <Text style={styles.listOptionLabel}>{sector.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        );

      case 6:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{t('onboarding.step6Title', language)}</Text>
            <View style={styles.optionsGrid}>
              {familyStatuses.map((status) => (
                <TouchableOpacity
                  key={status.code}
                  style={[
                    styles.optionCard,
                    data.familyStatus === status.code && styles.optionSelected,
                  ]}
                  onPress={() => setData({ ...data, familyStatus: status.code })}
                >
                  <Text style={styles.optionIcon}>{status.icon}</Text>
                  <Text style={styles.optionLabel}>
                    {t(`family.${status.code}`, language)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 7:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{t('onboarding.step7Title', language)}</Text>
            <View style={styles.optionsGrid}>
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal.code}
                  style={[
                    styles.optionCard,
                    data.primaryGoal === goal.code && styles.optionSelected,
                  ]}
                  onPress={() => setData({ ...data, primaryGoal: goal.code })}
                >
                  <Text style={styles.optionIcon}>{goal.icon}</Text>
                  <Text style={styles.optionLabel}>
                    {t(`goals.${goal.code}`, language)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentStep / totalSteps) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentStep} / {totalSteps}
        </Text>
      </View>

      {/* Content */}
      {renderStep()}

      {/* Navigation */}
      <View style={styles.navigation}>
        {currentStep > 1 && (
          <Button
            title={t('common.previous', language)}
            onPress={handlePrevious}
            variant="outline"
          />
        )}
        {currentStep < totalSteps ? (
          <Button
            title={t('common.next', language)}
            onPress={handleNext}
            disabled={!isStepValid()}
          />
        ) : (
          <Button
            title={t('onboarding.letsGo', language)}
            onPress={handleComplete}
            loading={loading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  stepContent: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  stepTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  stepDescription: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  optionIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  optionLabel: {
    ...typography.bodySmall,
    color: colors.text,
    textAlign: 'center',
  },
  optionsList: {
    gap: spacing.sm,
  },
  listOption: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  listOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  listOptionLabel: {
    ...typography.body,
    color: colors.text,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  toggleActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  toggleText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  toggleTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
});
