import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mic, Play, Square, RotateCcw, Volume2, CheckCircle, Eye, Headphones } from 'lucide-react-native';
import { usePronunciation } from '@/hooks/usePronunciation';

export default function PronunciationScreen() {
  const [selectedCategory, setSelectedCategory] = useState('visual-phonetics');
  
  const {
    isRecording,
    isPlaying,
    currentWord,
    feedback,
    score,
    startRecording,
    stopRecording,
    playExample,
    playUserRecording,
    resetRecording
  } = usePronunciation();

  const categories = [
    { id: 'visual-phonetics', title: 'ビジュアル音韻', subtitle: 'Visual Phonetics' },
    { id: 'minimal-pairs', title: '最小対語', subtitle: 'Minimal Pair Drills' },
    { id: 'shadowing', title: 'シャドーイング', subtitle: 'Shadowing Practice' },
    { id: 'difficult-sounds', title: '難しい音', subtitle: 'Difficult Sounds' },
  ];

  const difficultSounds = [
    { word: 'right', phonetic: '/raɪt/', difficulty: 'R vs L', japanese: 'ライト' },
    { word: 'light', phonetic: '/laɪt/', difficulty: 'R vs L', japanese: 'ライト' },
    { word: 'think', phonetic: '/θɪŋk/', difficulty: 'TH sound', japanese: 'シンク' },
    { word: 'sink', phonetic: '/sɪŋk/', difficulty: 'TH vs S', japanese: 'シンク' },
    { word: 'work', phonetic: '/wɜːrk/', difficulty: 'ER sound', japanese: 'ワーク' },
    { word: 'walk', phonetic: '/wɔːk/', difficulty: 'OR sound', japanese: 'ウォーク' },
  ];

  const minimalPairs = [
    { pair: ['ship', 'sheep'], phonetic: ['/ʃɪp/', '/ʃiːp/'], focus: 'Short vs Long I' },
    { pair: ['bit', 'beat'], phonetic: ['/bɪt/', '/biːt/'], focus: 'Short vs Long I' },
    { pair: ['cut', 'cat'], phonetic: ['/kʌt/', '/kæt/'], focus: 'U vs A sound' },
    { pair: ['right', 'light'], phonetic: ['/raɪt/', '/laɪt/'], focus: 'R vs L sound' },
    { pair: ['think', 'sink'], phonetic: ['/θɪŋk/', '/sɪŋk/'], focus: 'TH vs S sound' },
  ];

  const visualPhonetics = [
    {
      sound: '/r/',
      title: 'R Sound',
      titleJp: 'R音',
      description: '舌先を口の中央に浮かせ、どこにも触れずに音を出します',
      tips: ['舌先を丸める', '唇を少し突き出す', '喉の奥から音を出す'],
      words: ['right', 'red', 'run', 'very']
    },
    {
      sound: '/l/',
      title: 'L Sound',
      titleJp: 'L音',
      description: '舌先を上の歯茎にしっかりと付けて音を出します',
      tips: ['舌先を歯茎に付ける', '舌の両側から空気を流す', '明確に発音する'],
      words: ['light', 'love', 'play', 'hello']
    },
    {
      sound: '/θ/',
      title: 'TH Sound (Voiceless)',
      titleJp: 'TH音（無声音）',
      description: '舌先を軽く歯に挟んで息を出します',
      tips: ['舌を歯に軽く挟む', '息だけを出す（声帯を使わない）', '「ス」ではなく「θ」'],
      words: ['think', 'thank', 'three', 'mouth']
    }
  ];

  const shadowingExercises = [
    {
      title: 'Business Conversation',
      titleJp: 'ビジネス会話',
      text: 'Good morning. I\'d like to schedule a meeting for next week.',
      difficulty: 'Intermediate',
      duration: '0:05'
    },
    {
      title: 'Daily Conversation',
      titleJp: '日常会話',
      text: 'How was your weekend? Did you do anything interesting?',
      difficulty: 'Beginner',
      duration: '0:04'
    },
    {
      title: 'Phone Call',
      titleJp: '電話での会話',
      text: 'Hello, this is John speaking. May I ask who\'s calling?',
      difficulty: 'Intermediate',
      duration: '0:04'
    }
  ];

  const handleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      if (Platform.OS === 'web') {
        Alert.alert('音声認識', 'ウェブ版では音声録音は利用できません。');
        return;
      }
      await startRecording();
    }
  };

  const renderDifficultSounds = () => (
    <View style={styles.wordsContainer}>
      {difficultSounds.map((item, index) => (
        <View key={index} style={styles.wordCard}>
          <View style={styles.wordHeader}>
            <View style={styles.wordInfo}>
              <Text style={styles.wordText}>{item.word}</Text>
              <Text style={styles.phoneticText}>{item.phonetic}</Text>
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
            
            <TouchableOpacity
              style={styles.playExampleButton}
              onPress={() => playExample(item.word)}
            >
              <Volume2 size={20} color="#3B82F6" />
              <Text style={styles.playExampleText}>例を聞く</Text>
            </TouchableOpacity>
          </View>

          {currentWord === item.word && (
            <View style={styles.practiceSection}>
              <View style={styles.recordingControls}>
                <TouchableOpacity
                  style={[styles.recordButton, isRecording && styles.recordButtonActive]}
                  onPress={handleRecording}
                >
                  {isRecording ? (
                    <Square size={24} color="#FFFFFF" />
                  ) : (
                    <Mic size={24} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
                
                <Text style={styles.recordingStatus}>
                  {isRecording ? '録音中...' : 'タップして録音'}
                </Text>
                
                {feedback && (
                  <TouchableOpacity
                    style={styles.playbackButton}
                    onPress={playUserRecording}
                  >
                    <Play size={16} color="#6B7280" />
                    <Text style={styles.playbackText}>再生</Text>
                  </TouchableOpacity>
                )}
              </View>

              {feedback && (
                <View style={styles.feedbackContainer}>
                  <View style={styles.scoreContainer}>
                    <CheckCircle size={20} color={score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444'} />
                    <Text style={[styles.scoreText, { color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444' }]}>
                      スコア: {score}%
                    </Text>
                  </View>
                  
                  <Text style={styles.feedbackText}>{feedback}</Text>
                  
                  <TouchableOpacity
                    style={styles.retryButton}
                    onPress={resetRecording}
                  >
                    <RotateCcw size={16} color="#3B82F6" />
                    <Text style={styles.retryText}>もう一度</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderMinimalPairs = () => (
    <View style={styles.pairsContainer}>
      {minimalPairs.map((item, index) => (
        <View key={index} style={styles.pairCard}>
          <Text style={styles.pairTitle}>{item.focus}</Text>
          
          <View style={styles.pairWords}>
            {item.pair.map((word, wordIndex) => (
              <View key={wordIndex} style={styles.pairWordContainer}>
                <Text style={styles.pairWord}>{word}</Text>
                <Text style={styles.pairPhonetic}>{item.phonetic[wordIndex]}</Text>
                
                <TouchableOpacity
                  style={styles.pairPlayButton}
                  onPress={() => playExample(word)}
                >
                  <Volume2 size={16} color="#007AFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  const renderVisualPhonetics = () => (
    <View style={styles.contentContainer}>
      {visualPhonetics.map((item, index) => (
        <View key={index} style={styles.phoneticCard}>
          <View style={styles.phoneticHeader}>
            <View style={styles.soundSymbol}>
              <Text style={styles.soundText}>{item.sound}</Text>
            </View>
            <View style={styles.phoneticInfo}>
              <Text style={styles.phoneticTitle}>{item.titleJp}</Text>
              <Text style={styles.phoneticSubtitle}>{item.title}</Text>
            </View>
            <TouchableOpacity style={styles.visualButton}>
              <Eye size={20} color="#007AFF" />
              <Text style={styles.visualButtonText}>口の形を見る</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.phoneticDescription}>{item.description}</Text>
          
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>発音のコツ Tips:</Text>
            {item.tips.map((tip, tipIndex) => (
              <Text key={tipIndex} style={styles.tipText}>• {tip}</Text>
            ))}
          </View>
          
          <View style={styles.practiceWords}>
            <Text style={styles.practiceWordsTitle}>練習単語 Practice Words:</Text>
            <View style={styles.wordsGrid}>
              {item.words.map((word, wordIndex) => (
                <TouchableOpacity 
                  key={wordIndex} 
                  style={styles.practiceWordButton}
                  onPress={() => playExample(word)}
                >
                  <Text style={styles.practiceWordText}>{word}</Text>
                  <Volume2 size={14} color="#007AFF" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderShadowing = () => (
    <View style={styles.contentContainer}>
      {shadowingExercises.map((item, index) => (
        <View key={index} style={styles.shadowingCard}>
          <View style={styles.shadowingHeader}>
            <View style={styles.shadowingInfo}>
              <Text style={styles.shadowingTitle}>{item.titleJp}</Text>
              <Text style={styles.shadowingSubtitle}>{item.title}</Text>
              <View style={styles.shadowingMeta}>
                <Text style={styles.shadowingMetaText}>{item.difficulty}</Text>
                <Text style={styles.shadowingMetaText}>•</Text>
                <Text style={styles.shadowingMetaText}>{item.duration}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.shadowingPlayButton}>
              <Play size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.shadowingTextContainer}>
            <Text style={styles.shadowingText}>{item.text}</Text>
          </View>
          
          <View style={styles.shadowingControls}>
            <TouchableOpacity style={styles.shadowingControlButton}>
              <Headphones size={16} color="#007AFF" />
              <Text style={styles.shadowingControlText}>聞く Listen</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shadowingControlButton}>
              <Mic size={16} color="#FF3B30" />
              <Text style={styles.shadowingControlText}>録音 Record</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shadowingControlButton}>
              <Volume2 size={16} color="#34C759" />
              <Text style={styles.shadowingControlText}>比較 Compare</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#34C759', '#30D158']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>発音トレーナー</Text>
          <Text style={styles.headerSubtitle}>Advanced Pronunciation Trainer</Text>
        </View>
      </LinearGradient>

      {/* Category Selection */}
      <View style={styles.categorySection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.categoryButtonTextActive
              ]}>
                {category.title}
              </Text>
              <Text style={[
                styles.categoryButtonSubtext,
                selectedCategory === category.id && styles.categoryButtonSubtextActive
              ]}>
                {category.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedCategory === 'visual-phonetics' && renderVisualPhonetics()}
        {selectedCategory === 'minimal-pairs' && renderMinimalPairs()}
        {selectedCategory === 'shadowing' && renderShadowing()}
        {selectedCategory === 'difficult-sounds' && renderDifficultSounds()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
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
  },
  headerSubtitle: {
    fontSize: 17,
    color: '#D1FAE5',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  categorySection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  categoryScroll: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#34C759',
  },
  categoryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    fontFamily: 'Inter',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  categoryButtonSubtext: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  categoryButtonSubtextActive: {
    color: '#D1FAE5',
  },
  content: {
    flex: 1,
  },
  wordsContainer: {
    padding: 24,
  },
  wordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  wordInfo: {
    flex: 1,
  },
  wordText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
    fontFamily: 'Inter',
  },
  phoneticText: {
    fontSize: 17,
    color: '#6B7280',
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  difficultyText: {
    fontSize: 13,
    color: '#34C759',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  playExampleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  playExampleText: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  practiceSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  recordingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  recordButton: {
    backgroundColor: '#34C759',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonActive: {
    backgroundColor: '#30D158',
  },
  recordingStatus: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  playbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  playbackText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  feedbackContainer: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF4FF',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  retryText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  pairsContainer: {
    padding: 20,
  },
  pairCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pairTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  pairWords: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pairWordContainer: {
    alignItems: 'center',
    gap: 8,
  },
  pairWord: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  pairPhonetic: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'monospace',
  },
  pairPlayButton: {
    backgroundColor: '#EBF4FF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  comingSoonSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 16,
  },
  comingSoonDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Visual Phonetics Styles
  contentContainer: {
    padding: 24,
  },
  phoneticCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  phoneticHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  soundSymbol: {
    backgroundColor: '#34C759',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'monospace',
  },
  phoneticInfo: {
    flex: 1,
  },
  phoneticTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  phoneticSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  visualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  visualButtonText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  phoneticDescription: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  tipsSection: {
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 10,
    fontFamily: 'Inter',
  },
  tipText: {
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 6,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  practiceWords: {
    marginBottom: 0,
  },
  practiceWordsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 10,
    fontFamily: 'Inter',
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  practiceWordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 4,
  },
  practiceWordText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  // Shadowing Styles
  shadowingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  shadowingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  shadowingInfo: {
    flex: 1,
  },
  shadowingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  shadowingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  shadowingMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  shadowingMetaText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  shadowingPlayButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowingTextContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  shadowingText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  shadowingControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shadowingControlButton: {
    alignItems: 'center',
    gap: 4,
  },
  shadowingControlText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
});