import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BradfieldLogo from '@/components/BradfieldLogo';
import { LayoutDashboard, Users, Home, Sparkles, FolderKanban } from 'lucide-react-native';
import { NavigationSection } from '@/types/navigation';
import { FONT_FAMILY } from '@/constants/fonts';
import THEME from '@/constants/theme';

interface SidebarProps {
  activeSection: NavigationSection;
  onSectionChange: (section: NavigationSection) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'overview' as NavigationSection, label: 'Overview', icon: LayoutDashboard },
    { id: 'projects' as NavigationSection, label: 'Projects', icon: FolderKanban },
    { id: 'community' as NavigationSection, label: 'Community Feedback', icon: Users },
    { id: 'housing' as NavigationSection, label: 'Predictive Housing', icon: Home },
    { id: 'optimisation' as NavigationSection, label: 'Optimisation', icon: Sparkles },
  ];

  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <BradfieldLogo />
        <Text style={styles.subtitle}>AI Urban Planning Platform</Text>
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
                  <Icon size={20} color={isActive ? THEME.accentBlue : THEME.muted} />
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
    backgroundColor: THEME.surface,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderRightColor: THEME.surfaceAlt,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  /* logoImage removed - use BradfieldLogo component for responsive sizing */
  subtitle: {
    fontSize: 16,
    color: THEME.textPrimary,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.semiBold,
    marginTop: 12,
    textAlign: 'center',
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
    backgroundColor: THEME.surfaceAlt,
  },
  navText: {
    marginLeft: 12,
    fontSize: 15,
    color: THEME.muted,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.medium,
  },
  navTextActive: {
    color: THEME.accentBlue,
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: THEME.surfaceAlt,
  },
  placeholderSection: {
    paddingHorizontal: 8,
  },
  placeholderTitle: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.semiBold,
    color: THEME.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  placeholderItem: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.regular,
    color: THEME.muted,
    marginBottom: 8,
  },
});
