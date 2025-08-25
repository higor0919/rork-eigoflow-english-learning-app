import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Mic, MicOff, Volume2, RotateCcw } from 'lucide-react-native';
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
  ];

  return (
    <View style={styles.container}>
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
              
              {message.feedback && (
                <View style={styles.feedbackContainer}>
                  <Text style={styles.feedbackTitle}>フィードバック Feedback:</Text>
                  <Text style={styles.feedbackText}>{message.feedback}</Text>
                </View>
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
    color: '#E0E7FF',
    marginBottom: 20,
    fontFamily: 'Inter',
    fontWeight: '400',
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
    borderRadius: 16,
    marginRight: 16,
    minWidth: 150,
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
    maxWidth: '80%',
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
    borderRadius: 18,
    borderBottomRightRadius: 4,
  },
  aiMessageText: {
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    padding: 12,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  playButton: {
    marginLeft: 8,
    padding: 4,
  },
  feedbackContainer: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    maxWidth: '80%',
  },
  feedbackTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 16,
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
});