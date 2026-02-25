import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MOCK_HOSTS } from './constants';
import { useUser } from './components/UserContext';

const FILTER_TAGS = [
  { id: 'all', label: 'All', icon: '🌐' },
  { id: 'follow', label: 'Follow', icon: '❤️' },
  { id: 'favourite', label: 'Favourite', icon: '⭐' },
  { id: 'nearby', label: 'Nearby', icon: '📍' },
];

const DEFAULT_AVATAR = 'https://via.placeholder.com/150/1e293b/FFFFFF?text=Z';

export default function HomePage() {
  const navigation = useNavigation<any>();
  const [activeFilter, setActiveFilter] = useState('all');
  const { profile } = useUser();

  const filteredHosts = activeFilter === 'nearby'
    ? MOCK_HOSTS.filter((h: any) => h.distance && h.distance <= 10)
    : MOCK_HOSTS;

  const avatarUri = profile?.avatar_url || DEFAULT_AVATAR;
  const displayName = profile?.full_name || profile?.username || 'Welcome';
  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}><Text style={{color: 'white', fontSize: 16}}>⚡️</Text></View>
          <Text style={styles.brandName}>Zinngle</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.actionBtn}>
            <Text style={styles.headerEmoji}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Wallet', {balance: 150, userType: 'user'})} style={styles.coinBadge}>
            <Text style={styles.coinEmojiLarge}>🪙</Text>
            <Text style={styles.coinBalanceLarge}>150</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.avatarBtn}>
            {profile?.avatar_url ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitials}>{initials}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.greetingRow}>
          <Text style={styles.greetingText}>Hello, <Text style={styles.greetingName}>{displayName}</Text> 👋</Text>
        </View>

        <TouchableOpacity style={styles.promoBanner} onPress={() => {}}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Discover Hosts</Text>
            <Text style={styles.promoSubtitle}>Video chat with your favorite personalities.</Text>
          </View>
          <Text style={styles.promoShape}>📹</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {FILTER_TAGS.map(tag => (
            <TouchableOpacity
              key={tag.id}
              onPress={() => setActiveFilter(tag.id)}
              style={[styles.filterBtn, activeFilter === tag.id && styles.activeFilterBtn]}
            >
              <Text style={[styles.filterLabel, activeFilter === tag.id && styles.activeFilterLabel]}>{tag.icon} {tag.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.hostsGrid}>
          {filteredHosts.map((host: any) => (
            <TouchableOpacity key={host.id} style={styles.hostCard} onPress={() => navigation.navigate('CreatorProfile', { host })}>
              <Image source={{ uri: host.coverUrl || DEFAULT_AVATAR }} style={styles.hostImage} />
              <View style={styles.hostOverlay} />
              <View style={[styles.statusBadge, { backgroundColor: host.status === 'online' ? '#22c55e' : '#64748b' }]}>
                  <Text style={styles.statusText}>{host.status}</Text>
              </View>
              <View style={styles.hostInfoContainer}>
                <Text style={styles.hostName}>{host.name}</Text>
                <View style={styles.hostMeta}>
                    <Text style={styles.metaText}>🪙 {host.pricePerMinute}</Text>
                    <Text style={styles.metaText}>•</Text>
                    <Text style={styles.metaText}>📍 {host.distance} km</Text>
                </View>
                <View style={styles.hostActions}>
                    <TouchableOpacity style={styles.callBtn} onPress={() => navigation.navigate('LiveCall', { host, callType: 'video' })}>
                        <Text style={styles.callBtnText}>📞 Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chatBtn} onPress={() => navigation.navigate('ChatInterface', { host })}>
                        <Text style={styles.chatBtnText}>💬</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollContent: { paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#db2777', justifyContent:'center', alignItems:'center', marginRight: 8},
  brandName: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { padding: 8 },
  headerEmoji: { fontSize: 22 },
  coinBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 24, marginLeft: 8, borderWidth: 1, borderColor: '#334155' },
  coinEmojiLarge: { fontSize: 16, marginRight: 6 },
  coinBalanceLarge: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  avatarBtn: { marginLeft: 10 },
  avatarImage: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#db2777' },
  avatarPlaceholder: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#db2777', justifyContent: 'center', alignItems: 'center' },
  avatarInitials: { color: 'white', fontSize: 13, fontWeight: 'bold' },
  greetingRow: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  greetingText: { color: '#94a3b8', fontSize: 15 },
  greetingName: { color: 'white', fontWeight: 'bold' },
  promoBanner: { marginHorizontal: 20, marginTop: 10, borderRadius: 32, backgroundColor: '#8b5cf6', overflow: 'hidden', padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  promoContent: { zIndex: 2 },
  promoTitle: { color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  promoSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14, maxWidth: '90%' },
  promoShape: { fontSize: 100, color: 'rgba(255,255,255,0.1)', position:'absolute', right: -20, bottom: -30, transform: [{rotate: '15deg'}] },
  filterContent: { paddingHorizontal: 20, paddingVertical: 24 },
  filterBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 99, backgroundColor: '#1e293b', marginRight: 10 },
  activeFilterBtn: { backgroundColor: 'white' },
  filterLabel: { color: '#94a3b8', fontWeight: 'bold' },
  activeFilterLabel: { color: '#0f172a' },
  hostsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  hostCard: { width: '48%', aspectRatio: 3/4.2, borderRadius: 32, overflow: 'hidden', backgroundColor: '#1e293b', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  hostImage: { ...StyleSheet.absoluteFillObject },
  hostOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  statusBadge: { position: 'absolute', top: 16, right: 16, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.5)' },
  statusText: { color: 'white', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  hostInfoContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16 },
  hostName: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  hostMeta: { flexDirection: 'row', alignItems:'center', marginVertical: 8 },
  metaText: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginRight: 8 },
  hostActions: { flexDirection: 'row', alignItems:'center' },
  callBtn: { flex: 1, backgroundColor: '#db2777', paddingVertical: 14, borderRadius: 16, alignItems: 'center', marginRight: 8 },
  callBtnText: { color: 'white', fontWeight: 'bold' },
  chatBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent:'center', alignItems: 'center' },
  chatBtnText: { fontSize: 20 },
});
