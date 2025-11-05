import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Sparkles, Target, ChevronRight, Building2 } from 'lucide-react-native';
import InsightCard from '@/components/InsightCard';
import OptimisationChart from '@/components/OptimisationChart';
import ScenarioPredictionChart from '@/components/ScenarioPredictionChart';
import { generateProjects } from '@/utils/mockProjects';
import { getScenarioProjects, generateScenarioPredictions } from '@/utils/scenarioData';
import { FONT_FAMILY } from '@/constants/fonts';
import THEME from '@/constants/theme';

export default function OptimisationScreen() {
  const allProjects = generateProjects();
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
            icon={<Target size={20} color={THEME.accentBlue} />}
          >
            <OptimisationChart summary="Scenario E delivers optimal outcomes: 92% efficiency with balanced cost-impact ratio. Transit-oriented approach maximises accessibility and equity." />
          </InsightCard>
        </View>

        <View style={styles.scenariosSection}>
          <View style={styles.sectionHeader}>
            <Sparkles size={20} color={THEME.textPrimary} />
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

              {/* Prediction Chart */}
              <View style={styles.predictionSection}>
                <Text style={styles.predictionTitle}>24-Month Outcome Predictions</Text>
                <ScenarioPredictionChart 
                  scenarioId={scenario.id}
                  data={generateScenarioPredictions(scenario.id)}
                />
              </View>

              {/* Related Projects */}
              <View style={styles.projectsSection}>
                <View style={styles.projectsHeader}>
                  <Building2 size={16} color={THEME.muted} />
                  <Text style={styles.projectsTitle}>Related Projects</Text>
                </View>
                <View style={styles.projectsList}>
                  {getScenarioProjects(scenario.id, allProjects).map((project) => (
                    <TouchableOpacity key={project.id} style={styles.projectItem}>
                      {project.images && project.images.length > 0 && (
                        <Image
                          source={project.images[0]}
                          style={styles.projectItemImage}
                          resizeMode="cover"
                        />
                      )}
                      <View style={styles.projectItemContent}>
                        <Text style={styles.projectItemTitle} numberOfLines={1}>
                          {project.title}
                        </Text>
                        <Text style={styles.projectItemLocation}>{project.location}</Text>
                        <View style={styles.projectItemMeta}>
                          <Text style={styles.projectItemStatus}>
                            {project.status === 'under_review' ? 'Under Review' : project.status === 'approved' ? 'Approved' : project.status === 'in_development' ? 'In Development' : 'Completed'}
                          </Text>
                          <Text style={styles.projectItemCost}>
                            ${(project.estimatedCost / 1000000).toFixed(1)}M
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Full Analysis</Text>
                <ChevronRight size={16} color={THEME.accentBlue} />
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
    backgroundColor: THEME.background,
  },
  header: {
    padding: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: THEME.textSecondary,
  },
  content: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  chartSection: {
    marginBottom: 24,
  },
  scenariosSection: {
    backgroundColor: THEME.surface,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
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
    color: THEME.textPrimary,
  },
  scenarioCard: {
    padding: 20,
    backgroundColor: THEME.surface,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  scenarioBadge: {
    backgroundColor: THEME.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  scenarioBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.textPrimary,
    letterSpacing: 1,
  },
  optimalBadge: {
    backgroundColor: THEME.accentBlue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  optimalText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.textPrimary,
    letterSpacing: 1,
  },
  scenarioName: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.textPrimary,
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
    color: THEME.textSecondary,
    marginBottom: 6,
  },
  efficiencyBar: {
    height: 32,
    backgroundColor: THEME.surfaceAlt,
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
    backgroundColor: THEME.accentBlue,
  },
  efficiencyText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.textPrimary,
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
    color: THEME.textSecondary,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.textPrimary,
  },
  impactSection: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: THEME.surfaceAlt,
  },
  impactLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textSecondary,
    marginBottom: 4,
  },
  impactText: {
    fontSize: 14,
    color: THEME.textSecondary,
    lineHeight: 21,
  },
  recommendationSection: {
    backgroundColor: THEME.surfaceAlt,
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: THEME.accentPurple,
  },
  recommendationText: {
    fontSize: 13,
    color: THEME.textSecondary,
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
    color: THEME.accentBlue,
  },
  predictionSection: {
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: THEME.surfaceAlt,
  },
  predictionTitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.semiBold,
    color: THEME.textPrimary,
    marginBottom: 16,
  },
  projectsSection: {
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  projectsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  projectsTitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#000000',
  },
  projectsList: {
    gap: 12,
  },
  projectItem: {
    flexDirection: 'row',
    backgroundColor: THEME.surface,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
  },
  projectItemImage: {
    width: 80,
    height: 80,
    backgroundColor: THEME.surfaceAlt,
  },
  projectItemContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  projectItemTitle: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.semiBold,
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  projectItemLocation: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.regular,
    color: THEME.textSecondary,
    marginBottom: 6,
  },
  projectItemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectItemStatus: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.medium,
    color: THEME.textSecondary,
  },
  projectItemCost: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.semiBold,
    color: THEME.textPrimary,
  },
});
