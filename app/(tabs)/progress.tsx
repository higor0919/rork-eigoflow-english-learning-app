import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Clock, Award, Target, Calendar, BarChart3 } from 'lucide-react-native';
import { useProgress } from '@/hooks/useProgress';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const { progress, weeklyStats, achievements, studyStreak } = useProgress();

  const skillAreas = [
    { name: '会話 Speaking', key: 'conversation', progress: progress.conversation, color: '#3B82F6' },
    { name: '発音 Pronunciation', key: 'pronunciation', progress: progress.pronunciation, color: '#EF4444' },
    { name: 'リスニング Listening', key: 'listening', progress: progress.listening, color: '#10B981' },
    { name: '文化 Cultural', key: 'cultural', progress: progress.cultural, color: '#8B5CF6' },
    { name: '専門英語 ESP', key: 'esp', progress: progress.esp, color: '#F59E0B' },
  ];

  const weekDays = ['月', '火', '水', '木', '金', '土', '日'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#10B981', '#059669']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>学習進捗</Text>
          <Text style={styles.headerSubtitle}>Progress Tracking</Text>
        </View>
      </LinearGradient>

      {/* Overall Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Clock size={24} color="#3B82F6" />
          </View>
          <Text style={styles.statValue}>127</Text>
          <Text style={styles.statLabel}>総学習時間 (分)</Text>
          <Text style={styles.statSubLabel}>Total Study Time</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <TrendingUp size={24} color="#10B981" />
          </View>
          <Text style={styles.statValue}>{studyStreak}</Text>
          <Text style={styles.statLabel}>連続学習日数</Text>
          <Text style={styles.statSubLabel}>Study Streak</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Award size={24} color="#F59E0B" />
          </View>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>獲得バッジ</Text>
          <Text style={styles.statSubLabel}>Badges Earned</Text>
        </View>
      </View>

      {/* Weekly Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>今週の活動 Weekly Activity</Text>
        
        <View style={styles.weeklyChart}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.dayColumn}>
              <View style={styles.dayBar}>
                <View 
                  style={[
                    styles.dayBarFill,
                    { 
                      height: `${Math.min((weeklyStats[index] / 30) * 100, 100)}%`,
                      backgroundColor: weeklyStats[index] > 0 ? '#10B981' : '#E5E7EB'
                    }
                  ]} 
                />
              </View>
              <Text style={styles.dayLabel}>{day}</Text>
              <Text style={styles.dayValue}>{weeklyStats[index]}分</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Skill Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>スキル別進捗 Skill Progress</Text>
        
        {skillAreas.map((skill, index) => (
          <View key={index} style={styles.skillCard}>
            <View style={styles.skillHeader}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <Text style={styles.skillPercentage}>{skill.progress}%</Text>
            </View>
            
            <View style={styles.skillProgressBar}>
              <View 
                style={[
                  styles.skillProgressFill,
                  { 
                    width: `${skill.progress}%`,
                    backgroundColor: skill.color
                  }
                ]} 
              />
            </View>
            
            <View style={styles.skillDetails}>
              <Text style={styles.skillDetailText}>
                レベル {Math.floor(skill.progress / 20) + 1} • 
                次のレベルまで {100 - (skill.progress % 20)}%
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Recent Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>最近の成果 Recent Achievements</Text>
        
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Award size={20} color="#F59E0B" />
            </View>
            
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              <Text style={styles.achievementDate}>{achievement.date}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Goals Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>学習目標 Learning Goals</Text>
        
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Target size={20} color="#3B82F6" />
            <Text style={styles.goalTitle}>今月の目標</Text>
          </View>
          
          <Text style={styles.goalDescription}>
            毎日15分の学習を継続する
          </Text>
          <Text style={styles.goalSubDescription}>
            Study 15 minutes daily
          </Text>
          
          <View style={styles.goalProgress}>
            <View style={styles.goalProgressBar}>
              <View style={[styles.goalProgressFill, { width: '73%' }]} />
            </View>
            <Text style={styles.goalProgressText}>22/30 日達成</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    fontFamily: 'Inter',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Inter',
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
    fontFamily: 'Inter',
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  statSubLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    fontFamily: 'Inter',
  },
  weeklyChart: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayBar: {
    width: 20,
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'flex-end',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dayBarFill: {
    width: '100%',
    borderRadius: 12,
    minHeight: 4,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  dayValue: {
    fontSize: 10,
    color: '#6B7280',
  },
  skillCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: 'Inter',
  },
  skillPercentage: {
    fontSize: 17,
    fontWeight: '700',
    color: '#374151',
    fontFamily: 'Inter',
  },
  skillProgressBar: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  skillProgressFill: {
    height: '100%',
    borderRadius: 6,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  skillDetails: {
    alignItems: 'flex-start',
  },
  skillDetailText: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  achievementDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  achievementDate: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  goalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: 'Inter',
  },
  goalDescription: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 4,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  goalSubDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  goalProgress: {
    gap: 8,
  },
  goalProgressBar: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 6,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  goalProgressText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'right',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  bottomPadding: {
    height: 20,
  },
});