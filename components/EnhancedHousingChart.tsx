import { View, Text, StyleSheet } from 'react-native';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ReferenceLine, ComposedChart, ScatterChart, Scatter, Cell } from 'recharts';
import { generateHousingData } from '@/utils/mockData';
import { generateHousingScatterData } from '@/utils/housingData';
import { FONT_FAMILY } from '@/constants/fonts';
import THEME from '@/constants/theme';

interface EnhancedHousingChartProps {
  summary?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const demand = payload.find((p: any) => p.dataKey === 'demand')?.value || 0;
    const supply = payload.find((p: any) => p.dataKey === 'supply')?.value || 0;
    const gap = demand - supply;
    const gapPercent = supply > 0 ? ((gap / supply) * 100).toFixed(1) : 0;

    return (
      <View style={styles.tooltipContainer}>
        <Text style={styles.tooltipTitle}>{label}</Text>
        <View style={styles.tooltipDivider} />
        <View style={styles.tooltipRow}>
          <View style={[styles.tooltipDot, { backgroundColor: '#87CEEB' }]} />
          <Text style={styles.tooltipLabel}>Demand:</Text>
          <Text style={[styles.tooltipValue, styles.demandColor]}>{demand.toLocaleString()}</Text>
        </View>
        <View style={styles.tooltipRow}>
          <View style={[styles.tooltipDot, { backgroundColor: '#F5F5DC' }]} />
          <Text style={styles.tooltipLabel}>Supply:</Text>
          <Text style={[styles.tooltipValue, styles.supplyColor]}>{supply.toLocaleString()}</Text>
        </View>
        <View style={styles.tooltipDivider} />
        <View style={styles.tooltipRow}>
          <Text style={styles.tooltipLabel}>Gap:</Text>
          <Text style={[styles.tooltipValue, gap > 0 ? styles.criticalGap : styles.positiveGap]}>
            {gap > 0 ? '+' : ''}{gap.toLocaleString()} ({gapPercent}%)
          </Text>
        </View>
      </View>
    );
  }
  return null;
};

const ScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <View style={styles.tooltipContainer}>
        <Text style={styles.tooltipTitle}>{data.zone}</Text>
        <View style={styles.tooltipDivider} />
        <View style={styles.tooltipRow}>
          <Text style={styles.tooltipLabel}>Affordability:</Text>
          <Text style={styles.tooltipValue}>{data.affordability}/100</Text>
        </View>
        <View style={styles.tooltipRow}>
          <Text style={styles.tooltipLabel}>Demand:</Text>
          <Text style={styles.tooltipValue}>{data.demand.toLocaleString()}</Text>
        </View>
        <View style={styles.tooltipRow}>
          <Text style={styles.tooltipLabel}>Supply:</Text>
          <Text style={styles.tooltipValue}>{data.supply.toLocaleString()}</Text>
        </View>
      </View>
    );
  }
  return null;
};

export default function EnhancedHousingChart({ summary }: EnhancedHousingChartProps) {
  const data = generateHousingData();
  const scatterData = generateHousingScatterData();
  
  // Calculate projections
  const lastData = data[data.length - 1];
  const projectedData = [
    { month: 'Jul', demand: Math.round(lastData.demand * 1.05), supply: Math.round(lastData.supply * 1.03), isProjected: true },
    { month: 'Aug', demand: Math.round(lastData.demand * 1.10), supply: Math.round(lastData.supply * 1.06), isProjected: true },
    { month: 'Sep', demand: Math.round(lastData.demand * 1.15), supply: Math.round(lastData.supply * 1.09), isProjected: true },
  ];
  
  const allData = [...data, ...projectedData];
  const avgGap = allData.reduce((sum, d) => sum + (d.demand - d.supply), 0) / allData.length;

  const COLORS = [THEME.accentBlue, THEME.accentBlue, THEME.accentPop, THEME.accentPurple, THEME.accentBlue, THEME.accentBlue, THEME.danger, THEME.success];

  return (
    <View style={styles.container}>
      {/* Main Trend Chart */}
      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Demand vs Supply Trends</Text>
        <View style={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={allData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={THEME.accentBlue} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={THEME.accentBlue} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={THEME.accentPurple} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={THEME.accentPurple} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={THEME.surfaceAlt} opacity={0.5} />
              <XAxis 
                dataKey="month" 
                stroke={THEME.textSecondary} 
                style={{ fontSize: 11 }}
                tick={{ fill: THEME.textSecondary }}
              />
              <YAxis 
                stroke={THEME.textSecondary} 
                style={{ fontSize: 11 }}
                label={{ value: 'Units', angle: -90, position: 'insideLeft', offset: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
                iconType="line"
              />
              <ReferenceLine 
                y={avgGap} 
                stroke={THEME.danger} 
                strokeDasharray="5 5" 
                opacity={0.5}
              />
              <Area
                type="monotone"
                dataKey="demand"
                stroke="none"
                fill="url(#demandGradient)"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="supply"
                stroke="none"
                fill="url(#supplyGradient)"
                fillOpacity={0.3}
              />
              <Line
                type="monotone"
                dataKey="demand"
                stroke={THEME.accentBlue}
                strokeWidth={3}
                dot={{ fill: THEME.accentBlue, r: 5, strokeWidth: 2, stroke: THEME.textPrimary }}
                activeDot={{ r: 7, strokeWidth: 2, stroke: THEME.textPrimary }}
                name="Demand"
              />
              <Line
                type="monotone"
                dataKey="supply"
                stroke={THEME.accentPurple}
                strokeWidth={3}
                dot={{ fill: THEME.accentPurple, r: 5, strokeWidth: 2, stroke: THEME.textPrimary }}
                activeDot={{ r: 7, strokeWidth: 2, stroke: THEME.textPrimary }}
                name="Supply"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </View>
      </View>

      {/* Metrics Row */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Current Gap</Text>
          <Text style={[styles.metricValue, styles.criticalGap]}>
            +{(lastData.demand - lastData.supply).toLocaleString()}
          </Text>
          <Text style={styles.metricSubtext}>units</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Projected Gap</Text>
          <Text style={[styles.metricValue, styles.criticalGap]}>
            +{(projectedData[2].demand - projectedData[2].supply).toLocaleString()}
          </Text>
          <Text style={styles.metricSubtext}>by Sep</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Growth Rate</Text>
          <Text style={[styles.metricValue, styles.demandColor]}>
            {((lastData.demand / data[0].demand - 1) * 100).toFixed(1)}%
          </Text>
          <Text style={styles.metricSubtext}>6 months</Text>
        </View>
      </View>

      {/* Scatter Plot */}
      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Zone Affordability vs Demand Analysis</Text>
        <Text style={styles.sectionSubtitle}>Market dynamics across different zones</Text>
        <View style={styles.chartWrapperSmall}>
          <ResponsiveContainer width="100%" height={240}>
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={THEME.surfaceAlt} opacity={0.5} />
              <XAxis
                type="number"
                dataKey="affordability"
                name="Affordability Index"
                stroke={THEME.textSecondary}
                style={{ fontSize: 11 }}
                label={{ value: 'Affordability Index', position: 'insideBottom', offset: -5 }}
                domain={[0, 100]}
              />
              <YAxis
                type="number"
                dataKey="demand"
                name="Demand (units)"
                stroke={THEME.textSecondary}
                style={{ fontSize: 11 }}
                label={{ value: 'Demand (units)', angle: -90, position: 'insideLeft', offset: 10 }}
              />
              <Tooltip content={<ScatterTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: 11, paddingTop: 10 }} 
                iconType="circle"
              />
              <Scatter
                name="Housing Zones"
                data={scatterData}
                fill={THEME.accentBlue}
              >
                {scatterData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    r={entry.demand > 3000 ? 8 : 6}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
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
  chartSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.semiBold,
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.regular,
    color: THEME.textSecondary,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  chartWrapper: {
    height: 280,
    marginBottom: 20,
  },
  chartWrapperSmall: {
    height: 240,
    marginBottom: 20,
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
    fontFamily: FONT_FAMILY.bold,
    color: THEME.textPrimary,
    marginBottom: 8,
  },
  tooltipDivider: {
    height: 1,
    backgroundColor: THEME.surfaceAlt,
    marginVertical: 6,
  },
  tooltipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  tooltipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tooltipLabel: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.regular,
    color: THEME.textSecondary,
    flex: 1,
  },
  tooltipValue: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.semiBold,
    color: THEME.textPrimary,
  },
  demandColor: {
    color: THEME.accentBlue,
  },
  supplyColor: {
    color: THEME.accentPurple,
  },
  criticalGap: {
    color: THEME.danger,
  },
  positiveGap: {
    color: THEME.success,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: THEME.surface,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.regular,
    color: THEME.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.bold,
    color: THEME.textPrimary,
    marginBottom: 2,
  },
  metricSubtext: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.regular,
    color: THEME.textSecondary,
    textAlign: 'center',
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
    fontFamily: FONT_FAMILY.bold,
    color: THEME.textPrimary,
    letterSpacing: 1,
  },
  summaryText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    lineHeight: 21,
    color: THEME.textSecondary,
  },
});

