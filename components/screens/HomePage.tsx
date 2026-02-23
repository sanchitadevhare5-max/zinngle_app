import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sample Data
const CATEGORIES = ['Trending', 'Video', 'Audio', 'New'];
const FEATURED_HOSTS = [
  { id: '1', name: 'Aria Vibe', username: 'aria_vibe', status: 'online', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { id: '2', name: 'Zane Light', username: 'zane_x', status: 'busy', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
];

export default function HomePage() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/app_logo.png')} style={styles.logo} />
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Wallet')} style={styles.iconBtn}>
            <Text style={{fontSize: 20}}>🪙</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatList')} style={styles.iconBtn}>
            <Text style={{fontSize: 20}}>💬</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat} style={styles.categoryBtn}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Hosts</Text>
          <View style={styles.hostGrid}>
            {FEATURED_HOSTS.map(host => (
              <TouchableOpacity key={host.id} style={styles.hostCard}>
                <Image source={{ uri: host.avatar }} style={styles.hostImage} />
                <View style={styles.statusBadge}>
                   <View style={[styles.statusDot, { backgroundColor: host.status === 'online' ? '#22c55e' : '#f59e0b' }]} />
                   <Text style={styles.statusText}>{host.status}</Text>
                </View>
                <View style={styles.hostInfo}>
                  <Text style={styles.hostName}>{host.name}</Text>
                  <Text style={styles.hostHandle}>@{host.username}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Banner */}
        <TouchableOpacity style={styles.promoBanner}>
           <Text style={styles.promoTitle}>Earn with Zinngle</Text>
           <Text style={styles.promoDesc}>Apply to become a host today</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Nav Bar Placeholder */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>🏠</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.navItem}><Text style={styles.navIcon}>🔍</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} style={styles.navItem}><Text style={styles.navIcon}>👤</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24 },
  logo: { width: 120, height: 40, resizeMode: 'contain' },
  headerIcons: { flexDirection: 'row' },
  iconBtn: { backgroundColor: '#1e293b', width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginHorizontal: 6 },
  categoryList: { paddingHorizontal: 24, marginBottom: 24 },
  categoryBtn: { backgroundColor: '#1e293b', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#334155', marginRight: 12 },
  categoryText: { color: 'white', fontWeight: 'bold' },
  section: { padding: 24 },
  sectionTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  hostGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  hostCard: { width: '48%', backgroundColor: '#1e293b', borderRadius: 20, overflow: 'hidden', marginBottom: 16 },
  hostImage: { width: '100%', height: 180, resizeMode: 'cover' },
  statusBadge: { 
    position: 'absolute', 
    top: 12, 
    left: I18nManager.isRTL ? undefined : 12,
    right: I18nManager.isRTL ? 12 : undefined,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { color: 'white', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  hostInfo: { padding: 12 },
  hostName: { color: 'white', fontWeight: 'bold' },
  hostHandle: { color: '#64748b', fontSize: 12 },
  promoBanner: { margin: 24, padding: 24, backgroundColor: '#db2777', borderRadius: 20 },
  promoTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  promoDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 },
  bottomNav: { flexDirection: 'row', backgroundColor: '#1e293b', padding: 16, borderTopLeftRadius: 24, borderTopRightRadius: 24, justifyContent: 'space-around' },
  navItem: { alignItems: 'center' },
  navIcon: { fontSize: 24 }
});
