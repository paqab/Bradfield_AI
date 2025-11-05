import { View, Text, StyleSheet } from 'react-native';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { generateOptimisationData } from '@/utils/mockData';

interface OptimisationChartProps {
  summary?: string;
}

const COLORS = ['#87CEEB', '#4682B4', '#5F9EA0', '#20B2AA', '#00CED1', '#1E90FF'];

export default function OptimisationChart({ summary }: OptimisationChartProps) {
  const data = generateOptimisationData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <View style={styles.tooltipContainer}>
          <Text style={styles.tooltipTitle}>Scenario {data.scenario}</Text>
          <View style={styles.tooltipRow}>
            <Text style={styles.tooltipLabel}>Cost:</Text>
            <Text style={styles.tooltipValue}>${data.cost.toLocaleString()}</Text>
          </View>
          <View style={styles.tooltipRow}>
            <Text style={styles.tooltipLabel}>Impact:</Text>
            <Text style={styles.tooltipValue}>{data.impact} units</Text>
          </View>
          <View style={styles.tooltipRow}>
            <Text style={styles.tooltipLabel}>Efficiency:</Text>
            <Text style={[styles.tooltipValue, styles.efficiencyHighlight]}>{data.efficiency}%</Text>
          </View>
          <View style={styles.tooltipRow}>
            <Text style={styles.tooltipLabel}>ROI:</Text>
            <Text style={styles.tooltipValue}>{((data.impact / data.cost) * 100).toFixed(2)}%</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  // Calculate optimal zone (high impact, reasonable cost)
  const avgCost = data.reduce((sum, d) => sum + d.cost, 0) / data.length;
  const avgImpact = data.reduce((sum, d) => sum + d.impact, 0) / data.length;

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" opacity={0.5} />
            <XAxis
              type="number"
              dataKey="cost"
              name="Cost ($)"
              stroke="#666666"
              style={{ fontSize: 11 }}
              label={{ value: 'Cost ($)', position: 'insideBottom', offset: -5 }}
              domain={['dataMin - 500', 'dataMax + 500']}
            />
            <YAxis
              type="number"
              dataKey="impact"
              name="Impact (units)"
              stroke="#666666"
              style={{ fontSize: 11 }}
              label={{ value: 'Impact (units)', angle: -90, position: 'insideLeft', offset: 10 }}
              domain={['dataMin - 20', 'dataMax + 20']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: 11, paddingTop: 10 }} 
              iconType="circle"
            />
            {/* Reference lines for optimal zone */}
            <ReferenceLine x={avgCost} stroke="#87CEEB" strokeDasharray="5 5" opacity={0.5} />
            <ReferenceLine y={avgImpact} stroke="#87CEEB" strokeDasharray="5 5" opacity={0.5} />
            <Scatter
              name="Optimisation Scenarios"
              data={data}
              fill="#87CEEB"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  r={entry.efficiency > 88 ? 8 : 6}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendHeader}>
          <Text style={styles.legendTitle}>Scenario Performance</Text>
          <Text style={styles.legendSubtitle}>Click points for detailed metrics</Text>
        </View>
        <View style={styles.scenarioList}>
          {data.map((scenario, index) => (
            <View key={scenario.scenario} style={[styles.scenarioItem, scenario.efficiency > 88 && styles.optimalItem]}>
              <View style={[styles.colorIndicator, { backgroundColor: COLORS[index % COLORS.length] }]} />
              <View style={styles.scenarioInfo}>
                <View style={styles.scenarioHeader}>
                  <Text style={styles.scenarioLabel}>Scenario {scenario.scenario}</Text>
                  {scenario.efficiency > 88 && (
                    <View style={styles.optimalBadge}>
                      <Text style={styles.optimalBadgeText}>OPTIMAL</Text>
                    </View>
                  )}
                </View>
                <View style={styles.metricsRow}>
                  <Text style={styles.metricText}>Efficiency: <Text style={styles.metricValue}>{scenario.efficiency}%</Text></Text>
                  <Text style={styles.metricText}>ROI: <Text style={styles.metricValue}>{((scenario.impact / scenario.cost) * 100).toFixed(1)}%</Text></Text>
                </View>
                <View style={styles.metricsRow}>
                  <Text style={styles.metricTextSmall}>Cost: ${scenario.cost.toLocaleString()}</Text>
                  <Text style={styles.metricTextSmall}>Impact: {scenario.impact} units</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
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
    height: 280,
    marginBottom: 20,
  },
  tooltipContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 180,
  },
  tooltipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  tooltipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  tooltipLabel: {
    fontSize: 12,
    color: '#666666',
  },
  tooltipValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  efficiencyHighlight: {
    color: '#87CEEB',
  },
  legendContainer: {
    marginBottom: 20,
  },
  legendHeader: {
    marginBottom: 12,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  legendSubtitle: {
    fontSize: 11,
    color: '#666666',
    fontStyle: 'italic',
  },
  scenarioList: {
    gap: 10,
  },
  scenarioItem: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 12,
  },
  optimalItem: {
    backgroundColor: '#F0F8FF',
    borderColor: '#87CEEB',
    borderWidth: 2,
  },
  colorIndicator: {
    width: 4,
    borderRadius: 2,
    alignSelf: 'stretch',
  },
  scenarioInfo: {
    flex: 1,
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  scenarioLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
  },
  optimalBadge: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  optimalBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metricText: {
    fontSize: 12,
    color: '#666666',
  },
  metricValue: {
    fontWeight: '700',
    color: '#000000',
  },
  metricTextSmall: {
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
