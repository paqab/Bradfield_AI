export type ProjectCategory = 'Healthcare' | 'Education' | 'Transport' | 'Infrastructure' | 'Housing' | 'Public Services';
export type ProjectStatus = 'under_review' | 'approved' | 'in_development' | 'completed' | 'rejected';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  description: string;
  developer: string;
  location: string;
  submittedDate: string;
  reviewProgress: number; // 0-100
  communitySupport: number; // 0-100 percentage
  estimatedCost: number;
  estimatedCompletion: string;
  impactScore: number; // 0-100
  images?: any[]; // Image source from require()
}

export const generateProjects = (): Project[] => [
  {
    id: '1',
    title: 'Metro Central Hospital Expansion',
    category: 'Healthcare',
    status: 'in_development',
    description: 'Comprehensive expansion of Metro Central Hospital to include a new emergency wing, 200 additional beds, and advanced surgical facilities. The project aims to serve the growing population in the metro region and improve healthcare accessibility.',
    developer: 'Urban Health Partners',
    location: 'Metro Central',
    submittedDate: '2024-01-15',
    reviewProgress: 85,
    communitySupport: 92,
    estimatedCost: 45000000,
    estimatedCompletion: '2026-Q2',
    impactScore: 95,
    images: [require('../assets/arcgis-urban-urban-planning-banner.jpg')],
  },
  {
    id: '2',
    title: 'Riverside District Primary School',
    category: 'Education',
    status: 'approved',
    description: 'New state-of-the-art primary school facility designed to accommodate 500 students. Features modern classrooms, science labs, sports facilities, and eco-friendly design with solar panels and rainwater harvesting systems.',
    developer: 'EduBuild Consortium',
    location: 'Riverside District',
    submittedDate: '2024-02-20',
    reviewProgress: 100,
    communitySupport: 88,
    estimatedCost: 18000000,
    estimatedCompletion: '2025-Q4',
    impactScore: 88,
    images: [require('../assets/mohit-kumar-615313-unsplash.jpg')],
  },
  {
    id: '3',
    title: 'Northern Transit Corridor',
    category: 'Transport',
    status: 'under_review',
    description: 'Development of a new rapid transit corridor connecting northern suburbs to CBD. Includes 15km of dedicated bus lanes, 8 new stations, and integration with existing rail network. Expected to reduce commute times by 40%.',
    developer: 'Transport Solutions Ltd',
    location: 'Northern District',
    submittedDate: '2024-03-10',
    reviewProgress: 45,
    communitySupport: 76,
    estimatedCost: 120000000,
    estimatedCompletion: '2027-Q1',
    impactScore: 82,
    images: [require('../assets/atlbeltmap3.jpg')],
  },
  {
    id: '4',
    title: 'Coastal Community Center',
    category: 'Public Services',
    status: 'under_review',
    description: 'Multi-purpose community center featuring recreational facilities, meeting spaces, senior services, and youth programs. Designed as a hub for community engagement and social activities.',
    developer: 'Community Builders Inc',
    location: 'Coastal Zone',
    submittedDate: '2024-03-25',
    reviewProgress: 30,
    communitySupport: 94,
    estimatedCost: 8500000,
    estimatedCompletion: '2025-Q3',
    impactScore: 90,
    images: [require('../assets/Coastal-Development-Affect-Marine-Life-And-Habitats-1024x512.png')],
  },
  {
    id: '5',
    title: 'Green Energy Infrastructure Hub',
    category: 'Infrastructure',
    status: 'approved',
    description: 'Comprehensive renewable energy infrastructure including solar farms, wind turbines, and battery storage facilities. Will provide 25% of metro region\'s energy needs and reduce carbon emissions significantly.',
    developer: 'GreenPower Solutions',
    location: 'Metro Region',
    submittedDate: '2024-01-08',
    reviewProgress: 100,
    communitySupport: 85,
    estimatedCost: 95000000,
    estimatedCompletion: '2026-Q3',
    impactScore: 93,
    images: [require('../assets/Parametric-Design-in-Urban-Planning-2-scaled.webp')],
  },
  {
    id: '6',
    title: 'Affordable Housing Complex - Highland Park',
    category: 'Housing',
    status: 'in_development',
    description: 'Mixed-income housing development with 350 units, 40% designated as affordable housing. Includes community gardens, playground, and proximity to public transport. Focus on sustainable construction practices.',
    developer: 'Housing Development Group',
    location: 'Highland Park',
    submittedDate: '2023-11-12',
    reviewProgress: 95,
    communitySupport: 79,
    estimatedCost: 55000000,
    estimatedCompletion: '2025-Q2',
    impactScore: 87,
    images: [require('../assets/Milstein.jpg')],
  },
  {
    id: '7',
    title: 'CBD Pedestrian Bridge Network',
    category: 'Infrastructure',
    status: 'under_review',
    description: 'Network of elevated pedestrian bridges connecting key CBD areas, improving walkability and reducing traffic congestion. Includes 5 bridges with weather protection and accessibility features.',
    developer: 'Urban Infrastructure Co',
    location: 'Central Business District',
    submittedDate: '2024-04-05',
    reviewProgress: 55,
    communitySupport: 68,
    estimatedCost: 22000000,
    estimatedCompletion: '2026-Q1',
    impactScore: 75,
    images: [require('../assets/planning-new-city-engineerarchitect-drawing-600nw-2080464259.webp')],
  },
  {
    id: '8',
    title: 'Riverside Medical Clinic',
    category: 'Healthcare',
    status: 'completed',
    description: 'New community medical clinic providing primary healthcare services, urgent care, and preventive medicine programs. Serves 15,000+ residents with extended hours and telehealth capabilities.',
    developer: 'Health Services Network',
    location: 'Riverside District',
    submittedDate: '2023-06-18',
    reviewProgress: 100,
    communitySupport: 91,
    estimatedCost: 6500000,
    estimatedCompletion: '2024-Q1',
    impactScore: 89,
    images: [require('../assets/download.jpeg')],
  },
  {
    id: '9',
    title: 'Metro High School Modernization',
    category: 'Education',
    status: 'approved',
    description: 'Complete modernization of Metro High School including new science labs, technology centers, performing arts facilities, and athletic upgrades. Enhanced accessibility and energy efficiency improvements.',
    developer: 'Educational Facilities Group',
    location: 'Metro Central',
    submittedDate: '2024-02-28',
    reviewProgress: 100,
    communitySupport: 83,
    estimatedCost: 32000000,
    estimatedCompletion: '2026-Q1',
    impactScore: 86,
    images: [require('../assets/McGregor-Coxall-3-jpg.webp')],
  },
  {
    id: '10',
    title: 'Bike Path Network Expansion',
    category: 'Transport',
    status: 'in_development',
    description: 'Expansion of protected bike path network adding 50km of dedicated cycling infrastructure. Includes bike parking facilities, repair stations, and integration with public transit hubs.',
    developer: 'Sustainable Transport Alliance',
    location: 'Citywide',
    submittedDate: '2023-12-05',
    reviewProgress: 90,
    communitySupport: 87,
    estimatedCost: 15000000,
    estimatedCompletion: '2025-Q1',
    impactScore: 84,
    images: [require('../assets/_u9tR5j3tCTDsryVVH6XHIEEakdtrewFHXp-f6d5bZI.jpg')],
  },
];

export const getCategoryColor = (category: ProjectCategory): string => {
  const colors: Record<ProjectCategory, string> = {
    Healthcare: '#E8F5E9',
    Education: '#E3F2FD',
    Transport: '#FFF3E0',
    Infrastructure: '#F3E5F5',
    Housing: '#FCE4EC',
    'Public Services': '#E0F2F1',
  };
  return colors[category] || '#F5F5F5';
};

export const getCategoryTextColor = (category: ProjectCategory): string => {
  const colors: Record<ProjectCategory, string> = {
    Healthcare: '#2E7D32',
    Education: '#1565C0',
    Transport: '#E65100',
    Infrastructure: '#6A1B9A',
    Housing: '#C2185B',
    'Public Services': '#00695C',
  };
  return colors[category] || '#333333';
};

export const getStatusLabel = (status: ProjectStatus): string => {
  const labels: Record<ProjectStatus, string> = {
    under_review: 'Under Review',
    approved: 'Approved',
    in_development: 'In Development',
    completed: 'Completed',
    rejected: 'Rejected',
  };
  return labels[status];
};

export const getStatusColor = (status: ProjectStatus): string => {
  const colors: Record<ProjectStatus, string> = {
    under_review: '#FFC107',
    approved: '#4CAF50',
    in_development: '#2196F3',
    completed: '#9E9E9E',
    rejected: '#F44336',
  };
  return colors[status];
};

