import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { MOCK_GIFT_HISTORY, GIFTS, MOCK_HOSTS } from '../constants';
import { Host, Gift } from '../types';

const getGift = (id: string) => GIFTS.find((g: Gift) => g.id === id);
const getHost = (id: string) => MOCK_HOSTS.find((c: Host) => c.id === id);

const GiftHistory: React.FC = () => {
    const navigation = useNavigation();
    const [tab, setTab] = useState<'sent' | 'received'>('sent');

    const history = MOCK_GIFT_HISTORY.filter((h: any) => 
        tab === 'sent' ? h.senderId === 'user' : h.receiverId === 'user'
    );

    const formatDate = (ts: number) => {
        return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const renderItem = ({ item }: { item: any }) => {
        const gift = getGift(item.giftId);
        const partnerId = tab === 'sent' ? item.receiverId : item.senderId;
        const partner = getHost(partnerId);

        if (!gift) return null;

        return (
            <View style={styles.historyItem}>
                <View style={styles.iconContainer}><Text style={styles.giftIcon}>{gift.icon}</Text></View>
                <View style={styles.detailContainer}>
                    <Text style={styles.detailTitle}>
                        {tab === 'sent' ? `Sent to ${partner?.name || 'Unknown'}` : `Received from ${partner?.name || 'Unknown'}`}
                    </Text>
                    <Text style={styles.detailSubtitle}>{gift.name} • {formatDate(item.timestamp)}</Text>
                </View>
                <Text style={[styles.costText, { color: tab === 'sent' ? '#94a3b8' : '#22c55e' }]}>
                    {tab === 'sent' ? '-' : '+'}{item.cost} 🪙
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Gift History</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setTab('sent')} style={[styles.tab, tab === 'sent' && styles.activeTab]}>
                    <Text style={[styles.tabText, tab === 'sent' && styles.activeTabText]}>Sent</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab('received')} style={[styles.tab, tab === 'received' && styles.activeTab]}>
                     <Text style={[styles.tabText, tab === 'received' && styles.activeTabText]}>Received</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🎁</Text>
                        <Text style={styles.emptyText}>No gifts {tab} yet.</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
    backButton: { marginRight: 16 },
    backIcon: { color: 'white', fontSize: 32 },
    headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    tabContainer: { flexDirection: 'row', backgroundColor: '#1e293b', margin: 24, borderRadius: 12, padding: 4 },
    tab: { flex: 1, paddingVertical: 10, borderRadius: 8 },
    activeTab: { backgroundColor: '#334155' },
    tabText: { color: '#94a3b8', textAlign: 'center', fontWeight: 'bold' },
    activeTabText: { color: 'white' },
    historyItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 16, padding: 16, marginBottom: 12 },
    iconContainer: { width: 56, height: 56, justifyContent: 'center', alignItems: 'center', backgroundColor: '#334155', borderRadius: 12, marginRight: 16 },
    giftIcon: { fontSize: 28 },
    detailContainer: { flex: 1 },
    detailTitle: { color: 'white', fontWeight: 'bold', fontSize: 15 },
    detailSubtitle: { color: '#64748b', fontSize: 12, marginTop: 2 },
    costText: { fontWeight: 'bold', fontSize: 14 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: '30%' },
    emptyIcon: { fontSize: 48, opacity: 0.5 },
    emptyText: { color: '#64748b', marginTop: 16, fontSize: 16, fontWeight: 'bold' }
});

export default GiftHistory;
