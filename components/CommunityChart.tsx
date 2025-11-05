import { View, Text, StyleSheet } from 'react-native';
import { generateCommunityData } from '@/utils/mockData';
import THEME from '@/constants/theme';

interface CommunityChartProps {
  summary?: string;
}

export default function CommunityChart({ summary }: CommunityChartProps) {
  const data = generateCommunityData();

  // Calculate overall sentiment score
  const overallSentiment = data.reduce((sum, item) => sum + item.positive, 0) / data.length;

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Housing': '🏠',
      'Transport': '🚌',
      'Parks': '🌳',
      'Safety': '🛡️',
      'Services': '⚙️',
    };
    return icons[category] || '📊';
  };

  const getSentimentColor = (positive: number) => {
    if (positive >= 70) return THEME.success;
    if (positive >= 50) return THEME.warning;
    return THEME.danger;
  };

  return (
    <View style={styles.container}>
      <View style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <Text style={styles.overviewTitle}>Overall Sentiment</Text>
          <View style={[styles.sentimentIndicator, { backgroundColor: getSentimentColor(overallSentiment) }]}>
            <Text style={styles.sentimentScore}>{overallSentiment.toFixed(0)}%</Text>
          </View>
        </View>
        <View style={styles.overviewSubtext}>
          <Text style={styles.overviewText}>
            {overallSentiment >= 70 ? 'Strongly Positive' : overallSentiment >= 50 ? 'Moderately Positive' : 'Needs Attention'}
          </Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        {data.map((item, index) => {
          const sentimentColor = getSentimentColor(item.positive);
          const totalFeedback = item.positive + item.negative;
          
          return (
            <View key={item.category} style={styles.barRowContainer}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
                <View style={styles.categoryInfo}>
                  <Text style={styles.label}>{item.category}</Text>
                  <Text style={styles.categorySubtext}>
                    {item.positive}% positive • {totalFeedback}% total engagement
                  </Text>
                </View>
                <View style={[styles.sentimentBadge, { backgroundColor: sentimentColor + '20' }]}>
                  <Text style={[styles.sentimentBadgeText, { color: sentimentColor }]}>
                    {item.positive >= 70 ? '✓' : item.positive >= 50 ? '~' : '!'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.barContainer}>
                <View style={[styles.barPositive, { width: `${item.positive}%`, backgroundColor: sentimentColor }]}>
                  {item.positive > 15 && (
                    <Text style={styles.barTextPositive}>{item.positive}%</Text>
                  )}
                </View>
                <View style={[styles.barNegative, { width: `${item.negative}%` }]}>
                  {item.negative > 15 && (
                    <Text style={styles.barTextNegative}>{item.negative}%</Text>
                  )}
                </View>
              </View>
              
              <View style={styles.barMetrics}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Positive</Text>
                  <Text style={[styles.metricValue, { color: sentimentColor }]}>{item.positive}%</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Negative</Text>
                  <Text style={styles.metricValueNegative}>{item.negative}%</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Net</Text>
                  <Text style={[styles.metricValue, { color: sentimentColor }]}>
                    +{item.positive - item.negative}%
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {summary && (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryHeader}>
            <View style={styles.aiTag}>
              <Text style={styles.aiTagText}>AI INSIGHT</Text>
            </View>
          </View>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overviewCard: {
    backgroundColor: THEME.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.textPrimary,
  },
  sentimentIndicator: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sentimentScore: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  overviewSubtext: {
    marginTop: 4,
  },
  overviewText: {
    fontSize: 13,
    color: '#666666',
    fontStyle: 'italic',
  },
  chartContainer: {
    marginBottom: 20,
  },
  barRowContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: THEME.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryInfo: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.textPrimary,
    marginBottom: 2,
  },
  categorySubtext: {
    fontSize: 11,
    color: '#666666',
  },
  sentimentBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentimentBadgeText: {
    fontSize: 16,
    fontWeight: '700',
  },
  barContainer: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
  },
  barPositive: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
  barNegative: {
    backgroundColor: THEME.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
  barTextPositive: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.textPrimary,
  },
  barTextNegative: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.textSecondary,
  },
  barMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: THEME.surfaceAlt,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: THEME.textSecondary,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.textPrimary,
  },
  metricValueNegative: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.textSecondary,
  },
  summaryContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: THEME.surface,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: THEME.accentBlue,
  },
  summaryHeader: {
    marginBottom: 8,
  },
  aiTag: {
    backgroundColor: THEME.accentBlue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  aiTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.textPrimary,
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 21,
    color: THEME.textSecondary,
  },
});
