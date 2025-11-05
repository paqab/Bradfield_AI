export interface HousingZoneData {
  zone: string;
  affordability: number;
  demand: number;
  supply: number;
  priceGrowth: number;
  populationGrowth: number;
}

export const generateHousingScatterData = (): HousingZoneData[] => [
  { zone: 'Metro Central', affordability: 45, demand: 3800, supply: 2700, priceGrowth: 8.5, populationGrowth: 12 },
  { zone: 'Coastal Areas', affordability: 35, demand: 4200, supply: 2500, priceGrowth: 12.3, populationGrowth: 18 },
  { zone: 'Northern District', affordability: 65, demand: 2800, supply: 2600, priceGrowth: 5.2, populationGrowth: 15 },
  { zone: 'Riverside District', affordability: 55, demand: 3200, supply: 2900, priceGrowth: 7.1, populationGrowth: 10 },
  { zone: 'Highland Park', affordability: 70, demand: 2400, supply: 2400, priceGrowth: 4.8, populationGrowth: 8 },
  { zone: 'Industrial Belt', affordability: 80, demand: 1800, supply: 2100, priceGrowth: 3.2, populationGrowth: 6 },
  { zone: 'CBD', affordability: 25, demand: 4500, supply: 2200, priceGrowth: 15.5, populationGrowth: 20 },
  { zone: 'Elm Street District', affordability: 58, demand: 3000, supply: 2800, priceGrowth: 6.5, populationGrowth: 11 },
];

