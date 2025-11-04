import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Sparkles, Target, ChevronRight } from 'lucide-react-native';
import InsightCard from '@/components/InsightCard';
import OptimisationChart from '@/components/OptimisationChart';

export default function OptimisationScreen() {
  const scenarios = [
    {
      id: 'A',
      name: 'High-Density Urban Core',
      efficiency: 85,
      cost: 'High',
      timeline: '24 months',
      impact: 'Maximum density near transit',
      recommendation: 'Suitable for established urban centers',
    },
    {
      id: 'B',
      name: 'Coastal Conservation Model',
      efficiency: 90,
      cost: 'Medium',
      timeline: '18 months',
      impact: 'Balanced growth with environmental protection',
      recommendation: 'Recommended for sensitive coastal zones',
    },
    {
      id: 'C',
      name: 'Suburban Infill Strategy',
      efficiency: 78,
      cost: 'Low',
      timeline: '12 months',
      impact: 'Gradual densification of existing suburbs',
      recommendation: 'Quick wins for capacity constraints',
    },
    {
      id: 'D',
      name: 'Greenfield Expansion',
      efficiency: 88,
      cost: 'Very High',
      timeline: '36 months',
      impact: 'New complete communities with infrastructure',
      recommendation: 'Long-term growth areas',
    },
    {
      id: 'E',
      name: 'Mixed-Income Transit Villages',
      efficiency: 92,
      cost: 'Medium-High',
      timeline: '18 months',
      impact: 'Equitable, transit-oriented development',
      recommendation: 'Best overall balance - OPTIMAL',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Optimisation Scenarios</Text>
        <Text style={styles.subtitle}>AI-generated planning alternatives with multi-objective analysis</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.chartSection}>
          <InsightCard
            title="Scenario Performance Matrix"
            icon={<Target size={20} color="#87CEEB" />}
          >
            <OptimisationChart summary="Scenario E delivers optimal outcomes: 92% efficiency with balanced cost-impact ratio. Transit-oriented approach maximises accessibility and equity." />
          </InsightCard>
        </View>

        <View style={styles.scenariosSection}>
          <View style={styles.sectionHeader}>
            <Sparkles size={20} color="#000000" />
            <Text style={styles.sectionTitle}>Detailed Scenario Analysis</Text>
          </View>

          {scenarios.map((scenario) => (
            <View key={scenario.id} style={styles.scenarioCard}>
              <View style={styles.scenarioHeader}>
                <View style={styles.scenarioBadge}>
                  <Text style={styles.scenarioBadgeText}>Scenario {scenario.id}</Text>
                </View>
                {scenario.id === 'E' && (
                  <View style={styles.optimalBadge}>
                    <Text style={styles.optimalText}>OPTIMAL</Text>
                  </View>
                )}
              </View>

              <Text style={styles.scenarioName}>{scenario.name}</Text>

              <View style={styles.scenarioMetrics}>
                <View style={styles.scenarioMetric}>
                  <Text style={styles.metricLabel}>Efficiency</Text>
                  <View style={styles.efficiencyBar}>
                    <View style={[styles.efficiencyFill, { width: `${scenario.efficiency}%` }]} />
                    <Text style={styles.efficiencyText}>{scenario.efficiency}%</Text>
                  </View>
                </View>

                <View style={styles.scenarioDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Cost:</Text>
                    <Text style={styles.detailValue}>{scenario.cost}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Timeline:</Text>
                    <Text style={styles.detailValue}>{scenario.timeline}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.impactSection}>
                <Text style={styles.impactLabel}>Expected Impact:</Text>
                <Text style={styles.impactText}>{scenario.impact}</Text>
              </View>

              <View style={styles.recommendationSection}>
                <Text style={styles.recommendationText}>{scenario.recommendation}</Text>
              </View>

              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Full Analysis</Text>
                <ChevronRight size={16} color="#87CEEB" />
              </TouchableOpacity>
            </View>
          ))}
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
  scenariosSection: {
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
  scenarioCard: {
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  scenarioBadge: {
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  scenarioBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  optimalBadge: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  optimalText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
  },
  scenarioName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  scenarioMetrics: {
    marginBottom: 16,
  },
  scenarioMetric: {
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 6,
  },
  efficiencyBar: {
    height: 32,
    backgroundColor: '#E5E5E5',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  efficiencyFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#87CEEB',
  },
  efficiencyText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    zIndex: 1,
  },
  scenarioDetails: {
    flexDirection: 'row',
    gap: 24,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666666',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  impactSection: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  impactLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 4,
  },
  impactText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 21,
  },
  recommendationSection: {
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#F5F5DC',
  },
  recommendationText: {
    fontSize: 13,
    color: '#333333',
    fontStyle: 'italic',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#87CEEB',
  },
});
