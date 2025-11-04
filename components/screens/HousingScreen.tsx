import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Home, TrendingUp, Building2 } from 'lucide-react-native';
import InsightCard from '@/components/InsightCard';
import HousingChart from '@/components/HousingChart';

export default function HousingScreen() {
  const predictions = [
    { zone: 'Coastal Areas', demand: '+18%', supply: '+8%', gap: '10%', status: 'critical' },
    { zone: 'Metro Central', demand: '+12%', supply: '+11%', gap: '1%', status: 'balanced' },
    { zone: 'Northern District', demand: '+15%', supply: '+14%', gap: '1%', status: 'balanced' },
    { zone: 'Industrial Belt', demand: '+6%', supply: '+9%', gap: '-3%', status: 'surplus' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Predictive Housing</Text>
        <Text style={styles.subtitle}>AI-driven demand forecasting and supply analysis</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.chartSection}>
          <InsightCard
            title="Demand vs Supply Trends"
            icon={<TrendingUp size={20} color="#87CEEB" />}
          >
            <HousingChart summary="Housing demand outpacing supply growth by 4% on average. Targeted interventions recommended for coastal and metro zones." />
          </InsightCard>
        </View>

        <View style={styles.predictionsSection}>
          <View style={styles.sectionHeader}>
            <Building2 size={20} color="#000000" />
            <Text style={styles.sectionTitle}>Regional Predictions (Next 6 Months)</Text>
          </View>

          <View style={styles.predictionGrid}>
            {predictions.map((pred) => (
              <View key={pred.zone} style={styles.predictionCard}>
                <View style={styles.predictionHeader}>
                  <Home size={18} color="#87CEEB" />
                  <Text style={styles.zoneName}>{pred.zone}</Text>
                </View>

                <View style={styles.metrics}>
                  <View style={styles.metric}>
                    <Text style={styles.metricLabel}>Demand Growth</Text>
                    <Text style={[styles.metricValue, styles.demandValue]}>{pred.demand}</Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={styles.metricLabel}>Supply Growth</Text>
                    <Text style={[styles.metricValue, styles.supplyValue]}>{pred.supply}</Text>
                  </View>
                  <View style={styles.metric}>
                    <Text style={styles.metricLabel}>Gap</Text>
                    <Text style={[styles.metricValue, pred.status === 'critical' ? styles.critical : styles.balanced]}>
                      {pred.gap}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    pred.status === 'critical' && styles.criticalBadge,
                    pred.status === 'balanced' && styles.balancedBadge,
                    pred.status === 'surplus' && styles.surplus,
                  ]}
                >
                  <Text style={styles.statusText}>
                    {pred.status === 'critical' ? 'Action Required' : pred.status === 'balanced' ? 'On Track' : 'Oversupply'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  content: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  chartSection: {
    marginBottom: 24,
  },
  predictionsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  predictionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  predictionCard: {
    width: '48%',
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  metrics: {
    marginBottom: 16,
  },
  metric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 13,
    color: '#666666',
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  demandValue: {
    color: '#87CEEB',
  },
  supplyValue: {
    color: '#F5F5DC',
  },
  critical: {
    color: '#DC3545',
  },
  balanced: {
    color: '#28A745',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  criticalBadge: {
    backgroundColor: '#FFE5E5',
  },
  balancedBadge: {
    backgroundColor: '#D4F4DD',
  },
  surplus: {
    backgroundColor: '#E8F5E9',
  },
});
