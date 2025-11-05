import { View, Text, StyleSheet } from 'react-native';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ComposedChart, Bar, BarChart } from 'recharts';
import { FONT_FAMILY } from '@/constants/fonts';
import THEME from '@/constants/theme';

interface ScenarioPredictionChartProps {
  scenarioId: string;
  data: {
    month: string;
    populationImpact: number;
    economicGrowth: number;
    environmentalScore: number;
    approvalRating: number;
    costEfficiency: number;
  }[];
}

export default function ScenarioPredictionChart({ scenarioId, data }: ScenarioPredictionChartProps) {
  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="populationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={THEME.accentBlue} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={THEME.accentBlue} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="economicGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={THEME.success} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={THEME.success} stopOpacity={0}/>
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
              yAxisId="left"
              stroke={THEME.textSecondary} 
              style={{ fontSize: 11 }}
              label={{ value: 'Score', angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke={THEME.textSecondary} 
              style={{ fontSize: 11 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: THEME.surface,
                border: `1px solid ${THEME.surfaceAlt}`,
                borderRadius: 8,
                fontSize: 12,
                fontFamily: FONT_FAMILY.regular,
                color: THEME.textPrimary,
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: 11, paddingTop: 10, color: THEME.textSecondary }}
              iconType="line"
            />
            {/* Area fills */}
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="populationImpact"
              stroke="none"
              fill="url(#populationGradient)"
              fillOpacity={0.3}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="economicGrowth"
              stroke="none"
              fill="url(#economicGradient)"
              fillOpacity={0.3}
            />
            {/* Lines */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="populationImpact"
              stroke={THEME.accentBlue}
              strokeWidth={2}
              dot={{ fill: THEME.accentBlue, r: 4 }}
              name="Population Impact"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="economicGrowth"
              stroke={THEME.success}
              strokeWidth={2}
              dot={{ fill: THEME.success, r: 4 }}
              name="Economic Growth"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="environmentalScore"
              stroke={THEME.accentPop}
              strokeWidth={2}
              dot={{ fill: THEME.accentPop, r: 4 }}
              name="Environmental"
            />
            {/* Bar for approval rating */}
            <Bar
              yAxisId="right"
              dataKey="approvalRating"
              fill={THEME.warning}
              opacity={0.6}
              name="Approval %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </View>
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
});

