import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, RotateCcw, Volume2, Headphones } from 'lucide-react-native';
import { Stack } from 'expo-router';

export default function ListeningScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const audioContent = [
    {
      id: 'news1',
      title: 'Daily News Summary',
      titleJp: 'デイリーニュース要約',
      duration: '3:45',
      level: 'Intermediate',
      accent: 'American',
    },
    {
      id: 'conversation1',
      title: 'Restaurant Conversation',
      titleJp: 'レストランでの会話',
      duration: '2:30',
      level: 'Beginner',
      accent: 'British',
    },
    {
      id: 'podcast1',
      title: 'Tech Talk Podcast',
      titleJp: 'テクノロジー・ポッドキャスト',
      duration: '5:20',
      level: 'Advanced',
      accent: 'Australian',
    },
  ];

  const transcript = `
Welcome to today's news summary. In our top story, scientists have made a breakthrough in renewable energy technology. The new solar panels are 40% more efficient than previous models and could revolutionize how we generate clean energy.

In other news, the weather forecast shows sunny skies for the weekend, making it perfect for outdoor activities. Temperatures will reach a comfortable 25 degrees Celsius.

That's all for today's summary. Thank you for listening.
  `.trim();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'リスニング練習', headerShown: true }} />
      
      {/* Header */}
      <LinearGradient
        colors={['#34C759', '#30D158']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Headphones size={32} color="#FFFFFF" />
          <Text style={styles.headerTitle}>リスニング練習</Text>
          <Text style={styles.headerSubtitle}>Dynamic Listening Lab</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Audio Content Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>音声コンテンツ Audio Content</Text>
          
          {audioContent.map((content) => (
            <TouchableOpacity
              key={content.id}
              style={[
                styles.contentCard,
                selectedContent === content.id && styles.contentCardSelected
              ]}
              onPress={() => setSelectedContent(content.id)}
            >
              <View style={styles.contentInfo}>
                <Text style={styles.contentTitle}>{content.titleJp}</Text>
                <Text style={styles.contentSubtitle}>{content.title}</Text>
                
                <View style={styles.contentMeta}>
                  <Text style={styles.contentMetaText}>{content.duration}</Text>
                  <Text style={styles.contentMetaText}>•</Text>
                  <Text style={styles.contentMetaText}>{content.level}</Text>
                  <Text style={styles.contentMetaText}>•</Text>
                  <Text style={styles.contentMetaText}>{content.accent}</Text>
                </View>
              </View>
              
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying && selectedContent === content.id ? (
                  <Pause size={20} color="#FFFFFF" />
                ) : (
                  <Play size={20} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Audio Controls */}
        {selectedContent && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>再生コントロール Playback Controls</Text>
            
            <View style={styles.controlsCard}>
              <View style={styles.speedControl}>
                <Text style={styles.speedLabel}>再生速度 Speed: {playbackSpeed.toFixed(1)}x</Text>
                <View style={styles.speedSlider}>
                  <View style={styles.sliderTrack}>
                    <View 
                      style={[
                        styles.sliderFill, 
                        { width: `${((playbackSpeed - 0.5) / 1.5) * 100}%` }
                      ]} 
                    />
                    <TouchableOpacity 
                      style={[
                        styles.sliderThumb,
                        { left: `${((playbackSpeed - 0.5) / 1.5) * 100}%` }
                      ]}
                    />
                  </View>
                </View>
              </View>
              
              <View style={styles.controlButtons}>
                <TouchableOpacity style={styles.controlButton}>
                  <RotateCcw size={20} color="#6B7280" />
                  <Text style={styles.controlButtonText}>10秒戻る</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.controlButton}>
                  <Volume2 size={20} color="#6B7280" />
                  <Text style={styles.controlButtonText}>音量</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Interactive Transcript */}
        {selectedContent && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>インタラクティブ・スクリプト Interactive Transcript</Text>
            
            <View style={styles.transcriptCard}>
              <Text style={styles.transcriptText}>
                {transcript.split(' ').map((word, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.transcriptWord,
                      index % 10 === 0 && styles.transcriptWordHighlight // Mock highlighting
                    ]}
                    onPress={() => console.log('Word tapped:', word)}
                  >
                    {word}{' '}
                  </Text>
                ))}
              </Text>
            </View>
          </View>
        )}

        {/* Comprehension Questions */}
        {selectedContent && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>理解度チェック Comprehension Check</Text>
            
            <View style={styles.questionCard}>
              <Text style={styles.questionTitle}>質問 1: What is the main topic of the news?</Text>
              
              <TouchableOpacity style={styles.answerOption}>
                <Text style={styles.answerText}>A) Weather forecast</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.answerOption}>
                <Text style={styles.answerText}>B) Renewable energy breakthrough</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.answerOption}>
                <Text style={styles.answerText}>C) Technology news</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.bottomPadding} />
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#D1FAE5',
  },
  content: {
    flex: 1,
  },
  section: {
    margin: 20,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  contentCard: {
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
  contentCardSelected: {
    borderWidth: 2,
    borderColor: '#34C759',
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  contentSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  contentMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  contentMetaText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  playButton: {
    backgroundColor: '#34C759',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  speedControl: {
    marginBottom: 20,
  },
  speedLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  speedSlider: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    backgroundColor: '#34C759',
    borderRadius: 8,
    marginLeft: -8,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    alignItems: 'center',
    gap: 4,
  },
  controlButtonText: {
    fontSize: 12,
    color: '#6B7280',
  },
  transcriptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  transcriptText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  transcriptWord: {
    color: '#374151',
  },
  transcriptWordHighlight: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  answerOption: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  answerText: {
    fontSize: 14,
    color: '#374151',
  },
  bottomPadding: {
    height: 20,
  },
});