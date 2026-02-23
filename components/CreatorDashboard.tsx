import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreatorDashboard: React.FC<{onLogout: () => void}> = ({ onLogout }) => {
  const navigation = useNavigation<any>();
  const [isOnline, setIsOnline] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Creator Dashboard</Text>
            <View style={styles.onlineToggle}>
                <Text style={styles.onlineStatus}>{isOnline ? 'Go Offline' : 'Go Online'}</Text>
                <Switch value={isOnline} onValueChange={setIsOnline} trackColor={{false: '#334155', true: '#16a34a'}} thumbColor="#fff" />
            </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>₹1,250</Text>
                    <Text style={styles.statLabel}>Total Earnings</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>12h 35m</Text>
                    <Text style={styles.statLabel}>Total Call Time</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.mainActionBtn} onPress={() => navigation.navigate('Wallet', {userType: 'host', balance: 1250})}>
                <Text style={styles.mainActionIcon}>💰</Text>
                <View style={{flex: 1}}>
                    <Text style={styles.mainActionTitle}>Earnings & Wallet</Text>
                    <Text style={styles.mainActionSubtitle}>View transaction history and withdraw funds</Text>
                </View>
                <Text style={styles.mainActionChevron}>›</Text>
            </TouchableOpacity>


            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.callItem}>
                <Text style={styles.callIcon}>📞</Text>
                <View style={{flex: 1}}>
                    <Text style={styles.callUser}>Incoming call from @johndoe</Text>
                    <Text style={styles.callTime}>2 minutes ago</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}><Text style={styles.actionButtonText}>Accept</Text></TouchableOpacity>
            </View>
             <View style={styles.callItem}>
                <Text style={styles.callIcon}>🎁</Text>
                <View style={{flex: 1}}>
                    <Text style={styles.callUser}>@janedoe sent you a Rose</Text>
                    <Text style={styles.callTime}>15 minutes ago</Text>
                </View>
                <Text style={styles.giftValue}>+10 🪙</Text>
            </View>
        </ScrollView>

        <View style={styles.navBar}>
             <TouchableOpacity style={styles.navItem} onPress={onLogout}><Text style={styles.navIcon}>🚪</Text><Text style={styles.navLabel}>Log Out</Text></TouchableOpacity>
             <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}><Text style={styles.navIcon}>🏠</Text><Text style={styles.navLabel}>User Mode</Text></TouchableOpacity>
             <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>⚙️</Text><Text style={styles.navLabel}>Settings</Text></TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
    headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    onlineToggle: { flexDirection: 'row', alignItems: 'center' },
    onlineStatus: { color: 'white', marginRight: 8, fontWeight: '600' },
    content: { padding: 24 },
    statsGrid: { flexDirection: 'row', marginBottom: 24 },
    statCard: { flex: 1, backgroundColor: '#1e293b', padding: 20, borderRadius: 16, alignItems: 'center', marginRight: 16 },
    statValue: { color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
    statLabel: { color: '#94a3b8' },
    mainActionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#4f46e5', borderRadius: 16, padding: 20, marginBottom: 24 },
    mainActionIcon: { fontSize: 24, marginRight: 16 },
    mainActionTitle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    mainActionSubtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
    mainActionChevron: { color: 'white', fontSize: 24 },
    sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    callItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 16, borderRadius: 12, marginBottom: 12 },
    callIcon: { fontSize: 24, marginRight: 12 },
    callUser: { color: 'white' },
    callTime: { color: '#64748b', fontSize: 12 },
    actionButton: { backgroundColor: '#16a34a', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
    actionButtonText: { color: 'white', fontWeight: 'bold' },
    giftValue: { color: '#fbbf24', fontWeight: 'bold' },
    navBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#1e293b', paddingVertical: 12 },
    navItem: { flex: 1, alignItems: 'center' },
    navIcon: { fontSize: 24, marginBottom: 4 },
    navLabel: { color: '#94a3b8', fontSize: 10 }
});

export default CreatorDashboard;
