import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Profile {
  name: string;
  level: number;
  title: string;
  titleEn: string;
  totalStudyTime: number;
  streak: number;
  badges: number;
  completedLessons: number;
}

interface Settings {
  notifications: boolean;
  dailyReminder: boolean;
  audioFeedback: boolean;
}

export function useProfile() {
  const [profile] = useState<Profile>({
    name: '田中 太郎',
    level: 3,
    title: '英語学習者',
    titleEn: 'English Learner',
    totalStudyTime: 42,
    streak: 7,
    badges: 8,
    completedLessons: 23,
  });

  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    dailyReminder: true,
    audioFeedback: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem('settings');
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(updated));
    } catch (error) {
      console.log('Error saving settings:', error);
    }
  };

  return {
    profile,
    settings,
    updateSettings,
  };
}