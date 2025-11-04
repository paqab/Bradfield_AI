import { View, Text, StyleSheet } from 'react-native';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateOptimisationData } from '@/utils/mockData';

interface OptimisationChartProps {
  summary?: string;
}

export default function OptimisationChart({ summary }: OptimisationChartProps) {
  const data = generateOptimisationData();

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={200}>
          <ScatterChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis
              type="number"
              dataKey="cost"
              name="Cost"
              stroke="#666666"
              style={{ fontSize: 12 }}
              label={{ value: 'Cost', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              type="number"
              dataKey="impact"
              name="Impact"
              stroke="#666666"
              style={{ fontSize: 12 }}
              label={{ value: 'Impact', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                borderRadius: 8,
              }}
              formatter={(value: any, name: string) => {
                if (name === 'Efficiency') return `${value}%`;
                return value;
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Scatter
              name="Scenarios"
              data={data}
              fill="#87CEEB"
              shape="circle"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </View>

      <View style={styles.scenarioList}>
        {data.map((scenario) => (
          <View key={scenario.scenario} style={styles.scenarioItem}>
            <Text style={styles.scenarioLabel}>Scenario {scenario.scenario}</Text>
            <Text style={styles.scenarioValue}>Efficiency: {scenario.efficiency}%</Text>
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
  chartWrapper: {
    height: 200,
    marginBottom: 20,
  },
  scenarioList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  scenarioItem: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  scenarioLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  scenarioValue: {
    fontSize: 11,
    color: '#666666',
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
