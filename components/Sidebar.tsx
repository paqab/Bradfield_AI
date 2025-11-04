import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LayoutDashboard, Users, Home, Sparkles } from 'lucide-react-native';
import { NavigationSection } from '@/types/navigation';

interface SidebarProps {
  activeSection: NavigationSection;
  onSectionChange: (section: NavigationSection) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'overview' as NavigationSection, label: 'Overview', icon: LayoutDashboard },
    { id: 'community' as NavigationSection, label: 'Community Feedback', icon: Users },
    { id: 'housing' as NavigationSection, label: 'Predictive Housing', icon: Home },
    { id: 'optimisation' as NavigationSection, label: 'Optimisation', icon: Sparkles },
  ];

  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <Text style={styles.logo}>Bradfield AI</Text>
        <Text style={styles.subtitle}>Urban Planning Platform</Text>
      </View>

      <View style={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => onSectionChange(item.id)}
            >
              <Icon size={20} color={isActive ? '#87CEEB' : '#D3D3D3'} />
              <Text style={[styles.navText, isActive && styles.navTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.placeholderSection}>
          <Text style={styles.placeholderTitle}>Future Features</Text>
          <Text style={styles.placeholderItem}>• Upload Civic Data</Text>
          <Text style={styles.placeholderItem}>• Equity Index</Text>
          <Text style={styles.placeholderItem}>• Impact Reports</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 280,
    backgroundColor: '#000000',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderRightColor: '#2A2A2A',
  },
  header: {
    marginBottom: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#A0A0A0',
    fontWeight: '400',
  },
  nav: {
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  navItemActive: {
    backgroundColor: '#1A1A1A',
  },
  navText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#D3D3D3',
    fontWeight: '500',
  },
  navTextActive: {
    color: '#87CEEB',
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  placeholderSection: {
    paddingHorizontal: 8,
  },
  placeholderTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  placeholderItem: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 8,
  },
});
