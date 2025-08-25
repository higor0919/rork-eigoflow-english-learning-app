import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Mic, Headphones, Globe, BookOpen, TrendingUp, Award, Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import { useProgress } from '@/hooks/useProgress';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { progress, todayStats } = useProgress();

  const modules = [
    {
      id: 'conversation',
      title: 'AI会話練習',
      subtitle: 'AI-Powered Conversation',
      icon: MessageCircle,
      color: '#007AFF',
      route: '/conversation',
      progress: progress.conversation
    },
    {
      id: 'pronunciation',
      title: '発音トレーナー',
      subtitle: 'Pronunciation Trainer',
      icon: Mic,
      color: '#FF3B30',
      route: '/pronunciation',
      progress: progress.pronunciation
    },
    {
      id: 'listening',
      title: 'リスニング練習',
      subtitle: 'Listening Lab',
      icon: Headphones,
      color: '#34C759',
      route: '/listening',
      progress: progress.listening
    },
    {
      id: 'cultural',
      title: '文化学習',
      subtitle: 'Cultural Immersion',
      icon: Globe,
      color: '#AF52DE',
      route: '/cultural',
      progress: progress.cultural
    },
    {
      id: 'esp',
      title: '専門英語',
      subtitle: 'English for Specific Purposes',
      icon: BookOpen,
      color: '#FF9500',
      route: '/esp',
      progress: progress.esp
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with greeting */}
      <LinearGradient
        colors={['#1E40AF', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>おはようございます！</Text>
          <Text style={styles.subGreeting}>Let's improve your English today</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Clock size={16} color="#FFFFFF" />
              <Text style={styles.statText}>{todayStats.studyTime}分</Text>
              <Text style={styles.statLabel}>今日の学習時間</Text>
            </View>
            <View style={styles.statItem}>
              <TrendingUp size={16} color="#FFFFFF" />
              <Text style={styles.statText}>{todayStats.streak}日</Text>
              <Text style={styles.statLabel}>連続学習</Text>
            </View>
            <View style={styles.statItem}>
              <Award size={16} color="#FFFFFF" />
              <Text style={styles.statText}>{todayStats.points}</Text>
              <Text style={styles.statLabel}>ポイント</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Daily Goal Progress */}
      <View style={styles.goalSection}>
        <Text style={styles.sectionTitle}>今日の目標 Daily Goal</Text>
        <View style={styles.goalProgress}>
          <View style={styles.goalInfo}>
            <Text style={styles.goalText}>15分の学習目標</Text>
            <Text style={styles.goalSubtext}>{todayStats.studyTime}/15 minutes completed</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${Math.min((todayStats.studyTime / 15) * 100, 100)}%` }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Learning Modules */}
      <View style={styles.modulesSection}>
        <Text style={styles.sectionTitle}>学習モジュール Learning Modules</Text>
        
        {modules.map((module) => {
          const IconComponent = module.icon;
          return (
            <TouchableOpacity
              key={module.id}
              style={styles.moduleCard}
              onPress={() => router.push(module.route as any)}
              activeOpacity={0.7}
            >
              <View style={styles.moduleContent}>
                <View style={[styles.moduleIcon, { backgroundColor: module.color }]}>
                  <IconComponent size={24} color="#FFFFFF" />
                </View>
                
                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleSubtitle}>{module.subtitle}</Text>
                  
                  <View style={styles.moduleProgress}>
                    <View style={styles.moduleProgressBar}>
                      <View 
                        style={[
                          styles.moduleProgressFill, 
                          { 
                            width: `${module.progress}%`,
                            backgroundColor: module.color
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.moduleProgressText}>{module.progress}%</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>クイックアクション Quick Actions</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#007AFF' }]}
            onPress={() => router.push('/conversation')}
          >
            <MessageCircle size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>今すぐ会話</Text>
            <Text style={styles.actionButtonSubtext}>Start Conversation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#FF3B30' }]}
            onPress={() => router.push('/pronunciation')}
          >
            <Mic size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>発音練習</Text>
            <Text style={styles.actionButtonSubtext}>Practice Pronunciation</Text>
          </TouchableOpacity>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#E0E7FF',
    marginTop: 2,
  },
  goalSection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  goalProgress: {
    gap: 12,
  },
  goalInfo: {
    gap: 4,
  },
  goalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  goalSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 4,
  },
  modulesSection: {
    margin: 20,
    marginTop: 0,
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  moduleContent: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  moduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  moduleSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  moduleProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moduleProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  moduleProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  moduleProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    minWidth: 30,
  },
  quickActions: {
    margin: 20,
    marginTop: 0,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionButtonSubtext: {
    fontSize: 12,
    color: '#E0E7FF',
  },
  bottomPadding: {
    height: 20,
  },
});