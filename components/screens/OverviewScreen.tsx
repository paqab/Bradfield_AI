import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Users, Home, Sparkles, Zap, FolderKanban, ArrowRight } from 'lucide-react-native';
import InsightCard from '@/components/InsightCard';
import CommunityChart from '@/components/CommunityChart';
import EnhancedHousingChart from '@/components/EnhancedHousingChart';
import OptimisationChart from '@/components/OptimisationChart';
import { generateAISummaries } from '@/utils/mockData';
import { generateProjects } from '@/utils/mockProjects';
import { FONT_FAMILY } from '@/constants/fonts';

interface OverviewScreenProps {
  region: string;
}

export default function OverviewScreen({ region }: OverviewScreenProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaries, setSummaries] = useState<{
    community?: string;
    housing?: string;
    optimisation?: string;
  }>({});

  const handleGenerateInsights = () => {
    setIsGenerating(true);
    setSummaries({});

    setTimeout(() => {
      const newSummaries = generateAISummaries(region);
      setSummaries(newSummaries);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Dashboard Overview</Text>
          <Text style={styles.subtitle}>AI-powered insights for {region}</Text>
        </View>

        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateInsights}>
          <Zap size={18} color="#000000" />
          <Text style={styles.generateButtonText}>Generate Insights</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        <View style={styles.cardWrapper}>
          <InsightCard
            title="Community Sentiment"
            icon={<Users size={20} color="#87CEEB" />}
            isGenerating={isGenerating}
          >
            <CommunityChart summary={summaries.community} />
          </InsightCard>
        </View>

        <View style={styles.cardWrapperFull}>
          <InsightCard
            title="Housing Demand Forecast"
            icon={<Home size={20} color="#87CEEB" />}
            isGenerating={isGenerating}
          >
            <EnhancedHousingChart summary={summaries.housing} />
          </InsightCard>
        </View>

        <View style={styles.cardWrapperFull}>
          <InsightCard
            title="Optimisation Scenarios"
            icon={<Sparkles size={20} color="#87CEEB" />}
            isGenerating={isGenerating}
          >
            <OptimisationChart summary={summaries.optimisation} />
          </InsightCard>
        </View>

        {/* Projects Section */}
        <View style={styles.cardWrapperFull}>
          <InsightCard
            title="Active Projects"
            icon={<FolderKanban size={20} color="#87CEEB" />}
          >
            <View style={styles.projectsSection}>
              <Text style={styles.projectsSectionSubtitle}>
                Recent development proposals under review
              </Text>
              <View style={styles.projectsGrid}>
                {generateProjects()
                  .filter(p => p.status !== 'completed')
                  .slice(0, 3)
                  .map((project) => (
                    <TouchableOpacity key={project.id} style={styles.projectCard}>
                      {project.images && project.images.length > 0 && (
                        <Image
                          source={project.images[0]}
                          style={styles.projectImage}
                          resizeMode="cover"
                        />
                      )}
                      <View style={styles.projectCardContent}>
                        <Text style={styles.projectCardTitle} numberOfLines={2}>
                          {project.title}
                        </Text>
                        <Text style={styles.projectCardLocation}>{project.location}</Text>
                        <View style={styles.projectCardFooter}>
                          <View style={styles.projectCardStatus}>
                            <View 
                              style={[
                                styles.projectStatusDot,
                                { backgroundColor: project.status === 'approved' ? '#4CAF50' : project.status === 'in_development' ? '#2196F3' : '#FFC107' }
                              ]} 
                            />
                            <Text style={styles.projectCardStatusText}>
                              {project.status === 'under_review' ? 'Under Review' : project.status === 'approved' ? 'Approved' : 'In Development'}
                            </Text>
                          </View>
                          <Text style={styles.projectCardCost}>
                            ${(project.estimatedCost / 1000000).toFixed(1)}M
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllButtonText}>View All Projects</Text>
                <ArrowRight size={16} color="#87CEEB" />
              </TouchableOpacity>
            </View>
          </InsightCard>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.bold,
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    color: '#666666',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#87CEEB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  generateButtonText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.semiBold,
    color: '#000000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 32,
    paddingBottom: 32,
    gap: 24,
  },
  cardWrapper: {
    width: '48%',
  },
  cardWrapperFull: {
    width: '100%',
  },
  projectsSection: {
    minHeight: 200,
  },
  projectsSectionSubtitle: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.regular,
    color: '#666666',
    marginBottom: 20,
  },
  projectsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  projectCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  projectImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#E5E5E5',
  },
  projectCardContent: {
    padding: 12,
  },
  projectCardTitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#000000',
    marginBottom: 4,
    minHeight: 36,
  },
  projectCardLocation: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.regular,
    color: '#666666',
    marginBottom: 8,
  },
  projectCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectCardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  projectStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  projectCardStatusText: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.medium,
    color: '#666666',
  },
  projectCardCost: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#000000',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  viewAllButtonText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#87CEEB',
  },
});
