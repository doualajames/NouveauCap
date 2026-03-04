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
import { Button } from '../components/Button';
import { colors, spacing, typography, borderRadius } from '../utils/theme';
import { useAppStore } from '../store/useAppStore';
import { tasksAPI } from '../services/api';
import { t } from '../utils/translations';
import { Task } from '../types';

export const ImmigrationScreen: React.FC = () => {
  const { user, tasks, setTasks, language } = useAppStore();
  const [activeTab, setActiveTab] = useState<'tasks' | 'crs' | 'alerts'>('tasks');
  const [loading, setLoading] = useState(false);

  // CRS Calculator state
  const [age, setAge] = useState(30);
  const [education, setEducation] = useState('bachelors');
  const [clbLevel, setClbLevel] = useState(7);
  const [canadaExp, setCanadaExp] = useState(0);
  const [outsideExp, setOutsideExp] = useState(3);
  const [crsScore, setCrsScore] = useState<number | null>(null);

  const isTemporaryResident = ['FOREIGN_STUDENT', 'OPEN_WORK_PERMIT', 'CLOSED_WORK_PERMIT'].includes(
    user?.immigrationStatus || ''
  );

  const pendingTasks = tasks.filter((t) => t.status === 'PENDING' && t.category === 'IMMIGRATION');
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED' && t.category === 'IMMIGRATION');

  const handleTaskToggle = async (taskId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
      await tasksAPI.update(taskId, { status: newStatus });
      setTasks(
        tasks.map((t) =>
          t.id === taskId ? { ...t, status: newStatus } : t
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const calculateCRS = () => {
    let score = 0;

    // Age points (simplified)
    if (age >= 18 && age <= 35) {
      score += 110;
    } else if (age >= 36 && age <= 40) {
      score += 80;
    } else if (age >= 41 && age <= 45) {
      score += 50;
    }

    // Education points
    const eduPoints: Record<string, number> = {
      phd: 150,
      masters: 135,
      bachelors: 120,
      diploma: 90,
      highschool: 30,
    };
    score += eduPoints[education] || 0;

    // Language points (CLB)
    if (clbLevel >= 9) {
      score += 120;
    } else if (clbLevel === 8) {
      score += 100;
    } else if (clbLevel === 7) {
      score += 80;
    }

    // Canadian experience
    if (canadaExp >= 3) {
      score += 80;
    } else if (canadaExp >= 1) {
      score += 40;
    }

    // Foreign experience
    if (outsideExp >= 3) {
      score += 50;
    } else if (outsideExp >= 1) {
      score += 25;
    }

    setCrsScore(score);
  };

  const renderTasks = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
      {/* Stats */}
      <View style={styles.statsRow}>
        <Card style={styles.statItem}>
          <Text style={styles.statValue}>{pendingTasks.length}</Text>
          <Text style={styles.statLabel}>
            {language === 'fr' ? 'En attente' : 'Pending'}
          </Text>
        </Card>
        <Card style={styles.statItem}>
          <Text style={styles.statValue}>{completedTasks.length}</Text>
          <Text style={styles.statLabel}>
            {language === 'fr' ? 'Complétées' : 'Completed'}
          </Text>
        </Card>
      </View>

      {/* Task List */}
      <Text style={styles.sectionTitle}>
        {language === 'fr' ? 'Mes tâches d\'immigration' : 'My immigration tasks'}
      </Text>

      {pendingTasks.length === 0 && completedTasks.length === 0 ? (
        <Card>
          <Text style={styles.emptyText}>
            {language === 'fr'
              ? 'Aucune tâche pour le moment'
              : 'No tasks at the moment'}
          </Text>
        </Card>
      ) : (
        [...pendingTasks, ...completedTasks].map((task) => (
          <TouchableOpacity
            key={task.id}
            style={[
              styles.taskItem,
              task.status === 'COMPLETED' && styles.taskCompleted,
            ]}
            onPress={() => handleTaskToggle(task.id, task.status)}
          >
            <View
              style={[
                styles.checkbox,
                task.status === 'COMPLETED' && styles.checkboxChecked,
              ]}
            >
              {task.status === 'COMPLETED' && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <View style={styles.taskContent}>
              <Text
                style={[
                  styles.taskTitle,
                  task.status === 'COMPLETED' && styles.taskTitleCompleted,
                ]}
              >
                {language === 'fr' ? task.title : task.titleEn || task.title}
              </Text>
              {task.isRequired && (
                <Badge
                  label={language === 'fr' ? 'Requis' : 'Required'}
                  variant="warning"
                  size="sm"
                />
              )}
            </View>
            {task.priority === 'HIGH' && (
              <Badge label="!" variant="danger" size="sm" />
            )}
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );

  const renderCRS = () => {
    if (!isTemporaryResident) {
      return (
        <View style={styles.content}>
          <Card>
            <Text style={styles.emptyText}>
              {language === 'fr'
                ? 'Le simulateur CRS est disponible pour les résidents temporaires.'
                : 'The CRS simulator is available for temporary residents.'}
            </Text>
          </Card>
        </View>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Card title={t('crs.title', language)}>
          {/* Age */}
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>
              {t('crs.age', language)}: {age}
            </Text>
          </View>

          {/* Education */}
          <View style={styles.pickerContainer}>
            <Text style={styles.sliderLabel}>{t('crs.education', language)}</Text>
            <View style={styles.optionsRow}>
              {['phd', 'masters', 'bachelors', 'diploma'].map((edu) => (
                <TouchableOpacity
                  key={edu}
                  style={[
                    styles.optionChip,
                    education === edu && styles.optionChipSelected,
                  ]}
                  onPress={() => setEducation(edu)}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      education === edu && styles.optionChipTextSelected,
                    ]}
                  >
                    {edu === 'phd' ? 'PhD' : edu === 'masters' ? 'MSc' : edu === 'bachelors' ? 'Bac' : 'Dipl.'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* CLB Level */}
          <View style={styles.pickerContainer}>
            <Text style={styles.sliderLabel}>{t('crs.language', language)}: CLB {clbLevel}</Text>
            <View style={styles.optionsRow}>
              {[7, 8, 9, 10].map((clb) => (
                <TouchableOpacity
                  key={clb}
                  style={[
                    styles.optionChip,
                    clbLevel === clb && styles.optionChipSelected,
                  ]}
                  onPress={() => setClbLevel(clb)}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      clbLevel === clb && styles.optionChipTextSelected,
                    ]}
                  >
                    {clb}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button
            title={t('crs.calculate', language)}
            onPress={calculateCRS}
            fullWidth
            style={styles.calculateButton}
          />

          {crsScore !== null && (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>{t('crs.yourScore', language)}</Text>
              <Text
                style={[
                  styles.scoreValue,
                  crsScore >= 450
                    ? styles.scoreGood
                    : crsScore >= 350
                    ? styles.scoreMedium
                    : styles.scoreLow,
                ]}
              >
                {crsScore}
              </Text>
              <Text style={styles.scoreUnit}>{t('crs.points', language)}</Text>
              <Badge
                label={
                  crsScore >= 450
                    ? language === 'fr'
                      ? 'Score compétitif'
                      : 'Competitive score'
                    : language === 'fr'
                    ? 'Score moyen'
                    : 'Average score'
                }
                variant={crsScore >= 450 ? 'success' : 'warning'}
              />
            </View>
          )}
        </Card>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('modules.immigration.title', language)} />

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tasks' && styles.tabActive]}
          onPress={() => setActiveTab('tasks')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'tasks' && styles.tabTextActive,
            ]}
          >
            {t('modules.immigration.tasks', language)}
          </Text>
        </TouchableOpacity>
        {isTemporaryResident && (
          <TouchableOpacity
            style={[styles.tab, activeTab === 'crs' && styles.tabActive]}
            onPress={() => setActiveTab('crs')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'crs' && styles.tabTextActive,
              ]}
            >
              {t('modules.immigration.crs', language)}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {activeTab === 'tasks' && renderTasks()}
      {activeTab === 'crs' && renderCRS()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginRight: spacing.md,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  statValue: {
    ...typography.h1,
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  taskCompleted: {
    opacity: 0.6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  taskTitle: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: spacing.xl,
  },
  sliderContainer: {
    marginBottom: spacing.md,
  },
  sliderLabel: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  pickerContainer: {
    marginBottom: spacing.md,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background,
  },
  optionChipSelected: {
    backgroundColor: colors.primary,
  },
  optionChipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  optionChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  calculateButton: {
    marginTop: spacing.md,
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
  },
  scoreLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  scoreValue: {
    ...typography.h1,
    fontSize: 64,
  },
  scoreGood: {
    color: colors.success,
  },
  scoreMedium: {
    color: colors.warning,
  },
  scoreLow: {
    color: colors.danger,
  },
  scoreUnit: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
});
