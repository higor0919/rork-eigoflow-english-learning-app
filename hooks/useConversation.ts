import { useState } from 'react';
import { Platform, Alert } from 'react-native';

interface FeedbackItem {
  type: 'grammar' | 'vocabulary' | 'pronunciation' | 'fluency' | 'cultural';
  title: string;
  content: string;
  suggestion?: string;
  lessonLink?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  feedback?: FeedbackItem[];
  followUpQuestion?: string;
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
      const conversationHistory = messages.map(m => ({ role: m.role, content: m.content }));
      
      // Enhanced system prompt for follow-up questions
      const enhancedPrompt = `${systemPrompt}

IMPORTANT: After providing your response, generate a thoughtful follow-up question that:
1. Encourages the user to elaborate on their thoughts
2. Pushes their communicative abilities
3. Maintains conversational context
4. Goes beyond simple acknowledgments
5. Is relevant to the current conversation topic

Format your response as: [YOUR_RESPONSE]\n\n[FOLLOW_UP_QUESTION]`;
      
      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: enhancedPrompt
            },
            ...conversationHistory,
            { role: 'user', content }
          ]
        }),
      });

      const data = await response.json();
      
      // Parse response and follow-up question
      const fullResponse = data.completion;
      const parts = fullResponse.split('\n\n');
      const mainResponse = parts[0] || fullResponse;
      const followUpQuestion = parts.length > 1 ? parts[parts.length - 1] : generateFollowUpQuestion(content, mainResponse);
      
      const aiMessage: Message = {
        role: 'assistant',
        content: mainResponse,
        feedback: generateFeedback(content),
        followUpQuestion: followUpQuestion
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('エラー', 'メッセージの送信に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const generateFeedback = (userInput: string): FeedbackItem[] => {
    const feedback: FeedbackItem[] = [];
    
    // Grammar analysis
    if (userInput.toLowerCase().includes('i am go') || userInput.toLowerCase().includes('i go to')) {
      feedback.push({
        type: 'grammar',
        title: '文法修正 Grammar Correction',
        content: 'Present continuous tense should use "I am going" instead of "I am go"',
        suggestion: 'Try: "I am going to the store" instead of "I am go to the store"',
        lessonLink: '/grammar/present-continuous'
      });
    }
    
    // Vocabulary suggestions
    if (userInput.toLowerCase().includes('good') && !userInput.toLowerCase().includes('great')) {
      feedback.push({
        type: 'vocabulary',
        title: '語彙提案 Vocabulary Suggestion',
        content: 'Consider using more varied adjectives to express positive feelings',
        suggestion: 'Instead of "good", try: "excellent", "wonderful", "fantastic", or "amazing"',
        lessonLink: '/vocabulary/adjectives'
      });
    }
    
    // Pronunciation tips
    if (userInput.toLowerCase().includes('l') || userInput.toLowerCase().includes('r')) {
      feedback.push({
        type: 'pronunciation',
        title: '発音のコツ Pronunciation Tip',
        content: 'Pay attention to L and R sounds - common challenge for Japanese speakers',
        suggestion: 'Practice: "light" vs "right", "play" vs "pray". Tongue position is key!',
        lessonLink: '/pronunciation/l-r-sounds'
      });
    }
    
    // Fluency feedback
    if (userInput.length < 10) {
      feedback.push({
        type: 'fluency',
        title: '流暢さ向上 Fluency Enhancement',
        content: 'Try to elaborate more on your thoughts for better conversation flow',
        suggestion: 'Add details like "because...", "for example...", or "I think that..."',
        lessonLink: '/fluency/conversation-fillers'
      });
    }
    
    // Cultural context
    if (userInput.toLowerCase().includes('please') || userInput.toLowerCase().includes('thank')) {
      feedback.push({
        type: 'cultural',
        title: '文化的コンテキスト Cultural Context',
        content: 'Great use of polite expressions! This shows good cultural awareness',
        suggestion: 'In casual settings, you can also use "thanks" or "cheers" (British)',
        lessonLink: '/culture/politeness-levels'
      });
    }
    
    // Always provide at least one positive feedback
    if (feedback.length === 0) {
      const positiveFeedback = [
        {
          type: 'fluency' as const,
          title: '素晴らしい！ Excellent!',
          content: 'Your English is clear and natural. Keep up the great work!',
          suggestion: 'Continue practicing to build confidence in longer conversations',
          lessonLink: '/progress/confidence-building'
        },
        {
          type: 'vocabulary' as const,
          title: '語彙力 Vocabulary Strength',
          content: 'Good word choice! You\'re using appropriate vocabulary for the context',
          suggestion: 'Try incorporating some idiomatic expressions to sound more natural',
          lessonLink: '/vocabulary/idioms'
        },
        {
          type: 'grammar' as const,
          title: '文法正確 Grammar Accuracy',
          content: 'Your sentence structure is correct and easy to understand',
          suggestion: 'Experiment with more complex sentence patterns when you feel ready',
          lessonLink: '/grammar/complex-sentences'
        }
      ];
      feedback.push(positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)]);
    }
    
    return feedback;
  };

  const generateFollowUpQuestion = (userInput: string, aiResponse: string): string => {
    const followUpQuestions = {
      business: [
        "What challenges do you think you might face in that situation?",
        "How would you handle a disagreement in that context?",
        "Can you tell me more about your experience with similar situations?",
        "What would be your next step if that didn't work out as planned?"
      ],
      travel: [
        "What's the most interesting place you've visited recently?",
        "How do you usually prepare for trips to new places?",
        "What would you do if you encountered that problem while traveling?",
        "Can you describe a memorable travel experience you've had?"
      ],
      casual: [
        "What do you think about that topic?",
        "How does that compare to your experience in Japan?",
        "What would you do differently in that situation?",
        "Can you elaborate on why you feel that way?"
      ],
      cultural: [
        "How do you think foreigners perceive that aspect of Japanese culture?",
        "What's something about Japanese culture that you're particularly proud of?",
        "How would you explain that cultural difference to someone from another country?",
        "What questions do foreigners usually ask you about Japan?"
      ],
      restaurant: [
        "What's your favorite type of cuisine and why?",
        "How would you recommend that dish to someone who's never tried it?",
        "What dining etiquette differences have you noticed between countries?",
        "Can you describe the atmosphere of your favorite restaurant?"
      ]
    };

    // Determine context from user input
    let context = 'casual';
    if (userInput.toLowerCase().includes('business') || userInput.toLowerCase().includes('work') || userInput.toLowerCase().includes('job')) {
      context = 'business';
    } else if (userInput.toLowerCase().includes('travel') || userInput.toLowerCase().includes('trip') || userInput.toLowerCase().includes('station')) {
      context = 'travel';
    } else if (userInput.toLowerCase().includes('culture') || userInput.toLowerCase().includes('japanese') || userInput.toLowerCase().includes('tradition')) {
      context = 'cultural';
    } else if (userInput.toLowerCase().includes('restaurant') || userInput.toLowerCase().includes('food') || userInput.toLowerCase().includes('order')) {
      context = 'restaurant';
    }

    const questions = followUpQuestions[context as keyof typeof followUpQuestions];
    return questions[Math.floor(Math.random() * questions.length)];
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