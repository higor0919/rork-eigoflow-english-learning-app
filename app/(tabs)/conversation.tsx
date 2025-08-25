import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Mic, MicOff, Volume2, RotateCcw, BookOpen, AlertCircle, MessageSquare, Zap, Globe, Coffee, Briefcase, MapPin, UtensilsCrossed, Code, ChefHat, Users, Train, Handshake, Bot, Clock, Info } from 'lucide-react-native';
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
    { id: 'casual', title: 'カジュアル会話', subtitle: 'Casual Conversation', icon: Coffee },
    { id: 'business', title: 'ビジネス会話', subtitle: 'Business Meeting', icon: Briefcase },
    { id: 'travel', title: '旅行会話', subtitle: 'Travel Situations', icon: MapPin },
    { id: 'restaurant', title: 'レストラン', subtitle: 'Restaurant Ordering', icon: UtensilsCrossed },
    { id: 'job-interview-it', title: 'IT業界面接', subtitle: 'Job Interview Practice (IT Sector)', icon: Code },
    { id: 'japanese-restaurant', title: '和食レストラン', subtitle: 'Ordering at a Traditional Japanese Restaurant (in English)', icon: ChefHat },
    { id: 'cultural-discussion', title: '文化紹介', subtitle: 'Discussing Japanese Culture with a Foreigner', icon: Users },
    { id: 'train-station', title: '駅での案内', subtitle: 'Navigating a Train Station in English', icon: Train },
    { id: 'networking', title: 'ビジネス交流', subtitle: 'Making Small Talk at a Business Networking Event', icon: Handshake },
  ];

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerAccent} />
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>AI会話練習</Text>
            <Text style={styles.headerSubtitle}>AI-Powered Conversation Practice</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetConversation}
          >
            <RotateCcw size={18} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scenario Selection */}
      {messages.length === 0 && (
        <View style={styles.scenarioSection}>
          <Text style={styles.scenarioTitle}>会話シナリオを選択 Choose a Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scenarioScroll}>
            {scenarios.map((scenario) => {
              const IconComponent = scenario.icon;
              return (
                <TouchableOpacity
                  key={scenario.id}
                  style={styles.scenarioCard}
                  onPress={() => sendMessage(`Let's practice ${scenario.subtitle.toLowerCase()}`)}
                >
                  <View style={styles.scenarioIconContainer}>
                    <IconComponent size={20} color="#007AFF" />
                  </View>
                  <Text style={styles.scenarioCardTitle}>{scenario.title}</Text>
                  <Text style={styles.scenarioCardSubtitle}>{scenario.subtitle}</Text>
                </TouchableOpacity>
              );
            })}
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
            <View style={styles.welcomeIllustration}>
              <Bot size={48} color="#007AFF" />
              <MessageSquare size={32} color="#5AC8FA" style={styles.welcomeMessageIcon} />
            </View>
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
              {message.role === 'assistant' ? (
                <View style={styles.aiMessageRow}>
                  <View style={styles.aiAvatar}>
                    <Bot size={16} color="#FFFFFF" />
                  </View>
                  
                  <View style={styles.messageContent}>
                    <View style={[
                      styles.messageBubble,
                      styles.aiMessageBubble
                    ]}>
                      <Text style={[
                        styles.messageText,
                        styles.aiMessageText
                      ]}>
                        {message.content}
                      </Text>
                    </View>
                    
                    <View style={styles.messageFooter}>
                      <Text style={styles.messageTimestamp}>
                        {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                      
                      <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => playAudio(message.content)}
                      >
                        <Volume2 size={14} color="#9CA3AF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.messageContent}>
                  <View style={[
                    styles.messageBubble,
                    styles.userMessageBubble
                  ]}>
                    <Text style={[
                      styles.messageText,
                      styles.userMessageText
                    ]}>
                      {message.content}
                    </Text>
                  </View>
                  
                  <View style={styles.messageFooter}>
                    <Text style={styles.messageTimestamp}>
                      {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                </View>
              )}
              
              {message.role === 'assistant' && message.feedback && Array.isArray(message.feedback) && message.feedback.length > 0 && (
                <TouchableOpacity 
                  style={styles.feedbackToggle}
                  onPress={() => {
                    // For now, show alert with feedback - in a real app this would expand/collapse
                    const feedbackText = message.feedback?.map((item: any) => `${item.title}: ${item.content}`).join('\n\n') || '';
                    Alert.alert('📝 詳細フィードバック Detailed Feedback', feedbackText);
                  }}
                >
                  <Info size={16} color="#007AFF" />
                  <Text style={styles.feedbackToggleText}>フィードバックを見る View Feedback</Text>
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
        <View style={styles.inputBar}>
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
              <MicOff size={18} color="#FFFFFF" />
            ) : (
              <Mic size={18} color={isRecording ? '#FFFFFF' : '#FF3B30'} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            <Send size={18} color={inputText.trim() ? '#FFFFFF' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>
        
        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingPulse} />
            <Text style={styles.recordingText}>🎤 録音中... Recording...</Text>
          </View>
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
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#007AFF',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  scenarioIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
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
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginRight: 16,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
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
  welcomeIllustration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  welcomeMessageIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
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
    marginBottom: 20,
    width: '100%',
    flexDirection: 'column',
  },
  userMessage: {
    alignItems: 'flex-end',
    width: '100%',
  },
  aiMessage: {
    alignItems: 'flex-start',
    width: '100%',
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  messageContent: {
    flex: 1,
    maxWidth: '85%',
    minWidth: 0,
  },
  aiMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    width: '100%',
  },
  messageBubble: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexShrink: 1,
  },
  userMessageBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  aiMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  messageTimestamp: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: 'Inter',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Inter',
    fontWeight: '400',
    padding: 14,
    flexWrap: 'wrap',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#1F2937',
  },
  playButton: {
    padding: 4,
  },
  feedbackToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 8,
    marginLeft: 36,
    gap: 6,
  },
  feedbackToggleText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    fontFamily: 'Inter',
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
    backgroundColor: '#F8FAFC',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    color: '#1F2937',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  micButton: {
    backgroundColor: '#F3F4F6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonActive: {
    backgroundColor: '#FF3B30',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  recordingPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  recordingText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '500',
    fontFamily: 'Inter',
  },

});