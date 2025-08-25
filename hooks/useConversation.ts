import { useState } from 'react';
import { Platform, Alert } from 'react-native';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  feedback?: string;
}

export function useConversation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const getSystemPrompt = (content: string): string => {
    const basePrompt = 'You are an AI English conversation partner for Japanese learners. Respond naturally and provide helpful feedback on their English usage. Keep responses conversational and encouraging.';
    
    // Detect scenario type from the initial message
    if (content.toLowerCase().includes('job interview') && content.toLowerCase().includes('it')) {
      return `${basePrompt} You are now role-playing as an IT company interviewer. Ask relevant technical and behavioral questions, provide realistic interview scenarios, and give constructive feedback on professional communication skills.`;
    }
    
    if (content.toLowerCase().includes('traditional japanese restaurant')) {
      return `${basePrompt} You are now role-playing as a server at a traditional Japanese restaurant who speaks English with foreign customers. Help the user practice ordering Japanese dishes, asking about ingredients, and understanding restaurant etiquette in English.`;
    }
    
    if (content.toLowerCase().includes('japanese culture')) {
      return `${basePrompt} You are now role-playing as a curious foreigner interested in learning about Japanese culture. Ask thoughtful questions about Japanese traditions, customs, food, and daily life, helping the user practice explaining their culture in English.`;
    }
    
    if (content.toLowerCase().includes('train station')) {
      return `${basePrompt} You are now role-playing as both a train station staff member and confused tourists. Create scenarios where the user needs to give directions, explain train systems, help with ticket purchases, and handle various station-related situations in English.`;
    }
    
    if (content.toLowerCase().includes('business networking')) {
      return `${basePrompt} You are now role-playing as various professionals at a business networking event. Practice small talk, professional introductions, discussing work and industry trends, and making meaningful business connections in English.`;
    }
    
    return basePrompt;
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const systemPrompt = getSystemPrompt(content);
      
      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content }
          ]
        }),
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        role: 'assistant',
        content: data.completion,
        feedback: generateFeedback(content)
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('エラー', 'メッセージの送信に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const generateFeedback = (userInput: string): string => {
    const feedbacks = [
      '素晴らしい表現です！自然な英語を使えています。',
      '文法は正しいですが、もう少しカジュアルな表現も試してみましょう。',
      '良い質問ですね。相手への関心を示す表現が上手です。',
      '発音に注意して、もう一度練習してみましょう。',
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const startRecording = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('音声認識', 'ウェブ版では音声認識は利用できません。');
      return;
    }
    
    setIsRecording(true);
    console.log('Recording started...');
  };

  const stopRecording = async (): Promise<string | null> => {
    setIsRecording(false);
    console.log('Recording stopped...');
    
    // Mock transcription for demo
    const mockTranscriptions = [
      "Hello, how are you today?",
      "I would like to practice my English.",
      "Can you help me with pronunciation?",
      "What's the weather like?"
    ];
    
    return mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
  };

  const playAudio = (text: string) => {
    if (Platform.OS === 'web') {
      // Use Web Speech API for text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
      }
    } else {
      console.log('Playing audio:', text);
      // Would use expo-speech or similar on mobile
    }
  };

  const resetConversation = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    isRecording,
    sendMessage,
    startRecording,
    stopRecording,
    playAudio,
    resetConversation,
  };
}