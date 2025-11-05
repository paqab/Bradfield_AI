import { View, Text, StyleSheet } from 'react-native';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ReferenceLine, ComposedChart } from 'recharts';
import { generateHousingData } from '@/utils/mockData';

interface HousingChartProps {
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

export default function HousingChart({ summary }: HousingChartProps) {
  const data = generateHousingData();
  
  // Calculate projections for next 3 months
  const lastData = data[data.length - 1];
  const projectedData = [
    { month: 'Jul', demand: Math.round(lastData.demand * 1.05), supply: Math.round(lastData.supply * 1.03), isProjected: true },
    { month: 'Aug', demand: Math.round(lastData.demand * 1.10), supply: Math.round(lastData.supply * 1.06), isProjected: true },
    { month: 'Sep', demand: Math.round(lastData.demand * 1.15), supply: Math.round(lastData.supply * 1.09), isProjected: true },
  ];
  
  const allData = [...data, ...projectedData];
  const avgGap = allData.reduce((sum, d) => sum + (d.demand - d.supply), 0) / allData.length;

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={allData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#87CEEB" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#87CEEB" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F5F5DC" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F5F5DC" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" opacity={0.5} />
            <XAxis 
              dataKey="month" 
              stroke="#666666" 
              style={{ fontSize: 11 }}
              tick={{ fill: '#666666' }}
            />
            <YAxis 
              stroke="#666666" 
              style={{ fontSize: 11 }}
              tick={{ fill: '#666666' }}
              label={{ value: 'Units', angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
              iconType="line"
            />
            <ReferenceLine 
              y={avgGap} 
              stroke="#FF6B6B" 
              strokeDasharray="5 5" 
              opacity={0.5}
              label={{ value: 'Avg Gap', position: 'right', fill: '#FF6B6B', fontSize: 10 }}
            />
            {/* Area fills for visual depth */}
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
            {/* Demand line */}
            <Line
              type="monotone"
              dataKey="demand"
              stroke="#87CEEB"
              strokeWidth={3}
              dot={{ fill: '#87CEEB', r: 5, strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: '#FFFFFF' }}
              name="Demand"
            />
            {/* Supply line */}
            <Line
              type="monotone"
              dataKey="supply"
              stroke="#F5F5DC"
              strokeWidth={3}
              dot={{ fill: '#F5F5DC', r: 5, strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: '#FFFFFF' }}
              name="Supply"
            />
            {/* Projected lines with different styling */}
            {projectedData.map((item, index) => (
              <ReferenceLine
                key={`projected-${index}`}
                x={item.month}
                stroke="#999999"
                strokeDasharray="2 2"
                opacity={0.3}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </View>

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
  tooltipDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
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
    color: '#666666',
    flex: 1,
  },
  tooltipValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },
  demandColor: {
    color: '#87CEEB',
  },
  supplyColor: {
    color: '#F5F5DC',
  },
  criticalGap: {
    color: '#DC3545',
  },
  positiveGap: {
    color: '#28A745',
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 4,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  metricSubtext: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
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
