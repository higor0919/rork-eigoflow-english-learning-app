import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Globe, BookOpen, Users, Coffee } from 'lucide-react-native';
import { Stack } from 'expo-router';

export default function CulturalScreen() {
  const [selectedCategory, setSelectedCategory] = useState('idioms');

  const categories = [
    { id: 'idioms', title: 'イディオム', subtitle: 'Idioms & Expressions', icon: BookOpen },
    { id: 'etiquette', title: 'エチケット', subtitle: 'Social Etiquette', icon: Users },
    { id: 'business', title: 'ビジネス文化', subtitle: 'Business Culture', icon: Coffee },
  ];

  const idioms = [
    {
      idiom: "Break the ice",
      meaning: "初対面の人との緊張をほぐす",
      englishMeaning: "To make people feel more comfortable in a social situation",
      example: "John told a funny joke to break the ice at the meeting.",
      situation: "会議やパーティーの始まりに使う"
    },
    {
      idiom: "Piece of cake",
      meaning: "とても簡単なこと",
      englishMeaning: "Something very easy to do",
      example: "The math test was a piece of cake for Sarah.",
      situation: "何かが簡単だったことを表現する時"
    },
    {
      idiom: "Hit the nail on the head",
      meaning: "的確に指摘する、正確に言い当てる",
      englishMeaning: "To describe exactly what is causing a situation or problem",
      example: "You hit the nail on the head when you said the project needs more time.",
      situation: "誰かが正確な分析をした時"
    }
  ];

  const etiquette = [
    {
      title: "Small Talk",
      titleJp: "雑談・世間話",
      description: "エレベーターや待ち時間での軽い会話",
      tips: [
        "天気の話は安全な話題",
        "個人的すぎる質問は避ける",
        "相手の反応を見ながら話す"
      ],
      examples: [
        "Nice weather today, isn't it?",
        "How was your weekend?",
        "Did you catch the game last night?"
      ]
    },
    {
      title: "Apologizing",
      titleJp: "謝罪の仕方",
      description: "適切な謝罪の表現と使い分け",
      tips: [
        "軽い謝罪: Sorry, Excuse me",
        "正式な謝罪: I apologize",
        "状況に応じて使い分ける"
      ],
      examples: [
        "Sorry, I'm running a bit late.",
        "I apologize for the confusion.",
        "Excuse me, could I get past?"
      ]
    }
  ];

  const renderIdioms = () => (
    <View style={styles.contentContainer}>
      {idioms.map((item, index) => (
        <View key={index} style={styles.idiomCard}>
          <Text style={styles.idiomText}>&ldquo;{item.idiom}&rdquo;</Text>
          
          <View style={styles.meaningSection}>
            <Text style={styles.meaningTitle}>意味:</Text>
            <Text style={styles.meaningText}>{item.meaning}</Text>
            <Text style={styles.meaningEnglish}>{item.englishMeaning}</Text>
          </View>
          
          <View style={styles.exampleSection}>
            <Text style={styles.exampleTitle}>例文:</Text>
            <Text style={styles.exampleText}>&ldquo;{item.example}&rdquo;</Text>
          </View>
          
          <View style={styles.situationSection}>
            <Text style={styles.situationTitle}>使用場面:</Text>
            <Text style={styles.situationText}>{item.situation}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderEtiquette = () => (
    <View style={styles.contentContainer}>
      {etiquette.map((item, index) => (
        <View key={index} style={styles.etiquetteCard}>
          <Text style={styles.etiquetteTitle}>{item.titleJp}</Text>
          <Text style={styles.etiquetteSubtitle}>{item.title}</Text>
          
          <Text style={styles.etiquetteDescription}>{item.description}</Text>
          
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>ポイント Tips:</Text>
            {item.tips.map((tip, tipIndex) => (
              <Text key={tipIndex} style={styles.tipText}>• {tip}</Text>
            ))}
          </View>
          
          <View style={styles.examplesSection}>
            <Text style={styles.examplesTitle}>例 Examples:</Text>
            {item.examples.map((example, exampleIndex) => (
              <Text key={exampleIndex} style={styles.exampleItem}>&ldquo;{example}&rdquo;</Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  const businessCulture = [
    {
      title: "Meeting Etiquette",
      titleJp: "会議のマナー",
      description: "英語圏のビジネス会議での適切な振る舞い",
      keyPoints: [
        "時間厳守は絶対 - 5分前到着が理想",
        "積極的な発言が評価される",
        "質問は会議中に遠慮なく",
        "アイコンタクトを保つ"
      ],
      phrases: [
        "I'd like to add something to that point.",
        "Could you clarify what you mean by...?",
        "I have a different perspective on this.",
        "Let me circle back to that later."
      ],
      culturalNotes: "日本と違い、会議中の沈黙は消極的と見なされがち。積極的な参加が期待されます。"
    },
    {
      title: "Email Communication",
      titleJp: "メールコミュニケーション",
      description: "効果的なビジネスメールの書き方",
      keyPoints: [
        "件名は具体的で簡潔に",
        "最初に要点を述べる",
        "丁寧だが簡潔な表現",
        "アクションアイテムを明確に"
      ],
      phrases: [
        "I hope this email finds you well.",
        "I'm writing to follow up on...",
        "Could you please provide an update on...?",
        "Thank you for your prompt response."
      ],
      culturalNotes: "長い前置きは不要。要点を最初に述べ、簡潔で明確なコミュニケーションが好まれます。"
    },
    {
      title: "Networking & Small Talk",
      titleJp: "ネットワーキング・雑談",
      description: "ビジネスシーンでの関係構築",
      keyPoints: [
        "自己紹介は簡潔で印象的に",
        "相手の話に興味を示す",
        "共通点を見つける",
        "連絡先交換のタイミング"
      ],
      phrases: [
        "What brings you to this event?",
        "How long have you been in this industry?",
        "That's really interesting. Tell me more.",
        "I'd love to continue this conversation. Here's my card."
      ],
      culturalNotes: "名刺交換は日本ほど儀式的ではありません。自然な会話の流れで行います。"
    },
    {
      title: "Presentation Skills",
      titleJp: "プレゼンテーションスキル",
      description: "効果的なビジネスプレゼンテーション",
      keyPoints: [
        "強いオープニングで注意を引く",
        "ストーリーテリングを活用",
        "データより結論を重視",
        "Q&Aセッションの準備"
      ],
      phrases: [
        "Today I'm going to show you how...",
        "Let me paint you a picture...",
        "The bottom line is...",
        "That's a great question. Let me address that."
      ],
      culturalNotes: "日本のプレゼンより対話的。聴衆との相互作用を積極的に求めましょう。"
    },
    {
      title: "Negotiation Style",
      titleJp: "交渉スタイル",
      description: "英語圏での効果的な交渉術",
      keyPoints: [
        "直接的だが礼儀正しく",
        "Win-Winの解決策を模索",
        "データと論理で説得",
        "感情的にならない"
      ],
      phrases: [
        "I understand your position, but...",
        "What if we approached it this way?",
        "I'm confident we can find a solution that works for both parties.",
        "Let's explore some alternatives."
      ],
      culturalNotes: "遠回しな表現より、明確で直接的なコミュニケーションが効果的です。"
    }
  ];

  const renderBusiness = () => (
    <View style={styles.contentContainer}>
      {businessCulture.map((item, index) => (
        <View key={index} style={styles.businessCard}>
          <View style={styles.businessHeader}>
            <Text style={styles.businessTitle}>{item.titleJp}</Text>
            <Text style={styles.businessSubtitle}>{item.title}</Text>
          </View>
          
          <Text style={styles.businessDescription}>{item.description}</Text>
          
          <View style={styles.keyPointsSection}>
            <Text style={styles.sectionTitle}>重要ポイント Key Points:</Text>
            {item.keyPoints.map((point, pointIndex) => (
              <View key={pointIndex} style={styles.keyPointItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.phrasesSection}>
            <Text style={styles.sectionTitle}>よく使われる表現 Common Phrases:</Text>
            {item.phrases.map((phrase, phraseIndex) => (
              <Text key={phraseIndex} style={styles.phraseItem}>&ldquo;{phrase}&rdquo;</Text>
            ))}
          </View>
          
          <View style={styles.culturalNotesSection}>
            <Text style={styles.sectionTitle}>文化的な注意点 Cultural Notes:</Text>
            <Text style={styles.culturalNotesText}>{item.culturalNotes}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: '文化学習', headerShown: true }} />
      
      {/* Header */}
      <LinearGradient
        colors={['#AF52DE', '#BF5AF2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Globe size={32} color="#FFFFFF" />
          <Text style={styles.headerTitle}>文化学習</Text>
          <Text style={styles.headerSubtitle}>Cultural Immersion</Text>
        </View>
      </LinearGradient>

      {/* Category Selection */}
      <View style={styles.categorySection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <IconComponent 
                  size={20} 
                  color={selectedCategory === category.id ? '#FFFFFF' : '#6B7280'} 
                />
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
            );
          })}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedCategory === 'idioms' && renderIdioms()}
        {selectedCategory === 'etiquette' && renderEtiquette()}
        {selectedCategory === 'business' && renderBusiness()}
        
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
    color: '#E0E7FF',
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
    minWidth: 140,
    alignItems: 'center',
    gap: 4,
  },
  categoryButtonActive: {
    backgroundColor: '#AF52DE',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  categoryButtonSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  categoryButtonSubtextActive: {
    color: '#E0E7FF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  idiomCard: {
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
  idiomText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#AF52DE',
    marginBottom: 16,
    textAlign: 'center',
  },
  meaningSection: {
    marginBottom: 16,
  },
  meaningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  meaningText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  meaningEnglish: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  exampleSection: {
    marginBottom: 16,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    color: '#1F2937',
    fontStyle: 'italic',
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 8,
  },
  situationSection: {},
  situationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  situationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  etiquetteCard: {
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
  etiquetteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  etiquetteSubtitle: {
    fontSize: 16,
    color: '#AF52DE',
    marginBottom: 12,
  },
  etiquetteDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  tipsSection: {
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  examplesSection: {},
  examplesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  exampleItem: {
    fontSize: 14,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 8,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  businessCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#AF52DE',
  },
  businessHeader: {
    marginBottom: 12,
  },
  businessTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  businessSubtitle: {
    fontSize: 16,
    color: '#AF52DE',
    fontWeight: '600',
  },
  businessDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  keyPointsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  keyPointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#AF52DE',
    marginRight: 8,
    marginTop: 2,
  },
  keyPointText: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
    lineHeight: 20,
  },
  phrasesSection: {
    marginBottom: 16,
  },
  phraseItem: {
    fontSize: 14,
    color: '#1F2937',
    backgroundColor: '#F0F9FF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    fontStyle: 'italic',
    borderLeftWidth: 3,
    borderLeftColor: '#0EA5E9',
  },
  culturalNotesSection: {},
  culturalNotesText: {
    fontSize: 14,
    color: '#DC2626',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    lineHeight: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#DC2626',
  },
  bottomPadding: {
    height: 20,
  },
});