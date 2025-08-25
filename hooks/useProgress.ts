import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Progress {
  conversation: number;
  pronunciation: number;
  listening: number;
  cultural: number;
  esp: number;
}

interface TodayStats {
  studyTime: number;
  streak: number;
  points: number;
}

interface Achievement {
  title: string;
  description: string;
  date: string;
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({
    conversation: 45,
    pronunciation: 32,
    listening: 28,
    cultural: 15,
    esp: 8,
  });

  const [todayStats, setTodayStats] = useState<TodayStats>({
    studyTime: 12,
    streak: 7,
    points: 1250,
  });

  const [weeklyStats] = useState([15, 22, 18, 25, 12, 8, 0]);
  const [studyStreak] = useState(7);

  const [achievements] = useState<Achievement[]>([
    {
      title: '初回会話完了 First Conversation',
      description: 'AIとの初めての会話を完了しました',
      date: '2日前',
    },
    {
      title: '7日連続学習 Week Streak',
      description: '7日間連続で学習を継続しました',
      date: '今日',
    },
    {
      title: '発音マスター Pronunciation Master',
      description: 'R/L音の区別で90%以上のスコアを達成',
      date: '3日前',
    },
  ]);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem('progress');
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading progress:', error);
    }
  };

  const updateProgress = async (newProgress: Partial<Progress>) => {
    const updated = { ...progress, ...newProgress };
    setProgress(updated);
    
    try {
      await AsyncStorage.setItem('progress', JSON.stringify(updated));
    } catch (error) {
      console.log('Error saving progress:', error);
    }
  };

  return {
    progress,
    todayStats,
    weeklyStats,
    studyStreak,
    achievements,
    updateProgress,
  };
}