import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import OverviewScreen from '@/components/screens/OverviewScreen';
import CommunityScreen from '@/components/screens/CommunityScreen';
import HousingScreen from '@/components/screens/HousingScreen';
import OptimisationScreen from '@/components/screens/OptimisationScreen';
import ProjectsScreen from '@/components/screens/ProjectsScreen';
import { NavigationSection } from '@/types/navigation';

export default function Index() {
  const [activeSection, setActiveSection] = useState<NavigationSection>('overview');
  const [region, setRegion] = useState('Metro Region');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewScreen region={region} />;
      case 'community':
        return <CommunityScreen />;
      case 'housing':
        return <HousingScreen />;
      case 'optimisation':
        return <OptimisationScreen />;
      case 'projects':
        return <ProjectsScreen />;
      default:
        return <OverviewScreen region={region} />;
    }
  };

  return (
    <View style={styles.container}>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <View style={styles.main}>
        <TopBar region={region} onRegionChange={setRegion} />
        <View style={styles.content}>{renderContent()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
  },
  main: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
