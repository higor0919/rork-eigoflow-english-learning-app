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
      
      const feedback = await generateFeedback(content, mainResponse);
      
      const aiMessage: Message = {
        role: 'assistant',
        content: mainResponse,
        feedback: feedback,
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

  const generateFeedback = async (userInput: string, conversationContext: string = ''): Promise<FeedbackItem[]> => {
    try {
      // Use AI to generate contextual feedback
      const feedbackPrompt = `Analyze this English text from a Japanese learner and provide specific, actionable feedback. Focus on actual issues in the text, not generic advice.

User input: "${userInput}"
Conversation context: ${conversationContext}

Provide feedback in this JSON format:
[
  {
    "type": "grammar|vocabulary|pronunciation|fluency|cultural",
    "title": "Title in Japanese and English",
    "content": "Specific analysis of what was good or needs improvement",
    "suggestion": "Concrete suggestion for improvement",
    "lessonLink": "/relevant/lesson/path"
  }
]

Rules:
1. Only provide feedback if there are actual issues or notable strengths
2. Be specific to the actual text, not generic
3. Limit to 2-3 most important points
4. Include at least one positive point if the text is generally good
5. For very short inputs, focus on fluency/elaboration
6. For longer inputs, focus on grammar, vocabulary, and cultural appropriateness`;

      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are an expert English teacher specializing in helping Japanese learners. Provide specific, actionable feedback based on the actual text provided.'
            },
            {
              role: 'user',
              content: feedbackPrompt
            }
          ]
        }),
      });

      const data = await response.json();
      
      try {
        // Try to parse the AI response as JSON
        const feedbackText = data.completion;
        const jsonMatch = feedbackText.match(/\[.*\]/s);
        
        if (jsonMatch) {
          const parsedFeedback = JSON.parse(jsonMatch[0]);
          return parsedFeedback.map((item: any) => ({
            type: item.type || 'fluency',
            title: item.title || 'フィードバック Feedback',
            content: item.content || 'Good work!',
            suggestion: item.suggestion,
            lessonLink: item.lessonLink
          }));
        }
      } catch {
        console.log('Failed to parse AI feedback, using fallback');
      }
      
      // Fallback to contextual feedback if AI parsing fails
      return generateContextualFeedback(userInput);
      
    } catch (error) {
      console.error('Error generating AI feedback:', error);
      return generateContextualFeedback(userInput);
    }
  };

  const generateContextualFeedback = (userInput: string): FeedbackItem[] => {
    const feedback: FeedbackItem[] = [];
    const input = userInput.toLowerCase().trim();
    
    // Grammar analysis - more specific patterns
    if (input.match(/\bi am go\b/) || input.match(/\bi go to\b.*ing\b/)) {
      feedback.push({
        type: 'grammar',
        title: '文法修正 Grammar Correction',
        content: 'Present continuous tense issue detected in your sentence',
        suggestion: 'Use "I am going" instead of "I am go" for present continuous',
        lessonLink: '/grammar/present-continuous'
      });
    }
    
    // Check for missing articles
    if (input.match(/\bgo to school\b/) && !input.match(/\bgo to the school\b/)) {
      feedback.push({
        type: 'grammar',
        title: '冠詞 Articles',
        content: 'Consider when to use articles (a, an, the) with nouns',
        suggestion: 'For specific places, use "the": "go to the school" vs "go to school" (general activity)',
        lessonLink: '/grammar/articles'
      });
    }
    
    // Vocabulary enhancement - context-aware
    if (input.includes('very good') || input.includes('so good')) {
      feedback.push({
        type: 'vocabulary',
        title: '語彙向上 Vocabulary Enhancement',
        content: 'Your meaning is clear! Consider using more varied intensifiers',
        suggestion: 'Instead of "very good": "excellent", "outstanding", "remarkable", "impressive"',
        lessonLink: '/vocabulary/intensifiers'
      });
    }
    
    // Fluency - length and complexity analysis
    if (input.length < 15 && !input.includes('?')) {
      feedback.push({
        type: 'fluency',
        title: '会話の流暢さ Conversation Fluency',
        content: 'Try expanding your thoughts to create more natural conversation flow',
        suggestion: 'Add reasons ("because..."), examples ("for instance..."), or follow-up thoughts',
        lessonLink: '/fluency/elaboration'
      });
    }
    
    // Cultural appropriateness - context-specific
    if (input.includes('please') && input.includes('can you')) {
      feedback.push({
        type: 'cultural',
        title: '丁寧な表現 Polite Expressions',
        content: 'Excellent use of polite request structure!',
        suggestion: 'You can also use "Would you mind...?" or "Could you possibly...?" for extra politeness',
        lessonLink: '/culture/polite-requests'
      });
    }
    
    // Pronunciation - specific word analysis
    const lrWords = input.match(/\b\w*[lr]\w*\b/g);
    if (lrWords && lrWords.length > 0) {
      feedback.push({
        type: 'pronunciation',
        title: '発音練習 Pronunciation Practice',
        content: `Focus on L/R sounds in words like: ${lrWords.slice(0, 3).join(', ')}`,
        suggestion: 'Practice tongue position: L touches roof of mouth, R doesn\'t touch anything',
        lessonLink: '/pronunciation/l-r-distinction'
      });
    }
    
    // If no specific feedback, provide encouraging general feedback
    if (feedback.length === 0) {
      const encouragingFeedback = [
        {
          type: 'fluency' as const,
          title: '自然な表現 Natural Expression',
          content: 'Your English sounds natural and is easy to understand!',
          suggestion: 'Keep practicing to build confidence in more complex conversations',
          lessonLink: '/progress/confidence'
        },
        {
          type: 'vocabulary' as const,
          title: '適切な語彙選択 Good Word Choice',
          content: 'You\'re using appropriate vocabulary for this context',
          suggestion: 'Try incorporating some idiomatic expressions to sound even more natural',
          lessonLink: '/vocabulary/idioms'
        }
      ];
      feedback.push(encouragingFeedback[Math.floor(Math.random() * encouragingFeedback.length)]);
    }
    
    return feedback.slice(0, 3); // Limit to 3 feedback items
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