import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'recharts';
import { generateCommunityData } from '@/utils/mockData';

interface CommunityChartProps {
  summary?: string;
}

export default function CommunityChart({ summary }: CommunityChartProps) {
  const data = generateCommunityData();

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {data.map((item) => (
          <View key={item.category} style={styles.barRow}>
            <Text style={styles.label}>{item.category}</Text>
            <View style={styles.barContainer}>
              <View style={[styles.barPositive, { width: `${item.positive}%` }]}>
                <Text style={styles.barText}>{item.positive}%</Text>
              </View>
              <View style={[styles.barNegative, { width: `${item.negative}%` }]}>
                <Text style={styles.barText}>{item.negative}%</Text>
              </View>
            </View>
          </View>
        ))}
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
  chartContainer: {
    marginBottom: 20,
  },
  barRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  barContainer: {
    flexDirection: 'row',
    height: 32,
    borderRadius: 6,
    overflow: 'hidden',
  },
  barPositive: {
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barNegative: {
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000000',
  },
  summaryContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#87CEEB',
  },
  summaryHeader: {
    marginBottom: 8,
  },
  aiTag: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  aiTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#333333',
  },
});
