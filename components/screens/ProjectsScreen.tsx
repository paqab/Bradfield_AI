import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Building2, MapPin, User, DollarSign, TrendingUp, Calendar, FileText, CheckCircle, Clock, XCircle } from 'lucide-react-native';
import { generateProjects, Project, ProjectCategory, getCategoryColor, getCategoryTextColor, getStatusLabel, getStatusColor } from '@/utils/mockProjects';
import { FONT_FAMILY } from '@/constants/fonts';

const ALL_CATEGORIES: ProjectCategory[] = ['Healthcare', 'Education', 'Transport', 'Infrastructure', 'Housing', 'Public Services'];

export default function ProjectsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [showCompleted, setShowCompleted] = useState(false);
  const allProjects = generateProjects();
  
  const filteredProjects = allProjects.filter(project => {
    if (!showCompleted && project.status === 'completed') return false;
    if (selectedCategory === 'All') return true;
    return project.category === selectedCategory;
  });

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color={getStatusColor(status)} />;
      case 'approved':
      case 'in_development':
        return <Clock size={16} color={getStatusColor(status)} />;
      case 'under_review':
        return <FileText size={16} color={getStatusColor(status)} />;
      default:
        return <XCircle size={16} color={getStatusColor(status)} />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Projects</Text>
        <Text style={styles.subtitle}>Review and track development proposals</Text>
      </View>

      <View style={styles.content}>
        {/* Category Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          <TouchableOpacity
            style={[styles.filterChip, selectedCategory === 'All' && styles.filterChipActive]}
            onPress={() => setSelectedCategory('All')}
          >
            <Text style={[styles.filterText, selectedCategory === 'All' && styles.filterTextActive]}>
              All Projects
            </Text>
          </TouchableOpacity>
          {ALL_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                selectedCategory === category && styles.filterChipActive,
                selectedCategory === category && { backgroundColor: getCategoryColor(category) }
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.filterText,
                  selectedCategory === category && styles.filterTextActive,
                  selectedCategory === category && { color: getCategoryTextColor(category) }
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Toggle Completed Projects */}
        <TouchableOpacity
          style={styles.toggleContainer}
          onPress={() => setShowCompleted(!showCompleted)}
        >
          <View style={[styles.toggleSwitch, showCompleted && styles.toggleSwitchActive]}>
            <View style={[styles.toggleDot, showCompleted && styles.toggleDotActive]} />
          </View>
          <Text style={styles.toggleLabel}>Show completed projects</Text>
        </TouchableOpacity>

        {/* Projects Count */}
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </Text>
        </View>

        {/* Projects Grid */}
        <View style={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <View key={project.id} style={styles.projectCard}>
              {/* Project Image */}
              {project.images && project.images.length > 0 && (
                <Image
                  source={project.images[0]}
                  style={styles.projectImage}
                  resizeMode="cover"
                />
              )}
              
              <View style={styles.cardContent}>
                {/* Card Header */}
                <View style={styles.cardHeader}>
                <View 
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: getCategoryColor(project.category) }
                  ]}
                >
                  <Text 
                    style={[
                      styles.categoryText,
                      { color: getCategoryTextColor(project.category) }
                    ]}
                  >
                    {project.category}
                  </Text>
                </View>
                <View 
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(project.status) + '20' }
                  ]}
                >
                  {getStatusIcon(project.status)}
                  <Text 
                    style={[
                      styles.statusText,
                      { color: getStatusColor(project.status) }
                    ]}
                  >
                    {getStatusLabel(project.status)}
                  </Text>
                </View>
              </View>

              {/* Project Title */}
              <Text style={styles.projectTitle}>{project.title}</Text>

              {/* Project Info Row */}
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <MapPin size={14} color="#666666" />
                  <Text style={styles.infoText}>{project.location}</Text>
                </View>
                <View style={styles.infoItem}>
                  <User size={14} color="#666666" />
                  <Text style={styles.infoText}>{project.developer}</Text>
                </View>
              </View>

              {/* Description */}
              <Text style={styles.description} numberOfLines={3}>
                {project.description}
              </Text>

              {/* Progress Section */}
              {project.status === 'under_review' && (
                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Review Progress</Text>
                    <Text style={styles.progressValue}>{project.reviewProgress}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { width: `${project.reviewProgress}%`, backgroundColor: getStatusColor(project.status) }
                      ]} 
                    />
                  </View>
                </View>
              )}

              {/* Community Support */}
              <View style={styles.supportSection}>
                <View style={styles.supportHeader}>
                  <TrendingUp size={14} color="#4CAF50" />
                  <Text style={styles.supportLabel}>Community Support</Text>
                  <Text style={styles.supportValue}>{project.communitySupport}%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      { width: `${project.communitySupport}%`, backgroundColor: '#4CAF50' }
                    ]} 
                  />
                </View>
              </View>

              {/* Metrics Row */}
              <View style={styles.metricsRow}>
                <View style={styles.metric}>
                  <DollarSign size={16} color="#87CEEB" />
                  <Text style={styles.metricValue}>
                    ${(project.estimatedCost / 1000000).toFixed(1)}M
                  </Text>
                  <Text style={styles.metricLabel}>Estimated Cost</Text>
                </View>
                <View style={styles.metric}>
                  <Calendar size={16} color="#87CEEB" />
                  <Text style={styles.metricValue}>{project.estimatedCompletion}</Text>
                  <Text style={styles.metricLabel}>Completion</Text>
                </View>
                <View style={styles.metric}>
                  <TrendingUp size={16} color="#87CEEB" />
                  <Text style={styles.metricValue}>{project.impactScore}</Text>
                  <Text style={styles.metricLabel}>Impact Score</Text>
                </View>
              </View>

              {/* Action Button */}
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>View Details</Text>
              </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {filteredProjects.length === 0 && (
          <View style={styles.emptyState}>
            <Building2 size={48} color="#D3D3D3" />
            <Text style={styles.emptyStateText}>No projects found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try selecting a different category or showing completed projects
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.bold,
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    color: '#666666',
  },
  content: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    gap: 12,
    paddingRight: 32,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  filterChipActive: {
    borderWidth: 2,
  },
  filterText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.medium,
    color: '#666666',
  },
  filterTextActive: {
    fontFamily: FONT_FAMILY.semiBold,
    color: '#000000',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingVertical: 8,
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: '#87CEEB',
  },
  toggleDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  toggleDotActive: {
    alignSelf: 'flex-end',
  },
  toggleLabel: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    color: '#666666',
  },
  countContainer: {
    marginBottom: 24,
  },
  countText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#666666',
  },
  projectsGrid: {
    gap: 20,
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  projectImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5E5E5',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.semiBold,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.semiBold,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.bold,
    color: '#000000',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.regular,
    color: '#666666',
  },
  description: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.medium,
    color: '#666666',
  },
  progressValue: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#000000',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  supportSection: {
    marginBottom: 16,
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  supportLabel: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.medium,
    color: '#666666',
    flex: 1,
  },
  supportValue: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#4CAF50',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#000000',
    marginTop: 4,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.regular,
    color: '#666666',
  },
  actionButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.semiBold,
    color: '#666666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    color: '#999999',
    textAlign: 'center',
  },
});

