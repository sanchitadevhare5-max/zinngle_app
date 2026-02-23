import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { GIFTS } from '../constants';
import { Gift } from '../types';

const GiftStore: React.FC = () => {
    const navigation = useNavigation();
    // Mock user coins for standalone testing
    const userCoins = 500; 

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [previewGift, setPreviewGift] = useState<Gift | null>(null);

    const categories = ['All', ...Array.from(new Set(GIFTS.map((g: Gift) => g.category || 'Other')))];

    const filteredGifts = selectedCategory === 'All' 
        ? GIFTS 
        : GIFTS.filter((g: Gift) => g.category === selectedCategory);

    const handleSendGift = () => {
        if (!previewGift) return;
        if (userCoins < previewGift.cost) {
            Alert.alert("Insufficient Coins", "You don't have enough coins to send this gift.");
        } else {
            Alert.alert("Gift Sent!", `You have sent the ${previewGift.name} gift.`);
            // Deduct coins logic would go here
        }
        setPreviewGift(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Gift Store</Text>
                <View style={styles.coinBadge}>
                    <Text style={styles.coinText}>🪙 {userCoins}</Text>
                </View>
            </View>

            {/* Category Tabs */}
            <View style={styles.tabsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 24}}>
                    {categories.map(cat => (
                        <TouchableOpacity 
                            key={cat}
                            onPress={() => setSelectedCategory(cat)}
                            style={[styles.tab, selectedCategory === cat && styles.activeTab]}
                        >
                            <Text style={[styles.tabText, selectedCategory === cat && styles.activeTabText]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Gifts Grid */}
            <ScrollView contentContainerStyle={styles.grid}>
                {filteredGifts.map((gift: Gift) => (
                    <TouchableOpacity 
                        key={gift.id}
                        style={styles.giftCard}
                        onPress={() => setPreviewGift(gift)}
                    >
                        <Text style={styles.giftEmoji}>{gift.icon}</Text>
                        <Text style={styles.giftName} numberOfLines={1}>{gift.name}</Text>
                        <View style={styles.priceContainer}>
                             <Text style={styles.giftPrice}>{gift.cost}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Gift Preview Modal */}
            <Modal visible={!!previewGift} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setPreviewGift(null)}>
                            <Text style={styles.closeBtnText}>X</Text>
                        </TouchableOpacity>

                        <View style={styles.previewIconContainer}>
                            <Text style={styles.previewEmoji}>{previewGift?.icon}</Text>
                        </View>
                        
                        <Text style={styles.previewName}>{previewGift?.name}</Text>
                        <Text style={styles.previewDesc}>Send this gift to show your support!</Text>
                        
                        <View style={styles.previewPriceContainer}>
                            <Text style={styles.previewPrice}>🪙 {previewGift?.cost}</Text>
                        </View>

                        <TouchableOpacity style={styles.sendBtn} onPress={handleSendGift}>
                            <Text style={styles.sendBtnText}>Send Gift</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 24, paddingBottom: 12 },
    backBtn: { marginRight: 16, padding: 4 },
    backText: { color: 'white', fontSize: 32 },
    title: { flex: 1, color: 'white', fontSize: 22, fontWeight: 'bold' },
    coinBadge: { backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#334155' },
    coinText: { color: '#fbbf24', fontWeight: 'bold', fontSize: 14 },
    tabsContainer: { paddingVertical: 12 },
    tab: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#1e293b', marginRight: 8 },
    activeTab: { backgroundColor: '#db2777' },
    tabText: { color: '#94a3b8', fontWeight: 'bold' },
    activeTabText: { color: 'white' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, paddingTop: 10 },
    giftCard: { width: '30%', aspectRatio: 1, backgroundColor: '#1e293b', padding: 12, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155', marginBottom: 12, marginHorizontal: '1.66%' },
    giftEmoji: { fontSize: 32, marginBottom: 8 },
    giftName: { color: 'white', fontSize: 13, fontWeight: 'bold', textAlign: 'center' },
    priceContainer: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(15,23,42,0.7)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
    giftPrice: { color: '#facc15', fontSize: 10, fontWeight: 'bold' },
    
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 24 },
    modalContent: { width: '100%', backgroundColor: '#0f172a', borderRadius: 24, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
    closeBtn: { position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: 16, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center' },
    closeBtnText: { color: '#64748b', fontWeight: 'bold' },
    previewIconContainer: { width: 128, height: 128, borderRadius: 64, backgroundColor: '#1e293b', justifyContent:'center', alignItems:'center', marginBottom: 24, borderWidth: 1, borderColor: '#334155' },
    previewEmoji: { fontSize: 72 },
    previewName: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    previewDesc: { color: '#94a3b8', fontSize: 14, marginTop: 8, marginBottom: 24 },
    previewPriceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
    previewPrice: { color: '#facc15', fontSize: 32, fontWeight: 'bold', marginLeft: 8 },
    sendBtn: { backgroundColor: '#db2777', width: '100%', padding: 18, borderRadius: 16, alignItems: 'center' },
    sendBtnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});

export default GiftStore;
