import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MessageSquare, TrendingUp, MapPin, Clock, Heart, MessageCircle, Share2, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useState } from 'react';
import InsightCard from '@/components/InsightCard';
import CommunityChart from '@/components/CommunityChart';
import THEME from '@/constants/theme';
import { FONT_FAMILY } from '@/constants/fonts';

export default function CommunityScreen() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  
  const feedbackItems = [
    { 
      id: 1, 
      author: 'Sarah M.', 
      category: 'Housing', 
      text: 'Love the new mixed-use development plans. More walkable neighborhoods!', 
      sentiment: 'positive',
      detailedFeedback: "I've been living in the metro area for 15 years and I'm thrilled with the direction the city is taking. The new mixed-use development plans announced for the downtown corridor are exactly what we need - creating vibrant, walkable neighborhoods where people can live, work, and play within walking distance. The inclusion of affordable housing units alongside market-rate options is particularly commendable. My family and I are planning to move into one of the new developments next year. The proximity to public transport and community amenities makes it an ideal choice for reducing our carbon footprint while improving our quality of life.",
      location: 'Metro Central',
      timestamp: '2 hours ago',
      engagement: { likes: 24, comments: 8, shares: 3 }
    },
    { 
      id: 2, 
      author: 'James L.', 
      category: 'Transport', 
      text: 'Bus routes need better coverage in the northern suburbs.', 
      sentiment: 'negative',
      detailedFeedback: "As a daily commuter from the northern suburbs to the CBD, I've been experiencing significant challenges with the current public transport system. The bus routes in our area (Northwood, Highland Park, and surrounding neighborhoods) have very limited frequency - only one bus every 45 minutes during peak hours. This is completely inadequate for a growing residential area. Many residents, including myself, have been forced to drive to work, which increases traffic congestion and goes against the city's sustainability goals. I've spoken with over 50 neighbors who share the same concern. We need: 1) Increased frequency to every 15 minutes during peak hours, 2) Extended service hours to 11 PM, 3) Better connections to the main train station. This would significantly reduce car dependency and improve quality of life for thousands of residents.",
      location: 'Northern Suburbs',
      timestamp: '5 hours ago',
      engagement: { likes: 47, comments: 23, shares: 12 }
    },
    { 
      id: 3, 
      author: 'Maria G.', 
      category: 'Parks', 
      text: 'The new riverside park is fantastic for families. Great initiative!', 
      sentiment: 'positive',
      detailedFeedback: "The new Riverside Park that opened last month has been an absolute game-changer for our community! As a mother of three young children, I can't express enough how much we appreciate this beautiful space. The park features age-appropriate playground equipment, well-maintained walking trails, picnic areas with shade, and a fantastic splash pad that keeps the kids entertained for hours. The landscaping is thoughtful with native plants, and the park feels safe with good lighting and clear sightlines. We've visited almost daily since it opened, and I've noticed it's bringing the community together - we've met so many new neighbors here. The free community events like the Saturday morning farmers market and evening concerts have been wonderful additions. This is exactly the kind of public investment that makes our city a better place to live. Thank you to everyone involved in making this happen!",
      location: 'Riverside District',
      timestamp: '1 day ago',
      engagement: { likes: 89, comments: 31, shares: 18 }
    },
    { 
      id: 4, 
      author: 'David K.', 
      category: 'Safety', 
      text: 'More street lighting needed on main corridors for evening safety.', 
      sentiment: 'negative',
      detailedFeedback: "I've been walking home from work along Main Street and Oak Avenue for the past two years, and the lack of adequate street lighting has become a serious safety concern. During winter months when it gets dark early, these corridors become poorly lit sections that feel unsafe, especially between 6-9 PM when many people are commuting. I've personally witnessed several incidents where pedestrians have had close calls with vehicles due to poor visibility. Additionally, several neighbors have reported feeling uncomfortable walking alone at night in these areas. I've conducted a survey with 30+ residents and found that 85% avoid walking these routes after dark. We need: 1) Installation of LED street lights every 30 meters along Main Street and Oak Avenue, 2) Motion-activated lighting in pedestrian underpasses, 3) Emergency call boxes at regular intervals. This investment would improve safety, encourage more pedestrian activity, and support the city's walkability goals. The current lighting is inadequate and doesn't meet modern safety standards.",
      location: 'Central Business District',
      timestamp: '1 day ago',
      engagement: { likes: 56, comments: 19, shares: 7 }
    },
    { 
      id: 5, 
      author: 'Jennifer T.', 
      category: 'Services', 
      text: 'The new community center offers excellent programs for all ages.', 
      sentiment: 'positive',
      detailedFeedback: "The renovated Community Center on Elm Street has exceeded all my expectations! As someone who works with senior citizens, I've seen firsthand how this facility has transformed lives. The center now offers fitness classes, art workshops, computer training, and social activities that cater to all age groups. The senior programming is particularly thoughtful - including health screenings, financial planning workshops, and daily social hours. What impresses me most is the accessibility features - wheelchair ramps, hearing loops, and programs designed for people with disabilities. The youth programs are also fantastic - after-school tutoring, sports leagues, and summer camps. The facility is well-maintained, the staff is friendly and professional, and the programming is diverse and inclusive. This is exactly the kind of community investment that strengthens neighborhoods and improves quality of life. I've recommended it to dozens of families and neighbors.",
      location: 'Elm Street District',
      timestamp: '2 days ago',
      engagement: { likes: 67, comments: 28, shares: 15 }
    },
    { 
      id: 6, 
      author: 'Robert P.', 
      category: 'Housing', 
      text: 'Affordable housing waitlist is too long - need more units urgently.', 
      sentiment: 'negative',
      detailedFeedback: "I've been on the affordable housing waitlist for over 18 months now, and the situation is becoming critical. As a single father working two jobs to support my family, finding affordable housing in this city has been nearly impossible. The current waitlist has over 1,200 families, and I'm told the average wait time is 2-3 years. This is unacceptable. Many families like mine are paying 60-70% of their income on rent, leaving little for food, healthcare, and education. I've seen families move out of the city because they can't afford to stay. The recent housing developments have been primarily market-rate, which doesn't help those of us who need affordable options. We need: 1) Immediate construction of 500+ affordable units, 2) Rent control measures to protect existing tenants, 3) Inclusionary zoning requiring 20% affordable units in all new developments, 4) Faster processing of housing applications. Housing is a basic human right, and the city needs to prioritize this crisis.",
      location: 'Metro Region',
      timestamp: '3 days ago',
      engagement: { likes: 142, comments: 67, shares: 34 }
    },
    { 
      id: 7, 
      author: 'Lisa W.', 
      category: 'Parks', 
      text: 'Dog park improvements are much appreciated by pet owners!', 
      sentiment: 'positive',
      detailedFeedback: "The recent upgrades to the Highland Dog Park have made a huge difference for our four-legged family members and their owners! The new separate areas for small and large dogs prevent conflicts, the water stations are clean and well-maintained, and the addition of agility equipment has been a huge hit. The shaded seating areas allow us to stay longer, and the improved drainage means the park is usable even after rain. The waste stations are well-stocked, and I've noticed much better compliance with cleanup rules. The park has become a real community hub where dog owners socialize and build friendships. My dog absolutely loves the new features, and we visit at least 3-4 times per week. The city's investment in this space shows they understand that pet-friendly amenities are important for quality of life. Thank you for listening to our feedback and making these improvements!",
      location: 'Highland Park',
      timestamp: '3 days ago',
      engagement: { likes: 45, comments: 12, shares: 6 }
    },
    { 
      id: 8, 
      author: 'Michael C.', 
      category: 'Transport', 
      text: 'Bike lane infrastructure improvements are making cycling safer.', 
      sentiment: 'positive',
      detailedFeedback: "As a daily cyclist who commutes 10 miles to work, I've noticed significant improvements in bike infrastructure over the past year, and I want to acknowledge the positive changes. The new protected bike lanes on Main Street and Riverside Drive are excellent - they provide a real sense of safety with physical barriers separating cyclists from traffic. The bike parking facilities at transit stations have been expanded, and the repair stations are a thoughtful addition. The city's bike-share program expansion has also been great for first-last mile connections. These improvements have encouraged more people to cycle - I've definitely noticed more cyclists on the roads. However, we still need better connectivity between bike lanes and more secure parking options. Overall, the city is moving in the right direction, and I appreciate the investment in sustainable transportation infrastructure.",
      location: 'Citywide',
      timestamp: '4 days ago',
      engagement: { likes: 78, comments: 24, shares: 11 }
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community Feedback</Text>
        <Text style={styles.subtitle}>Real-time sentiment analysis and engagement metrics</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.chartSection}>
          <InsightCard
            title="Sentiment Analysis"
            icon={<TrendingUp size={20} color={THEME.accentBlue} />}
          >
            <CommunityChart summary="Community engagement is strong across all categories. Housing and parks receive highest approval ratings." />
          </InsightCard>
        </View>

        <View style={styles.feedbackSection}>
          <View style={styles.sectionHeader}>
            <MessageSquare size={20} color={THEME.textPrimary} />
            <Text style={styles.sectionTitle}>Recent Feedback</Text>
          </View>

          {feedbackItems.map((item) => {
            const isExpanded = expandedItems.has(item.id);
            return (
              <View key={item.id} style={[styles.feedbackCard, isExpanded && styles.feedbackCardExpanded]}>
                <View style={styles.feedbackHeader}>
                  <View style={styles.feedbackAuthor}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{item.author[0]}</Text>
                    </View>
                    <View style={styles.authorInfo}>
                      <Text style={styles.authorName}>{item.author}</Text>
                      <View style={styles.authorMeta}>
                        <MapPin size={12} color={THEME.muted} />
                        <Text style={styles.location}>{item.location}</Text>
                        <Clock size={12} color={THEME.muted} />
                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.sentimentBadge, item.sentiment === 'positive' ? styles.positive : styles.negative]}>
                    <Text style={styles.sentimentText}>{item.sentiment}</Text>
                  </View>
                </View>
                
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                
                <Text style={styles.feedbackText}>{item.text}</Text>
                
                {item.detailedFeedback && (
                  <>
                    <TouchableOpacity 
                      style={styles.expandButton}
                      onPress={() => {
                        const newExpanded = new Set(expandedItems);
                        if (isExpanded) {
                          newExpanded.delete(item.id);
                        } else {
                          newExpanded.add(item.id);
                        }
                        setExpandedItems(newExpanded);
                      }}
                    >
                      <Text style={styles.expandButtonText}>
                        {isExpanded ? 'Show Less' : 'Read Full Feedback'}
                      </Text>
                        {isExpanded ? (
                          <ChevronUp size={16} color={THEME.accentBlue} />
                        ) : (
                          <ChevronDown size={16} color={THEME.accentBlue} />
                        )}
                    </TouchableOpacity>
                    
                    {isExpanded && (
                      <View style={styles.detailedFeedbackContainer}>
                        <Text style={styles.detailedFeedbackText}>{item.detailedFeedback}</Text>
                      </View>
                    )}
                  </>
                )}
                
                <View style={styles.engagementContainer}>
                  <View style={styles.engagementItem}>
                    <Heart size={14} color={THEME.danger} fill={THEME.danger} />
                    <Text style={styles.engagementText}>{item.engagement?.likes || 0}</Text>
                  </View>
                  <View style={styles.engagementItem}>
                    <MessageCircle size={14} color={THEME.accentBlue} />
                    <Text style={styles.engagementText}>{item.engagement?.comments || 0}</Text>
                  </View>
                  <View style={styles.engagementItem}>
                    <Share2 size={14} color={THEME.muted} />
                    <Text style={styles.engagementText}>{item.engagement?.shares || 0}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  header: {
    padding: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.bold,
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    color: THEME.textSecondary,
  },
  content: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  chartSection: {
    marginBottom: 24,
  },
  feedbackSection: {
    backgroundColor: THEME.surface,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.bold,
    color: THEME.textPrimary,
  },
  feedbackCard: {
    padding: 16,
    backgroundColor: THEME.surface,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: THEME.accentBlue,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  feedbackCardExpanded: {
    backgroundColor: THEME.surfaceAlt,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  feedbackAuthor: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: THEME.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.bold,
    color: THEME.textPrimary,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.bold,
    color: THEME.textPrimary,
    marginBottom: 4,
  },
  authorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  location: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.regular,
    color: THEME.textSecondary,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.regular,
    color: THEME.textSecondary,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: THEME.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.semiBold,
    color: THEME.textPrimary,
  },
  sentimentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  positive: {
    backgroundColor: THEME.success + '22',
  },
  negative: {
    backgroundColor: THEME.danger + '22',
  },
  sentimentText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.semiBold,
    color: THEME.textPrimary,
    textTransform: 'capitalize',
  },
  feedbackText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    lineHeight: 22,
    color: THEME.textSecondary,
    marginBottom: 12,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    marginBottom: 12,
  },
  expandButtonText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.semiBold,
    color: THEME.accentBlue,
  },
  detailedFeedbackContainer: {
    padding: 16,
    backgroundColor: THEME.surface,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.surfaceAlt,
  },
  detailedFeedbackText: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.regular,
    lineHeight: 20,
    color: THEME.textSecondary,
  },
  engagementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: THEME.surfaceAlt,
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  engagementText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.semiBold,
    color: THEME.textSecondary,
  },
});
