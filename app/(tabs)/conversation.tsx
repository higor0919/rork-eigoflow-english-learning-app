import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Mic, MicOff, Volume2, RotateCcw, BookOpen, AlertCircle, MessageSquare, Zap, Globe } from 'lucide-react-native';
import { useConversation } from '@/hooks/useConversation';

export default function ConversationScreen() {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    startRecording, 
    stopRecording, 
    playAudio,
    resetConversation 
  } = useConversation();

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    await sendMessage(inputText);
    setInputText('');
    
    // Scroll to bottom after sending
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleMicPress = async () => {
    if (isRecording) {
      const text = await stopRecording();
      if (text) {
        setInputText(text);
      }
      setIsRecording(false);
    } else {
      if (Platform.OS === 'web') {
        Alert.alert('音声認識', 'ウェブ版では音声認識は利用できません。テキスト入力をご利用ください。');
        return;
      }
      await startRecording();
      setIsRecording(true);
    }
  };

  const scenarios = [
    { id: 'casual', title: 'カジュアル会話', subtitle: 'Casual Conversation' },
    { id: 'business', title: 'ビジネス会話', subtitle: 'Business Meeting' },
    { id: 'travel', title: '旅行会話', subtitle: 'Travel Situations' },
    { id: 'restaurant', title: 'レストラン', subtitle: 'Restaurant Ordering' },
    { id: 'job-interview-it', title: 'IT業界面接', subtitle: 'Job Interview Practice (IT Sector)' },
    { id: 'japanese-restaurant', title: '和食レストラン', subtitle: 'Ordering at a Traditional Japanese Restaurant (in English)' },
    { id: 'cultural-discussion', title: '文化紹介', subtitle: 'Discussing Japanese Culture with a Foreigner' },
    { id: 'train-station', title: '駅での案内', subtitle: 'Navigating a Train Station in English' },
    { id: 'networking', title: 'ビジネス交流', subtitle: 'Making Small Talk at a Business Networking Event' },
  ];

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {/* Header */}
      <LinearGradient
        colors={['#007AFF', '#5AC8FA']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>AI会話練習</Text>
          <Text style={styles.headerSubtitle}>AI-Powered Conversation Practice</Text>
          
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetConversation}
          >
            <RotateCcw size={16} color="#FFFFFF" />
            <Text style={styles.resetButtonText}>新しい会話</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Scenario Selection */}
      {messages.length === 0 && (
        <View style={styles.scenarioSection}>
          <Text style={styles.scenarioTitle}>会話シナリオを選択 Choose a Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scenarioScroll}>
            {scenarios.map((scenario) => (
              <TouchableOpacity
                key={scenario.id}
                style={styles.scenarioCard}
                onPress={() => sendMessage(`Let's practice ${scenario.subtitle.toLowerCase()}`)}
              >
                <Text style={styles.scenarioCardTitle}>{scenario.title}</Text>
                <Text style={styles.scenarioCardSubtitle}>{scenario.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.length === 0 ? (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>AIアシスタントと会話を始めましょう！</Text>
            <Text style={styles.welcomeSubtitle}>Start a conversation with your AI assistant!</Text>
            <Text style={styles.welcomeDescription}>
              上のシナリオを選ぶか、自由に話しかけてください。AIがあなたの英語レベルに合わせて会話します。
            </Text>
          </View>
        ) : (
          messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                message.role === 'user' ? styles.userMessage : styles.aiMessage
              ]}
            >
              <View style={styles.messageContent}>
                <Text style={[
                  styles.messageText,
                  message.role === 'user' ? styles.userMessageText : styles.aiMessageText
                ]}>
                  {message.content}
                </Text>
                
                {message.role === 'assistant' && (
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => playAudio(message.content)}
                  >
                    <Volume2 size={16} color="#6B7280" />
                  </TouchableOpacity>
                )}
              </View>
              
              {message.feedback && Array.isArray(message.feedback) && message.feedback.length > 0 && (
                <View style={styles.feedbackContainer}>
                  <Text style={styles.feedbackMainTitle}>📝 詳細フィードバック Detailed Feedback</Text>
                  {message.feedback.map((item, feedbackIndex) => (
                    <View key={feedbackIndex} style={[
                      styles.feedbackItem,
                      styles[`feedback${item.type.charAt(0).toUpperCase() + item.type.slice(1)}` as keyof typeof styles]
                    ]}>
                      <View style={styles.feedbackHeader}>
                        {item.type === 'grammar' && <AlertCircle size={16} color="#DC2626" />}
                        {item.type === 'vocabulary' && <BookOpen size={16} color="#7C3AED" />}
                        {item.type === 'pronunciation' && <Volume2 size={16} color="#EA580C" />}
                        {item.type === 'fluency' && <Zap size={16} color="#059669" />}
                        {item.type === 'cultural' && <Globe size={16} color="#0284C7" />}
                        <Text style={[
                          styles.feedbackItemTitle,
                          styles[`feedback${item.type.charAt(0).toUpperCase() + item.type.slice(1)}Text` as keyof typeof styles]
                        ]}>
                          {item.title}
                        </Text>
                      </View>
                      
                      <Text style={styles.feedbackContent}>{item.content}</Text>
                      
                      {item.suggestion && (
                        <View style={styles.suggestionContainer}>
                          <Text style={styles.suggestionLabel}>💡 提案 Suggestion:</Text>
                          <Text style={styles.suggestionText}>{item.suggestion}</Text>
                        </View>
                      )}
                      
                      {item.lessonLink && (
                        <TouchableOpacity 
                          style={styles.lessonLink}
                          onPress={() => {
                            // Navigate to lesson - for now just show alert
                            Alert.alert('レッスンリンク', `関連レッスン: ${item.lessonLink}`);
                          }}
                        >
                          <BookOpen size={14} color="#007AFF" />
                          <Text style={styles.lessonLinkText}>関連レッスンを見る View Related Lesson</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>
              )}
              
              {message.role === 'assistant' && message.followUpQuestion && (
                <TouchableOpacity 
                  style={styles.followUpContainer}
                  onPress={async () => {
                    // Send the follow-up question to continue the conversation
                    if (message.followUpQuestion) {
                      await sendMessage(message.followUpQuestion);
                      // Scroll to bottom after sending
                      setTimeout(() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                      }, 100);
                    }
                  }}
                >
                  <View style={styles.followUpHeader}>
                    <MessageSquare size={16} color="#007AFF" />
                    <Text style={styles.followUpTitle}>💭 続けて話してみましょう Continue the Conversation</Text>
                  </View>
                  <Text style={styles.followUpQuestion}>{message.followUpQuestion}</Text>
                  <Text style={styles.followUpHint}>タップして続ける Tap to continue</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>AIが考えています...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="メッセージを入力... Type your message..."
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity
            style={[styles.micButton, isRecording && styles.micButtonActive]}
            onPress={handleMicPress}
          >
            {isRecording ? (
              <MicOff size={20} color="#FFFFFF" />
            ) : (
              <Mic size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {isRecording && (
          <Text style={styles.recordingText}>🎤 録音中... Recording...</Text>
        )}
      </View>
    </KeyboardAvoidingView>
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
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#007AFF',
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
    marginBottom: 20,
    fontFamily: 'Inter',
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  scenarioSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  scenarioScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  scenarioCard: {
    backgroundColor: '#F3F4F6',
    padding: 18,
    borderRadius: 20,
    marginRight: 16,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  scenarioCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
    fontFamily: 'Inter',
  },
  scenarioCardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: Platform.OS === 'android' ? 10 : 0,
  },
  messagesContent: {
    padding: 24,
    paddingBottom: 12,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  welcomeSubtitle: {
    fontSize: 17,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  welcomeDescription: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '85%',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  userMessageText: {
    backgroundColor: '#007AFF',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 20,
    borderBottomRightRadius: 6,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  aiMessageText: {
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    padding: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  playButton: {
    marginLeft: 8,
    padding: 4,
  },
  feedbackContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
    maxWidth: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  feedbackMainTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  feedbackItem: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  feedbackGrammar: {
    backgroundColor: '#FEF2F2',
    borderLeftColor: '#DC2626',
  },
  feedbackVocabulary: {
    backgroundColor: '#FAF5FF',
    borderLeftColor: '#7C3AED',
  },
  feedbackPronunciation: {
    backgroundColor: '#FFF7ED',
    borderLeftColor: '#EA580C',
  },
  feedbackFluency: {
    backgroundColor: '#F0FDF4',
    borderLeftColor: '#059669',
  },
  feedbackCultural: {
    backgroundColor: '#EFF6FF',
    borderLeftColor: '#0284C7',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  feedbackItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
    flex: 1,
  },
  feedbackGrammarText: {
    color: '#DC2626',
  },
  feedbackVocabularyText: {
    color: '#7C3AED',
  },
  feedbackPronunciationText: {
    color: '#EA580C',
  },
  feedbackFluencyText: {
    color: '#059669',
  },
  feedbackCulturalText: {
    color: '#0284C7',
  },
  feedbackContent: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
    marginBottom: 8,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  suggestionContainer: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  suggestionText: {
    fontSize: 12,
    color: '#065F46',
    lineHeight: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  lessonLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  lessonLinkText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    maxHeight: 100,
    color: '#1F2937',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  micButton: {
    backgroundColor: '#FF3B30',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonActive: {
    backgroundColor: '#D70015',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  recordingText: {
    fontSize: 12,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 8,
  },
  followUpContainer: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
    maxWidth: '95%',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  followUpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  followUpTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#007AFF',
    fontFamily: 'Inter',
    flex: 1,
  },
  followUpQuestion: {
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  followUpHint: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
});