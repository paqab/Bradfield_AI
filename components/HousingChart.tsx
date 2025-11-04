import { View, Text, StyleSheet } from 'react-native';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateHousingData } from '@/utils/mockData';

interface HousingChartProps {
  summary?: string;
}

export default function HousingChart({ summary }: HousingChartProps) {
  const data = generateHousingData();

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis dataKey="month" stroke="#666666" style={{ fontSize: 12 }} />
            <YAxis stroke="#666666" style={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                borderRadius: 8,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="demand"
              stroke="#87CEEB"
              strokeWidth={3}
              dot={{ fill: '#87CEEB', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="supply"
              stroke="#F5F5DC"
              strokeWidth={3}
              dot={{ fill: '#F5F5DC', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
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
  chartWrapper: {
    height: 200,
    marginBottom: 20,
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
