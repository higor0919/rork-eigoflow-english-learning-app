import { useState } from 'react';
import { Platform, Alert } from 'react-native';

export function usePronunciation() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);

  const startRecording = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('音声録音', 'ウェブ版では音声録音は利用できません。');
      return;
    }
    
    setIsRecording(true);
    setFeedback(null);
    console.log('Recording pronunciation...');
  };

  const stopRecording = async () => {
    setIsRecording(false);
    
    // Mock analysis for demo
    const mockScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const mockFeedbacks = [
      'R音の発音が改善されました！舌の位置を意識して続けましょう。',
      'L音がとても自然です。この調子で練習を続けてください。',
      'TH音の発音に注意しましょう。舌を歯に軽く触れさせてください。',
      '素晴らしい発音です！ネイティブスピーカーに近い音が出せています。',
    ];
    
    setScore(mockScore);
    setFeedback(mockFeedbacks[Math.floor(Math.random() * mockFeedbacks.length)]);
  };

  const playExample = (word: string) => {
    setCurrentWord(word);
    setIsPlaying(true);
    
    if (Platform.OS === 'web') {
      // Use Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8; // Slower for learning
        speechSynthesis.speak(utterance);
        
        utterance.onend = () => {
          setIsPlaying(false);
        };
      }
    } else {
      console.log('Playing example:', word);
      setTimeout(() => setIsPlaying(false), 1000);
    }
  };

  const playUserRecording = () => {
    console.log('Playing user recording...');
  };

  const resetRecording = () => {
    setFeedback(null);
    setScore(0);
    setCurrentWord(null);
  };

  return {
    isRecording,
    isPlaying,
    currentWord,
    feedback,
    score,
    startRecording,
    stopRecording,
    playExample,
    playUserRecording,
    resetRecording,
  };
}