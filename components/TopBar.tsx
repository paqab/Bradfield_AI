import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, User } from 'lucide-react-native';
import { FONT_FAMILY } from '@/constants/fonts';

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
          <Search size={18} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects, data..."
            placeholderTextColor="#888888"
          />
        </View>

        <View style={styles.regionSelector}>
          <Text style={styles.regionLabel}>Region:</Text>
          <View style={styles.dropdown}>
            <Text style={styles.regionText}>{region}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.profileButton}>
          <User size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 72,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.bold,
    color: '#000000',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
    color: '#000000',
  },
  regionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  regionLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    fontFamily: FONT_FAMILY.medium,
  },
  dropdown: {
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  regionText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    fontFamily: FONT_FAMILY.medium,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
