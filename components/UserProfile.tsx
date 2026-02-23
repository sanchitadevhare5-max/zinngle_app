import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext'; // Import the useUser hook
import { ViewState } from '../types';

const UserProfile: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, profile, loading } = useUser(); // Get user data from the context
  const userCoins = 500; // This will eventually come from the profile

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", onPress: () => navigation.navigate('Auth') }
    ]);
  };

  const menuItems = [
    { id: ViewState.SETTINGS_ACCOUNT, label: 'Account Settings', icon: '👤' },
    { id: ViewState.CALL_HISTORY, label: 'Call History', icon: '📹' },
    { id: ViewState.SETTINGS_NOTIFICATIONS, label: 'Notifications', icon: '🔔' },
    { id: ViewState.SETTINGS_PRIVACY, label: 'Privacy & Security', icon: '🛡️' },
    { id: ViewState.LANGUAGE_SELECT, label: 'Language', icon: '🌐', extra: 'English' },
    { id: ViewState.HELP_CENTER, label: 'Help & Support', icon: '🎧' },
    { id: ViewState.SETTINGS_MAIN, label: 'More Settings', icon: '⚙️' },
  ];

  if (loading) {
      return <SafeAreaView style={styles.container}><View style={styles.centered}><Text style={{color: 'white'}}>Loading profile...</Text></View></SafeAreaView>
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
            {profile?.avatar_url ? (
                <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
            ) : (
                <View style={styles.avatarCircle}><Text style={styles.avatarPlaceholder}>{profile?.full_name?.charAt(0) || 'U'}</Text></View>
            )}
            <Text style={styles.userName}>{profile?.full_name || 'New User'}</Text>
            <Text style={styles.userHandle}>@{profile?.username || user?.email}</Text>

            <View style={styles.statsRow}>
                <TouchableOpacity style={styles.statBox}><Text style={styles.statNumber}>0</Text><Text style={styles.statLabel}>FOLLOWING</Text></TouchableOpacity>
                <TouchableOpacity style={styles.statBox}><Text style={styles.statNumber}>0</Text><Text style={styles.statLabel}>FOLLOWERS</Text></TouchableOpacity>
            </View>
        </View>

        <View style={styles.px24}>
            <TouchableOpacity onPress={() => navigation.navigate('Wallet', {balance: userCoins, userType: 'user'})} style={styles.balanceCard}>
                <View>
                    <Text style={styles.balanceTitle}>My Balance</Text>
                    <View style={styles.balanceValueContainer}>
                        <Text style={{fontSize: 20}}>🪙</Text>
                        <Text style={styles.balanceValue}>{userCoins}</Text>
                    </View>
                </View>
                <View style={styles.chevronCircle}><Text style={styles.chevronRight}>›</Text></View>
            </TouchableOpacity>
        </View>

        <View style={styles.px24}>
            <Text style={styles.sectionTitle}>GIFTS</Text>
            <View style={styles.giftsRow}>
                <TouchableOpacity style={styles.giftBox} onPress={() => navigation.navigate('GiftStore')}>
                    <View style={[styles.giftIconCircle, {backgroundColor: 'rgba(219, 39, 119, 0.1)'}]}><Text style={{fontSize: 18}}>🛍️</Text></View>
                    <Text style={styles.giftLabel}>Gift Store</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.giftBox} onPress={() => navigation.navigate('GiftHistory')}>
                    <View style={[styles.giftIconCircle, {backgroundColor: 'rgba(79, 70, 229, 0.1)'}]}><Text style={{fontSize: 18}}>🕒</Text></View>
                    <Text style={styles.giftLabel}>History</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.px24}>
            <Text style={styles.sectionTitle}>SETTINGS</Text>
            <View style={styles.menuList}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={item.id} style={[styles.menuItem, index === menuItems.length -1 && {borderBottomWidth: 0}]} onPress={() => navigation.navigate(item.id)}>
                        <View style={styles.menuItemLeft}>
                          <View style={styles.menuIconContainer}><Text style={styles.menuIcon}>{item.icon}</Text></View>
                          <Text style={styles.menuLabel}>{item.label}</Text>
                        </View>
                        <View style={styles.menuItemRight}>
                            {item.extra && <Text style={styles.menuExtra}>{item.extra}</Text>}
                            <Text style={styles.menuChevron}>›</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <View style={styles.logoutIconContainer}><Text style={styles.logoutIcon}>🚪</Text></View>
                <Text style={styles.logoutLabel}>Log Out</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Version 1.5.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  px24: { paddingHorizontal: 24 },
  header: { padding: 24, paddingTop: 48, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1e293b', backgroundColor: '#152033' },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 16, borderWidth: 4, borderColor: '#1e293b' },
  avatarCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#4f46e5', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 4, borderColor: '#1e293b' },
  avatarPlaceholder: { color: 'white', fontSize: 36, fontWeight: 'bold' },
  userName: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  userHandle: { color: '#94a3b8', fontSize: 16, marginBottom: 24 },
  statsRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-around' },
  statBox: { flex: 1, backgroundColor: '#1e293b', borderRadius: 16, padding: 16, alignItems: 'center', marginHorizontal: 8 },
  statNumber: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: '#64748b', fontSize: 10, fontWeight: 'bold', marginTop: 4, letterSpacing: 0.5 },
  balanceCard: { backgroundColor: '#ea580c', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, marginBottom: 24 },
  balanceTitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 'bold' },
  balanceValueContainer: { flexDirection: 'row', alignItems: 'center' },
  balanceValue: { color: 'white', fontSize: 28, fontWeight: 'bold', marginLeft: 8 },
  chevronCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent:'center', alignItems: 'center' },
  chevronRight: { color: 'white', fontSize: 20 },
  sectionTitle: { color: '#64748b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 12, letterSpacing: 1 },
  giftsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  giftBox: { flex: 1, backgroundColor: '#1e293b', borderRadius: 16, padding: 20, alignItems: 'center', marginHorizontal: 8 },
  giftIconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  giftLabel: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  menuList: { backgroundColor: '#1e293b', borderRadius: 16, marginBottom: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#334155' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIconContainer: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#334155', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  menuIcon: { fontSize: 16 },
  menuLabel: { color: 'white', fontSize: 16, fontWeight: '500' },
  menuItemRight: { flexDirection: 'row', alignItems: 'center' },
  menuExtra: { color: '#94a3b8', fontSize: 14, marginRight: 12 },
  menuChevron: { color: '#64748b', fontSize: 16 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 16, backgroundColor: '#1e293b', marginTop: 16 },
  logoutIconContainer: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(239, 68, 68, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  logoutIcon: { fontSize: 16, color: '#ef4444' },
  logoutLabel: { color: '#ef4444', fontSize: 16, fontWeight: 'bold' },
  versionText: { textAlign: 'center', color: '#475569', fontSize: 10, marginTop: 24, marginBottom: 40 }
});

export default UserProfile;
