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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D1FAE5',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  statSubLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  weeklyChart: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayBar: {
    width: 20,
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  dayBarFill: {
    width: '100%',
    borderRadius: 10,
    minHeight: 4,
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
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  skillPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  skillProgressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  skillProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  skillDetails: {
    alignItems: 'flex-start',
  },
  skillDetailText: {
    fontSize: 12,
    color: '#6B7280',
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  achievementDate: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  goalDescription: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  goalSubDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  goalProgress: {
    gap: 8,
  },
  goalProgressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  goalProgressText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  bottomPadding: {
    height: 20,
  },
});