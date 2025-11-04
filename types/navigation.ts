export type NavigationSection = 'overview' | 'community' | 'housing' | 'optimisation';

export interface NavigationItem {
  id: NavigationSection;
  label: string;
  icon: string;
}
