import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, User } from 'lucide-react-native';
import { FONT_FAMILY } from '@/constants/fonts';
import THEME from '@/constants/theme';

interface TopBarProps {
  region: string;
  onRegionChange: (region: string) => void;
}

export default function TopBar({ region, onRegionChange }: TopBarProps) {
  const regions = ['Metro Region', 'Coastal Zone', 'Northern District', 'Central Business District'];

  return (
    <View style={styles.topBar}>
      <Text style={styles.title}>Urban Insight Platform</Text>

      <View style={styles.rightSection}>
        <View style={styles.searchContainer}>
          <Search size={18} color={THEME.muted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects, data..."
            placeholderTextColor={THEME.muted}
          />
        </View>

        <View style={styles.regionSelector}>
          <Text style={styles.regionLabel}>Region:</Text>
          <View style={styles.dropdown}>
            <Text style={styles.regionText}>{region}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.profileButton}>
          <User size={20} color={THEME.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 72,
    backgroundColor: THEME.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: THEME.surfaceAlt,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.bold,
    color: THEME.textPrimary,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.surfaceAlt,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    width: 280,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    color: THEME.textPrimary,
  },
  regionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  regionLabel: {
    fontSize: 14,
    color: THEME.textSecondary,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.medium,
  },
  dropdown: {
    backgroundColor: THEME.surfaceAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
  },
  regionText: {
    fontSize: 14,
    color: THEME.textPrimary,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.medium,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.accentPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
