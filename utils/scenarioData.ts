import { Project } from './mockProjects';

export interface ScenarioProjectData {
  scenarioId: string;
  projects: Project[];
  predictions: {
    month: string;
    populationImpact: number;
    economicGrowth: number;
    environmentalScore: number;
    approvalRating: number;
    costEfficiency: number;
  }[];
}

export const getScenarioProjects = (scenarioId: string, allProjects: Project[]): Project[] => {
  // Map scenarios to relevant project categories
  const scenarioProjectMap: Record<string, string[]> = {
    'A': ['Healthcare', 'Infrastructure'], // High-Density Urban Core
    'B': ['Infrastructure', 'Public Services'], // Coastal Conservation Model
    'C': ['Housing', 'Transport'], // Suburban Infill Strategy
    'D': ['Housing', 'Infrastructure', 'Education'], // Greenfield Expansion
    'E': ['Housing', 'Transport', 'Public Services'], // Mixed-Income Transit Villages
  };

  const categories = scenarioProjectMap[scenarioId] || [];
  return allProjects.filter(p => categories.includes(p.category)).slice(0, 3);
};

export const generateScenarioPredictions = (scenarioId: string) => {
  const basePredictions = {
    'A': {
      base: { populationImpact: 65, economicGrowth: 70, environmentalScore: 60, approvalRating: 72, costEfficiency: 75 },
      trend: { populationImpact: 0.8, economicGrowth: 0.9, environmentalScore: 0.5, approvalRating: 0.6, costEfficiency: 0.7 },
    },
    'B': {
      base: { populationImpact: 75, economicGrowth: 68, environmentalScore: 95, approvalRating: 88, costEfficiency: 85 },
      trend: { populationImpact: 0.7, economicGrowth: 0.6, environmentalScore: 0.2, approvalRating: 0.5, costEfficiency: 0.8 },
    },
    'C': {
      base: { populationImpact: 55, economicGrowth: 62, environmentalScore: 70, approvalRating: 65, costEfficiency: 82 },
      trend: { populationImpact: 0.6, economicGrowth: 0.7, environmentalScore: 0.6, approvalRating: 0.7, costEfficiency: 0.9 },
    },
    'D': {
      base: { populationImpact: 85, economicGrowth: 80, environmentalScore: 75, approvalRating: 78, costEfficiency: 70 },
      trend: { populationImpact: 1.0, economicGrowth: 1.1, environmentalScore: 0.8, approvalRating: 0.8, costEfficiency: 0.6 },
    },
    'E': {
      base: { populationImpact: 90, economicGrowth: 85, environmentalScore: 88, approvalRating: 92, costEfficiency: 90 },
      trend: { populationImpact: 0.9, economicGrowth: 0.95, environmentalScore: 0.7, approvalRating: 0.9, costEfficiency: 0.95 },
    },
  };

  const config = basePredictions[scenarioId as keyof typeof basePredictions] || basePredictions['E'];
  const months = ['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12', 'Month 18', 'Month 24'];

  return months.map((month, index) => {
    const monthNum = index + 1;
    return {
      month,
      populationImpact: Math.min(100, Math.round(config.base.populationImpact + (config.trend.populationImpact * monthNum * 2))),
      economicGrowth: Math.min(100, Math.round(config.base.economicGrowth + (config.trend.economicGrowth * monthNum * 2))),
      environmentalScore: Math.min(100, Math.round(config.base.environmentalScore + (config.trend.environmentalScore * monthNum * 1.5))),
      approvalRating: Math.min(100, Math.round(config.base.approvalRating + (config.trend.approvalRating * monthNum * 1.2))),
      costEfficiency: Math.min(100, Math.round(config.base.costEfficiency + (config.trend.costEfficiency * monthNum * 1.8))),
    };
  });
};

