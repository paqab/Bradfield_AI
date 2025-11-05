import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ReactNode } from 'react';
import { FONT_FAMILY } from '@/constants/fonts';
import THEME from '@/constants/theme';

interface InsightCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  isGenerating?: boolean;
}

export default function InsightCard({ title, icon, children, isGenerating }: InsightCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {icon}
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      {isGenerating ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={THEME.accentBlue} />
          <Text style={styles.loadingText}>Generating AI insights...</Text>
        </View>
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.surface,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
  },
  header: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.bold,
    color: THEME.textPrimary,
  },
  content: {
    minHeight: 200,
  },
  loadingContainer: {
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    color: THEME.textSecondary,
    fontStyle: 'italic',
  },
});
