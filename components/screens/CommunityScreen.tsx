import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MessageSquare, TrendingUp, MapPin } from 'lucide-react-native';
import InsightCard from '@/components/InsightCard';
import CommunityChart from '@/components/CommunityChart';

export default function CommunityScreen() {
  const feedbackItems = [
    { id: 1, author: 'Sarah M.', category: 'Housing', text: 'Love the new mixed-use development plans. More walkable neighborhoods!', sentiment: 'positive' },
    { id: 2, author: 'James L.', category: 'Transport', text: 'Bus routes need better coverage in the northern suburbs.', sentiment: 'negative' },
    { id: 3, author: 'Maria G.', category: 'Parks', text: 'The new riverside park is fantastic for families. Great initiative!', sentiment: 'positive' },
    { id: 4, author: 'David K.', category: 'Safety', text: 'More street lighting needed on main corridors for evening safety.', sentiment: 'negative' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community Feedback</Text>
        <Text style={styles.subtitle}>Real-time sentiment analysis and engagement metrics</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.chartSection}>
          <InsightCard
            title="Sentiment Analysis"
            icon={<TrendingUp size={20} color="#87CEEB" />}
          >
            <CommunityChart summary="Community engagement is strong across all categories. Housing and parks receive highest approval ratings." />
          </InsightCard>
        </View>

        <View style={styles.feedbackSection}>
          <View style={styles.sectionHeader}>
            <MessageSquare size={20} color="#000000" />
            <Text style={styles.sectionTitle}>Recent Feedback</Text>
          </View>

          {feedbackItems.map((item) => (
            <View key={item.id} style={styles.feedbackCard}>
              <View style={styles.feedbackHeader}>
                <View style={styles.feedbackAuthor}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.author[0]}</Text>
                  </View>
                  <View>
                    <Text style={styles.authorName}>{item.author}</Text>
                    <Text style={styles.category}>{item.category}</Text>
                  </View>
                </View>
                <View style={[styles.sentimentBadge, item.sentiment === 'positive' ? styles.positive : styles.negative]}>
                  <Text style={styles.sentimentText}>{item.sentiment}</Text>
                </View>
              </View>
              <Text style={styles.feedbackText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  content: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  chartSection: {
    marginBottom: 24,
  },
  feedbackSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  feedbackCard: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#87CEEB',
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedbackAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  category: {
    fontSize: 12,
    color: '#666666',
  },
  sentimentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  positive: {
    backgroundColor: '#D4F4DD',
  },
  negative: {
    backgroundColor: '#FFE5E5',
  },
  sentimentText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000000',
    textTransform: 'capitalize',
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#333333',
  },
});
