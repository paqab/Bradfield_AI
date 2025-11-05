export type NavigationSection = 'overview' | 'community' | 'housing' | 'optimisation' | 'projects';

export interface NavigationItem {
  id: NavigationSection;
  label: string;
  icon: string;
}
