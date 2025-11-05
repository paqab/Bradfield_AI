import { View, Text, StyleSheet } from 'react-native';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateOptimisationData } from '@/utils/mockData';
import THEME from '@/constants/theme';

interface OptimisationChartProps {
  summary?: string;
}

// expanded palette includes yellows and reds for visual diversity
const COLORS = [
  THEME.accentPurple,
  THEME.accentBlue,
  THEME.accentPop,
  THEME.warning || '#ffd166',
  THEME.danger || '#ff6b6b',
];

export default function OptimisationChart({ summary }: OptimisationChartProps) {
  const raw = generateOptimisationData();

  // Normalize metrics into 0-100 scores for radar chart and add ROI
  const maxCost = Math.max(...raw.map((r) => r.cost));
  const maxImpact = Math.max(...raw.map((r) => r.impact));
  const rois = raw.map((r) => (r.cost > 0 ? (r.impact / r.cost) * 100 : 0));
  const maxROI = Math.max(...rois, 1);

  const radarMetrics = ['Efficiency', 'Impact', 'Cost', 'ROI'];

  // scale plotted metrics down so each scenario occupies ~60-70% of the chart
  const SCALE_FACTOR = 0.65

  const radarData = radarMetrics.map((metric) => {
    const obj: any = { metric };
    raw.forEach((r) => {
      if (metric === 'Efficiency') {
        // efficiency in mockData is already a 0-100 style number
        obj[r.scenario] = Math.round(Math.max(0, Math.min(100, r.efficiency)) * SCALE_FACTOR);
      } else if (metric === 'Impact') {
        obj[r.scenario] = Math.round(((r.impact / maxImpact) * 100) * SCALE_FACTOR);
      } else if (metric === 'Cost') {
        // invert cost so lower cost => higher score
        obj[r.scenario] = Math.round((((maxCost - r.cost) / maxCost) * 100) * SCALE_FACTOR);
      } else if (metric === 'ROI') {
        const roi = r.cost > 0 ? (r.impact / r.cost) * 100 : 0;
        obj[r.scenario] = Math.round(((roi / maxROI) * 100) * SCALE_FACTOR);
      }
    });
    return obj;
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const pts = payload[0].payload;
      return (
        <View style={styles.tooltipContainer}>
          <Text style={styles.tooltipTitle}>{pts.metric}</Text>
          {raw.map((r) => (
            <View key={r.scenario} style={styles.tooltipRow}>
              <Text style={styles.tooltipLabel}>Scenario {r.scenario}:</Text>
              <Text style={styles.tooltipValue}>{pts[r.scenario]} / 100</Text>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        {/* slightly larger chart but plotted values are scaled down so areas don't dominate */}
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData} outerRadius="75%">
            <PolarGrid stroke={THEME.surfaceAlt} />
            <PolarAngleAxis dataKey="metric" tick={{ fill: THEME.textSecondary }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: THEME.textSecondary }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" iconType="circle" />
            {raw.map((r, i) => (
              <Radar
                key={r.scenario}
                name={`Scenario ${r.scenario}`}
                dataKey={r.scenario}
                stroke={COLORS[i % COLORS.length]}
                fill={COLORS[i % COLORS.length]}
                fillOpacity={0.3}
                strokeWidth={2.5}
                isAnimationActive={true}
                animationDuration={900 + i * 220}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendHeader}>
          <Text style={styles.legendTitle}>Scenario Performance</Text>
          <Text style={styles.legendSubtitle}>Click points for detailed metrics</Text>
        </View>
        <View style={styles.scenarioList}>
          {raw.map((scenarioRaw, index) => (
            <View key={scenarioRaw.scenario} style={[styles.scenarioItem, scenarioRaw.efficiency > 88 && styles.optimalItem]}>
              <View style={[styles.colorIndicator, { backgroundColor: COLORS[index % COLORS.length] }]} />
              <View style={styles.scenarioInfo}>
                <View style={styles.scenarioHeader}>
                  <Text style={styles.scenarioLabel}>Scenario {scenarioRaw.scenario}</Text>
                  {scenarioRaw.efficiency > 88 && (
                    <View style={styles.optimalBadge}>
                      <Text style={styles.optimalBadgeText}>OPTIMAL</Text>
                    </View>
                  )}
                </View>
                <View style={styles.metricsRow}>
                  <Text style={styles.metricText}>Efficiency: <Text style={styles.metricValue}>{scenarioRaw.efficiency}%</Text></Text>
                  <Text style={styles.metricText}>ROI: <Text style={styles.metricValue}>{((scenarioRaw.impact / scenarioRaw.cost) * 100).toFixed(1)}%</Text></Text>
                </View>
                <View style={styles.metricsRow}>
                  <Text style={styles.metricTextSmall}>Cost: ${scenarioRaw.cost.toLocaleString()}</Text>
                  <Text style={styles.metricTextSmall}>Impact: {scenarioRaw.impact} units</Text>
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
    height: 320,
    marginBottom: 16,
  },
  tooltipContainer: {
    backgroundColor: THEME.surface,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
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
    color: THEME.textPrimary,
    marginBottom: 8,
  },
  tooltipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  tooltipLabel: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  tooltipValue: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textPrimary,
  },
  efficiencyHighlight: {
    color: THEME.accentBlue,
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
    color: THEME.textPrimary,
    marginBottom: 2,
  },
  legendSubtitle: {
    fontSize: 11,
    color: THEME.textSecondary,
    fontStyle: 'italic',
  },
  scenarioList: {
    gap: 10,
  },
  scenarioItem: {
    flexDirection: 'row',
    backgroundColor: THEME.surface,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
    gap: 12,
  },
  optimalItem: {
    backgroundColor: THEME.surfaceAlt,
    borderColor: THEME.accentBlue,
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
    color: THEME.textPrimary,
  },
  optimalBadge: {
    backgroundColor: THEME.accentBlue,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  optimalBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.textPrimary,
    letterSpacing: 0.5,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metricText: {
    fontSize: 12,
    color: THEME.textSecondary,
  },
  metricValue: {
    fontWeight: '700',
    color: THEME.textPrimary,
  },
  metricTextSmall: {
    fontSize: 11,
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
