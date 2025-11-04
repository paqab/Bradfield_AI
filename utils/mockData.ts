export const generateCommunityData = () => [
  { category: 'Housing', positive: 68, negative: 32 },
  { category: 'Transport', positive: 45, negative: 55 },
  { category: 'Parks', positive: 82, negative: 18 },
  { category: 'Safety', positive: 54, negative: 46 },
  { category: 'Services', positive: 71, negative: 29 },
];

export const generateHousingData = () => [
  { month: 'Jan', demand: 2400, supply: 2200 },
  { month: 'Feb', demand: 2600, supply: 2300 },
  { month: 'Mar', demand: 2800, supply: 2400 },
  { month: 'Apr', demand: 3100, supply: 2500 },
  { month: 'May', demand: 3400, supply: 2600 },
  { month: 'Jun', demand: 3800, supply: 2700 },
];

export const generateOptimisationData = () => [
  { scenario: 'A', cost: 4000, impact: 240, efficiency: 85 },
  { scenario: 'B', cost: 3000, impact: 220, efficiency: 90 },
  { scenario: 'C', cost: 2000, impact: 180, efficiency: 78 },
  { scenario: 'D', cost: 5000, impact: 300, efficiency: 88 },
  { scenario: 'E', cost: 3500, impact: 260, efficiency: 92 },
];

export const generateAISummaries = (region: string) => {
  const summaries = {
    'Metro Region': {
      community: 'Analysis shows 68% positive sentiment on housing initiatives. Residents express strong support for mixed-use developments. Transport concerns require immediate attention with 55% negative feedback.',
      housing: 'Predicted 12% rise in housing demand over next 6 months for metro areas. Current supply growth at 8% annually suggests a widening gap. Recommend accelerating development approvals in designated growth zones.',
      optimisation: 'Scenario E offers optimal balance: 92% efficiency rating with moderate cost. Prioritise mixed-income housing clusters near transit hubs. Expected community impact: +260 units within 18 months.',
    },
    'Coastal Zone': {
      community: 'Coastal residents prioritise environmental protection (89% positive) and sustainable development. Housing affordability emerges as key concern with mixed sentiment patterns.',
      housing: 'Coastal demand surge projected at 18% due to lifestyle migration trends. Infrastructure capacity constraints limit supply response. Strategic densification near existing services recommended.',
      optimisation: 'Coastal scenarios favour low-impact, high-efficiency models. Scenario B delivers 90% efficiency with coastal-sensitive design. Phased development approach minimises ecological disruption.',
    },
    'Northern District': {
      community: 'Strong community cohesion evident (76% positive on social services). Growth acceptance high if infrastructure improvements are prioritised. Education and healthcare access critical.',
      housing: 'Northern expansion presents opportunity: 15% demand growth with available land. Strategic planning can achieve 95% supply-demand alignment by coordinating utilities and transport.',
      optimisation: 'District-wide optimisation suggests greenfield development corridors. Scenario D provides maximum impact (300 units) with integrated community facilities. Long-term sustainability rating: high.',
    },
    'Central Business District': {
      community: 'CBD stakeholders emphasise economic vitality (82% positive). Calls for pedestrian-friendly spaces and activation of underutilised areas. Nighttime economy support requested.',
      housing: 'CBD housing conversion potential: 22% increase achievable through adaptive reuse of commercial spaces. Target demographic: young professionals and downsizers. Premium pricing sustainable.',
      optimisation: 'Vertical integration scenarios perform best in CBD context. Mixed-use towers (residential over retail) show 94% viability. Scenario optimisation indicates 5-year delivery timeline.',
    },
  };

  return summaries[region as keyof typeof summaries] || summaries['Metro Region'];
};

export const getRandomInsight = (type: 'community' | 'housing' | 'optimisation') => {
  const insights = {
    community: [
      'Community engagement scores have increased by 23% this quarter',
      'Social media sentiment analysis reveals strong support for green infrastructure',
      'Public consultation participation reached record high of 12,000 responses',
    ],
    housing: [
      'Market analysis indicates shifting preferences toward mid-density housing',
      'First-home buyer activity up 34% in targeted affordability zones',
      'Construction approval timelines reduced by 28 days on average',
    ],
    optimisation: [
      'AI-optimised planning reduces infrastructure costs by 15-20%',
      'Predictive modelling accuracy improved to 94% for demand forecasting',
      'Multi-objective optimisation balances 12 competing stakeholder priorities',
    ],
  };

  const options = insights[type];
  return options[Math.floor(Math.random() * options.length)];
};
