import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { MOCK_REVIEWS } from '../constants';
import { Host, Review } from '../types';

interface HostReviewsProps {
  route: { params: { host: Host } };
  navigation: any;
}

const HostReviews: React.FC<HostReviewsProps> = ({ route, navigation }) => {
  const { host } = route.params;
  const reviews = MOCK_REVIEWS.filter((r: Review) => r.hostId === host.id);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
        <Text key={i} style={[styles.star, i < rating ? styles.activeStar : styles.inactiveStar]}>★</Text>
    ));
  };

  const renderItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
            <View style={styles.reviewAuthor}>
                <View style={styles.authorAvatar}><Text style={styles.authorInitial}>{item.userName.charAt(0)}</Text></View>
                <Text style={styles.authorName}>{item.userName}</Text>
            </View>
            <Text style={styles.reviewDate}>2d ago</Text>
        </View>
        <View style={styles.starRow}>{renderStars(item.rating)}</View>
        <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reviews for {host.name.split(' ')[0]}</Text>
        </View>

        <View style={styles.ratingSummary}>
          <View style={styles.ratingValueContainer}>
            <Text style={styles.ratingValue}>{host.rating}</Text>
            <View style={styles.starRow}>{renderStars(Math.round(host.rating))}</View>
            <Text style={styles.reviewCount}>{reviews.length} Reviews</Text>
          </View>
          <View style={styles.ratingBarsContainer}>
            {[5, 4, 3, 2, 1].map(star => (
                <View key={star} style={styles.ratingBarRow}>
                    <Text style={styles.barLabel}>{star}</Text>
                    <View style={styles.barBackground}><View style={[styles.barForeground, {width: `${Math.random() * 80 + 10}%`}]} /></View>
                </View>
            ))}
          </View>
        </View>
      </View>

      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 24 }}
        ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>⭐</Text>
                <Text style={styles.emptyText}>No reviews yet</Text>
            </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    header: { padding: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
    headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    backButton: { marginRight: 12 },
    backIcon: { color: 'white', fontSize: 32 },
    headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    ratingSummary: { flexDirection: 'row', backgroundColor: '#1e293b', borderRadius: 16, padding: 20, alignItems: 'center' },
    ratingValueContainer: { alignItems: 'center', paddingRight: 20, marginRight: 20, borderRightWidth: 1, borderRightColor: '#334155' },
    ratingValue: { color: 'white', fontSize: 36, fontWeight: 'bold' },
    starRow: { flexDirection: 'row', marginVertical: 4 },
    star: { fontSize: 10 },
    activeStar: { color: '#facc15' },
    inactiveStar: { color: '#475569' },
    reviewCount: { color: '#64748b', fontSize: 12 },
    ratingBarsContainer: { flex: 1 },
    ratingBarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
    barLabel: { color: '#64748b', fontSize: 10, marginRight: 6 },
    barBackground: { flex: 1, height: 6, backgroundColor: '#334155', borderRadius: 3 },
    barForeground: { height: '100%', backgroundColor: '#facc15', borderRadius: 3 },
    reviewItem: { borderBottomWidth: 1, borderBottomColor: '#1e293b', paddingBottom: 16, marginBottom: 16 },
    reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    reviewAuthor: { flexDirection: 'row', alignItems: 'center' },
    authorAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#db2777', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    authorInitial: { color: 'white', fontWeight: 'bold' },
    authorName: { color: 'white', fontWeight: 'bold' },
    reviewDate: { color: '#64748b', fontSize: 12 },
    reviewComment: { color: '#cbd5e1', lineHeight: 20, marginTop: 8 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '20%' },
    emptyIcon: { fontSize: 40, opacity: 0.5 },
    emptyText: { color: '#64748b', marginTop: 12, fontWeight: 'bold' }
});

export default HostReviews;
