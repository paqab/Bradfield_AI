import { View, Text, StyleSheet } from 'react-native';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { FONT_FAMILY } from '@/constants/fonts';

interface HousingScatterChartProps {
  data: {
    affordability: number;
    demand: number;
    zone: string;
    supply: number;
  }[];
}

const COLORS = ['#87CEEB', '#4682B4', '#5F9EA0', '#20B2AA', '#00CED1', '#1E90FF', '#FF6B6B', '#4CAF50'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <View style={styles.tooltipContainer}>
        <Text style={styles.tooltipTitle}>{data.zone}</Text>
        <View style={styles.tooltipDivider} />
        <View style={styles.tooltipRow}>
          <Text style={styles.tooltipLabel}>Affordability Index:</Text>
          <Text style={styles.tooltipValue}>{data.affordability}/100</Text>
        </View>
        <View style={styles.tooltipRow}>
          <Text style={styles.tooltipLabel}>Demand:</Text>
          <Text style={styles.tooltipValue}>{data.demand.toLocaleString()} units</Text>
        </View>
        <View style={styles.tooltipRow}>
          <Text style={styles.tooltipLabel}>Supply:</Text>
          <Text style={styles.tooltipValue}>{data.supply.toLocaleString()} units</Text>
        </View>
        <View style={styles.tooltipRow}>
          <Text style={styles.tooltipLabel}>Gap:</Text>
          <Text style={[styles.tooltipValue, styles.criticalGap]}>
            +{(data.demand - data.supply).toLocaleString()}
          </Text>
        </View>
      </View>
    );
  }
  return null;
};

export default function HousingScatterChart({ data }: HousingScatterChartProps) {
  const avgAffordability = data.reduce((sum, d) => sum + d.affordability, 0) / data.length;
  const avgDemand = data.reduce((sum, d) => sum + d.demand, 0) / data.length;

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Affordability vs Demand Analysis</Text>
      <Text style={styles.chartSubtitle}>Each point represents a zone's housing market dynamics</Text>
      <View style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={240}>
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" opacity={0.5} />
            <XAxis
              type="number"
              dataKey="affordability"
              name="Affordability Index"
              stroke="#666666"
              style={{ fontSize: 11 }}
              label={{ value: 'Affordability Index', position: 'insideBottom', offset: -5 }}
              domain={[0, 100]}
            />
            <YAxis
              type="number"
              dataKey="demand"
              name="Demand (units)"
              stroke="#666666"
              style={{ fontSize: 11 }}
              label={{ value: 'Demand (units)', angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: 11, paddingTop: 10 }} 
              iconType="circle"
            />
            <ReferenceLine x={avgAffordability} stroke="#87CEEB" strokeDasharray="5 5" opacity={0.5} />
            <ReferenceLine y={avgDemand} stroke="#87CEEB" strokeDasharray="5 5" opacity={0.5} />
            <Scatter
              name="Housing Zones"
              data={data}
              fill="#87CEEB"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  r={entry.demand > avgDemand ? 8 : 6}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartTitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#000000',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.regular,
    color: '#666666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  chartWrapper: {
    height: 240,
    marginBottom: 12,
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
    fontFamily: FONT_FAMILY.bold,
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
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  tooltipLabel: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.regular,
    color: '#666666',
  },
  tooltipValue: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#000000',
  },
  criticalGap: {
    color: '#DC3545',
  },
});

