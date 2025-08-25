import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Briefcase, GraduationCap, Plane, Code } from 'lucide-react-native';
import { Stack } from 'expo-router';

export default function ESPScreen() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const tracks = [
    {
      id: 'business',
      title: 'ビジネス英語',
      subtitle: 'Business English',
      icon: Briefcase,
      color: '#3B82F6',
      description: 'プレゼンテーション、会議、メール、交渉など',
      modules: ['会議での発言', 'プレゼンテーション', 'ビジネスメール', '交渉術']
    },
    {
      id: 'academic',
      title: 'アカデミック英語',
      subtitle: 'Academic English',
      icon: GraduationCap,
      color: '#8B5CF6',
      description: '論文執筆、学会発表、研究討論など',
      modules: ['論文執筆', '学会発表', '研究討論', '文献レビュー']
    },
    {
      id: 'travel',
      title: '旅行・観光英語',
      subtitle: 'Travel & Tourism',
      icon: Plane,
      color: '#10B981',
      description: '空港、ホテル、レストラン、観光地での会話',
      modules: ['空港での手続き', 'ホテル予約', 'レストラン注文', '道案内']
    },
    {
      id: 'tech',
      title: 'IT・技術英語',
      subtitle: 'IT & Technical English',
      icon: Code,
      color: '#F59E0B',
      description: 'プログラミング、技術文書、システム説明など',
      modules: ['技術仕様書', 'コードレビュー', 'システム説明', 'トラブルシューティング']
    }
  ];

  const businessContent = {
    vocabulary: [
      { term: 'Agenda', meaning: '議題、予定表', example: 'Let\'s review the agenda for today\'s meeting.' },
      { term: 'Deadline', meaning: '締切', example: 'The project deadline is next Friday.' },
      { term: 'Revenue', meaning: '収益', example: 'Our revenue increased by 15% this quarter.' },
      { term: 'Stakeholder', meaning: '利害関係者', example: 'We need to inform all stakeholders about the changes.' }
    ],
    phrases: [
      { phrase: 'I\'d like to schedule a meeting', meaning: '会議の予定を組みたいのですが', situation: '会議設定時' },
      { phrase: 'Could you elaborate on that?', meaning: 'それについて詳しく説明していただけますか？', situation: '詳細確認時' },
      { phrase: 'Let\'s table this for now', meaning: 'これは一旦保留にしましょう', situation: '議論の延期時' }
    ]
  };

  const academicContent = {
    vocabulary: [
      { term: 'Hypothesis', meaning: '仮説', example: 'Our hypothesis suggests that the treatment will be effective.' },
      { term: 'Methodology', meaning: '方法論', example: 'The methodology section describes our research approach.' },
      { term: 'Citation', meaning: '引用', example: 'Please include proper citations for all sources.' },
      { term: 'Peer review', meaning: '査読', example: 'The paper underwent rigorous peer review.' },
      { term: 'Abstract', meaning: '要約', example: 'The abstract summarizes the key findings.' }
    ],
    phrases: [
      { phrase: 'According to the literature', meaning: '文献によると', situation: '研究背景説明時' },
      { phrase: 'The data suggests that', meaning: 'データは〜を示唆している', situation: '結果説明時' },
      { phrase: 'Further research is needed', meaning: 'さらなる研究が必要である', situation: '結論・今後の課題時' },
      { phrase: 'In conclusion', meaning: '結論として', situation: '論文・発表の締めくくり時' }
    ],
    scenarios: [
      { title: '学会発表', description: '研究成果を学会で発表する際の表現を練習します。' },
      { title: '論文執筆', description: 'アカデミックライティングの基本構造を学びます。' },
      { title: '研究討論', description: '他の研究者との議論で使える表現を身につけます。' }
    ]
  };

  const travelContent = {
    vocabulary: [
      { term: 'Boarding pass', meaning: '搭乗券', example: 'Please have your boarding pass ready.' },
      { term: 'Reservation', meaning: '予約', example: 'I have a reservation under the name Smith.' },
      { term: 'Itinerary', meaning: '旅程', example: 'Could you help me plan my itinerary?' },
      { term: 'Concierge', meaning: 'コンシェルジュ', example: 'The concierge can help with restaurant recommendations.' },
      { term: 'Souvenir', meaning: 'お土産', example: 'I\'m looking for souvenirs for my family.' }
    ],
    phrases: [
      { phrase: 'Excuse me, where is the gate?', meaning: 'すみません、ゲートはどこですか？', situation: '空港で' },
      { phrase: 'I\'d like to check in', meaning: 'チェックインをお願いします', situation: 'ホテルで' },
      { phrase: 'Could I have the menu, please?', meaning: 'メニューをいただけますか？', situation: 'レストランで' },
      { phrase: 'How do I get to...?', meaning: '〜へはどう行けばいいですか？', situation: '道案内を求める時' }
    ],
    scenarios: [
      { title: '空港での手続き', description: 'チェックイン、セキュリティ、搭乗手続きの表現を学びます。' },
      { title: 'ホテルでの会話', description: 'チェックイン、サービス依頼、問題解決の表現を練習します。' },
      { title: 'レストランでの注文', description: '料理の注文、アレルギー対応、支払いの表現を身につけます。' }
    ]
  };

  const techContent = {
    vocabulary: [
      { term: 'Algorithm', meaning: 'アルゴリズム', example: 'This algorithm optimizes the search process.' },
      { term: 'Database', meaning: 'データベース', example: 'We need to update the database schema.' },
      { term: 'API', meaning: 'API（アプリケーション・プログラミング・インターフェース）', example: 'The API returns JSON data.' },
      { term: 'Framework', meaning: 'フレームワーク', example: 'React is a popular JavaScript framework.' },
      { term: 'Deployment', meaning: 'デプロイメント、配備', example: 'The deployment was successful.' },
      { term: 'Bug', meaning: 'バグ、不具合', example: 'We found a critical bug in the payment system.' },
      { term: 'Repository', meaning: 'リポジトリ', example: 'Please push your code to the repository.' },
      { term: 'Scalability', meaning: 'スケーラビリティ、拡張性', example: 'We need to improve the scalability of our system.' }
    ],
    phrases: [
      { phrase: 'Let\'s debug this issue', meaning: 'この問題をデバッグしましょう', situation: 'トラブルシューティング時' },
      { phrase: 'The system is down', meaning: 'システムがダウンしています', situation: '障害報告時' },
      { phrase: 'Can you review my code?', meaning: 'コードをレビューしていただけますか？', situation: 'コードレビュー依頼時' },
      { phrase: 'We need to optimize performance', meaning: 'パフォーマンスを最適化する必要があります', situation: '改善提案時' },
      { phrase: 'The feature is ready for testing', meaning: '機能はテスト準備完了です', situation: '開発完了報告時' },
      { phrase: 'Let\'s schedule a code review', meaning: 'コードレビューの予定を組みましょう', situation: 'レビュー調整時' }
    ],
    scenarios: [
      { title: '技術仕様書の説明', description: 'システムの技術仕様を英語で説明する表現を学びます。' },
      { title: 'コードレビュー', description: 'コードの品質や改善点について議論する表現を練習します。' },
      { title: 'トラブルシューティング', description: '技術的な問題の報告と解決策の提案表現を身につけます。' },
      { title: 'プロジェクト進捗報告', description: '開発進捗や課題を英語で報告する表現を学びます。' }
    ]
  };

  const renderTrackSelection = () => (
    <View style={styles.tracksContainer}>
      {tracks.map((track) => {
        const IconComponent = track.icon;
        return (
          <TouchableOpacity
            key={track.id}
            style={styles.trackCard}
            onPress={() => setSelectedTrack(track.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.trackIcon, { backgroundColor: track.color }]}>
              <IconComponent size={24} color="#FFFFFF" />
            </View>
            
            <View style={styles.trackContent}>
              <Text style={styles.trackTitle}>{track.title}</Text>
              <Text style={styles.trackSubtitle}>{track.subtitle}</Text>
              <Text style={styles.trackDescription}>{track.description}</Text>
              
              <View style={styles.modulesList}>
                {track.modules.map((module, index) => (
                  <Text key={index} style={styles.moduleItem}>• {module}</Text>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderContent = (contentType: string) => {
    let content: any, practiceTitle: string, practiceDescription: string;
    
    switch (contentType) {
      case 'business':
        content = businessContent;
        practiceTitle = 'シナリオ練習: 会議での発言';
        practiceDescription = 'あなたは新しいプロジェクトについて会議で発言する必要があります。適切な表現を使って意見を述べてください。';
        break;
      case 'academic':
        content = academicContent;
        practiceTitle = 'シナリオ練習: 学会発表';
        practiceDescription = 'あなたの研究成果を学会で発表します。専門的で明確な表現を使って発表してください。';
        break;
      case 'travel':
        content = travelContent;
        practiceTitle = 'シナリオ練習: 空港での手続き';
        practiceDescription = '海外の空港でチェックインから搭乗まで、必要な手続きを英語で行ってください。';
        break;
      case 'tech':
        content = techContent;
        practiceTitle = 'シナリオ練習: 技術仕様の説明';
        practiceDescription = '新しいシステムの技術仕様について、チームメンバーに英語で説明してください。';
        break;
      default:
        return null;
    }

    return (
      <View style={styles.contentContainer}>
        {/* Vocabulary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>重要語彙 Key Vocabulary</Text>
          
          {content.vocabulary.map((item: any, index: number) => (
            <View key={index} style={styles.vocabularyCard}>
              <Text style={styles.vocabularyTerm}>{item.term}</Text>
              <Text style={styles.vocabularyMeaning}>{item.meaning}</Text>
              <Text style={styles.vocabularyExample}>例: &ldquo;{item.example}&rdquo;</Text>
            </View>
          ))}
        </View>

        {/* Phrases Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>重要フレーズ Key Phrases</Text>
          
          {content.phrases.map((item: any, index: number) => (
            <View key={index} style={styles.phraseCard}>
              <Text style={styles.phraseText}>&ldquo;{item.phrase}&rdquo;</Text>
              <Text style={styles.phraseMeaning}>{item.meaning}</Text>
              <Text style={styles.phraseSituation}>使用場面: {item.situation}</Text>
            </View>
          ))}
        </View>

        {/* Scenarios Section (for academic, travel, and tech) */}
        {(contentType === 'academic' || contentType === 'travel' || contentType === 'tech') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>学習シナリオ Learning Scenarios</Text>
            
            {content.scenarios?.map((scenario: any, index: number) => (
              <View key={index} style={styles.scenarioCard}>
                <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                <Text style={styles.scenarioDescription}>{scenario.description}</Text>
                <TouchableOpacity style={styles.scenarioButton}>
                  <Text style={styles.scenarioButtonText}>シナリオを開始</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Practice Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>練習問題 Practice Exercises</Text>
          
          <View style={styles.practiceCard}>
            <Text style={styles.practiceTitle}>{practiceTitle}</Text>
            <Text style={styles.practiceDescription}>{practiceDescription}</Text>
            
            <TouchableOpacity style={styles.practiceButton}>
              <Text style={styles.practiceButtonText}>練習を開始</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: '専門英語', headerShown: true }} />
      
      {/* Header */}
      <LinearGradient
        colors={['#F59E0B', '#D97706']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <BookOpen size={32} color="#FFFFFF" />
          <Text style={styles.headerTitle}>専門英語</Text>
          <Text style={styles.headerSubtitle}>English for Specific Purposes</Text>
          
          {selectedTrack && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedTrack(null)}
            >
              <Text style={styles.backButtonText}>← トラック選択に戻る</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedTrack ? (
          <>
            <View style={styles.introSection}>
              <Text style={styles.introTitle}>専門分野を選択してください</Text>
              <Text style={styles.introSubtitle}>Choose Your Specialization</Text>
              <Text style={styles.introDescription}>
                あなたの職業や興味に合わせて、専門的な英語スキルを身につけましょう。
                各トラックには実践的な語彙、フレーズ、シナリオが含まれています。
              </Text>
            </View>
            
            {renderTrackSelection()}
          </>
        ) : (
          <>
            {(selectedTrack === 'business' || selectedTrack === 'academic' || selectedTrack === 'travel' || selectedTrack === 'tech') && renderContent(selectedTrack)}
          </>
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
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  headerContent: {
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Inter',
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  backButton: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  content: {
    flex: 1,
  },
  introSection: {
    padding: 20,
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  introSubtitle: {
    fontSize: 17,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  introDescription: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  tracksContainer: {
    padding: 24,
    paddingTop: 0,
  },
  trackCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  trackIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  trackContent: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
    fontFamily: 'Inter',
  },
  trackSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 10,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  trackDescription: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  modulesList: {
    gap: 4,
  },
  moduleItem: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  contentContainer: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    fontFamily: 'Inter',
  },
  vocabularyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  vocabularyTerm: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F59E0B',
    marginBottom: 6,
    fontFamily: 'Inter',
  },
  vocabularyMeaning: {
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 6,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  vocabularyExample: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  phraseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  phraseText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 6,
    fontFamily: 'Inter',
  },
  phraseMeaning: {
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 6,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  phraseSituation: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  practiceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  practiceTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
    fontFamily: 'Inter',
  },
  practiceDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  practiceButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  practiceButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter',
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
  bottomPadding: {
    height: 20,
  },
  scenarioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 8,
  },
  scenarioDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  scenarioButton: {
    backgroundColor: '#10B981',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  scenarioButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});