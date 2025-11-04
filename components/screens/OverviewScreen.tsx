import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Users, Home, Sparkles, Zap } from 'lucide-react-native';
import InsightCard from '@/components/InsightCard';
import CommunityChart from '@/components/CommunityChart';
import HousingChart from '@/components/HousingChart';
import OptimisationChart from '@/components/OptimisationChart';
import { generateAISummaries } from '@/utils/mockData';

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

        <View style={styles.cardWrapper}>
          <InsightCard
            title="Housing Demand Forecast"
            icon={<Home size={20} color="#87CEEB" />}
            isGenerating={isGenerating}
          >
            <HousingChart summary={summaries.housing} />
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
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
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
});
