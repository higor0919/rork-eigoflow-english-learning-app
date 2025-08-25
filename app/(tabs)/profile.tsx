import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Bell, Globe, BookOpen, Award, HelpCircle, LogOut } from 'lucide-react-native';
import { useProfile } from '@/hooks/useProfile';

export default function ProfileScreen() {
  const { profile, settings, updateSettings } = useProfile();

  const menuItems = [
    {
      icon: Settings,
      title: '学習設定',
      subtitle: 'Learning Settings',
      onPress: () => {},
    },
    {
      icon: Bell,
      title: '通知設定',
      subtitle: 'Notifications',
      onPress: () => {},
      hasSwitch: true,
      switchValue: settings.notifications,
      onSwitchChange: (value: boolean) => updateSettings({ notifications: value }),
    },
    {
      icon: Globe,
      title: '言語設定',
      subtitle: 'Language Settings',
      onPress: () => {},
    },
    {
      icon: BookOpen,
      title: '学習履歴',
      subtitle: 'Learning History',
      onPress: () => {},
    },
    {
      icon: Award,
      title: '成果・バッジ',
      subtitle: 'Achievements & Badges',
      onPress: () => {},
    },
    {
      icon: HelpCircle,
      title: 'ヘルプ・サポート',
      subtitle: 'Help & Support',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <User size={40} color="#FFFFFF" />
          </View>
          
          <Text style={styles.userName}>{profile.name}</Text>
          <Text style={styles.userLevel}>レベル {profile.level} • {profile.title}</Text>
          <Text style={styles.userSubtitle}>Level {profile.level} • {profile.titleEn}</Text>
        </View>
      </LinearGradient>

      {/* Stats Overview */}
      <View style={styles.statsSection}>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.totalStudyTime}</Text>
            <Text style={styles.statLabel}>総学習時間</Text>
            <Text style={styles.statSubLabel}>Total Hours</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.streak}</Text>
            <Text style={styles.statLabel}>連続学習</Text>
            <Text style={styles.statSubLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.badges}</Text>
            <Text style={styles.statLabel}>獲得バッジ</Text>
            <Text style={styles.statSubLabel}>Badges</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.completedLessons}</Text>
            <Text style={styles.statLabel}>完了レッスン</Text>
            <Text style={styles.statSubLabel}>Lessons</Text>
          </View>
        </View>
      </View>

      {/* Current Goals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>現在の目標 Current Goals</Text>
        
        <View style={styles.goalCard}>
          <Text style={styles.goalTitle}>今月の学習目標</Text>
          <Text style={styles.goalSubtitle}>Monthly Learning Goal</Text>
          
          <View style={styles.goalProgress}>
            <View style={styles.goalProgressBar}>
              <View style={[styles.goalProgressFill, { width: '68%' }]} />
            </View>
            <Text style={styles.goalProgressText}>68% 完了 (20.4/30 時間)</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>設定・その他 Settings & More</Text>
        
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuItemIcon}>
                  <IconComponent size={20} color="#6B7280" />
                </View>
                
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              
              {item.hasSwitch ? (
                <Switch
                  value={item.switchValue}
                  onValueChange={item.onSwitchChange}
                  trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                  thumbColor={item.switchValue ? '#FFFFFF' : '#FFFFFF'}
                />
              ) : (
                <Text style={styles.menuItemArrow}>›</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Learning Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>学習設定 Learning Preferences</Text>
        
        <View style={styles.preferenceCard}>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>学習リマインダー</Text>
            <Text style={styles.preferenceSubLabel}>Daily Study Reminder</Text>
            <Switch
              value={settings.dailyReminder}
              onValueChange={(value) => updateSettings({ dailyReminder: value })}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={settings.dailyReminder ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>音声フィードバック</Text>
            <Text style={styles.preferenceSubLabel}>Audio Feedback</Text>
            <Switch
              value={settings.audioFeedback}
              onValueChange={(value) => updateSettings({ audioFeedback: value })}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={settings.audioFeedback ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>
      </View>

      {/* Sign Out */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.signOutButton}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.signOutText}>サインアウト Sign Out</Text>
        </TouchableOpacity>
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
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    fontFamily: 'Inter',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  userLevel: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
    fontFamily: 'Inter',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  userSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Inter',
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statsSection: {
    margin: 20,
    marginTop: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
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
  statValue: {
    fontSize: 22,
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
  goalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  goalSubtitle: {
    fontSize: 15,
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
    backgroundColor: '#8B5CF6',
    borderRadius: 6,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  goalProgressText: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  preferenceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  preferenceLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    fontFamily: 'Inter',
  },
  preferenceSubLabel: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
    marginTop: 4,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  signOutText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#EF4444',
    fontFamily: 'Inter',
  },
  bottomPadding: {
    height: 20,
  },
});