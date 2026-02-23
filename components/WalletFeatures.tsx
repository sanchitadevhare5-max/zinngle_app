import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// --- WITHDRAWAL COMPONENT ---
export const Withdrawal: React.FC<{onBack: () => void}> = ({ onBack }) => {
    const [amount, setAmount] = useState('');
    const balance = 1250; // Mock

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}><Text style={styles.backText}>‹</Text></TouchableOpacity>
                <Text style={styles.title}>Withdraw Funds</Text>
                <View style={{width: 20}}/>
            </View>
            <View style={styles.content}>
                <Text style={styles.subtitle}>Available Balance: ₹{balance.toLocaleString()}</Text>
                <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="Enter amount to withdraw" placeholderTextColor="#475569" keyboardType="numeric"/>
                <Text style={styles.label}>Withdrawal Method</Text>
                <View style={styles.methodToggleContainer}>
                    <TouchableOpacity style={[styles.methodToggle, styles.activeToggle]}><Text style={styles.activeToggleText}>UPI</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.methodToggle}><Text style={styles.toggleText}>Bank Transfer</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.mainButton}><Text style={styles.mainButtonText}>Request Withdrawal</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// --- AUTO-RELOAD COMPONENT ---
export const AutoReload: React.FC<{onBack: () => void}> = ({ onBack }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}><Text style={styles.backText}>‹</Text></TouchableOpacity>
                <Text style={styles.title}>Auto-Reload</Text>
                <View style={{width: 20}}/>
            </View>
            <View style={styles.content}>
                <View style={styles.switchRow}>
                    <Text style={styles.label}>Enable Auto-Reload</Text>
                    <Switch value={isEnabled} onValueChange={setIsEnabled} trackColor={{false: '#334155', true: '#16a34a'}} thumbColor="#fff"/>
                </View>
                <Text style={styles.subtitle}>When your balance drops below 100 coins, we'll automatically top it up.</Text>
                <View style={styles.optionGrid}>
                    <TouchableOpacity style={styles.optionCard}><Text style={styles.optionText}>+200 Coins</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.optionCard, styles.activeOption]}><Text style={styles.optionText}>+500 Coins</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.optionCard}><Text style={styles.optionText}>+1000 Coins</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.mainButton}><Text style={styles.mainButtonText}>Save Settings</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// --- TRANSACTION DETAILS COMPONENT ---
export const TransactionDetails: React.FC<{onBack: () => void}> = ({ onBack }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}><Text style={styles.backText}>‹</Text></TouchableOpacity>
                <Text style={styles.title}>Transaction Details</Text>
                <View style={{width: 20}}/>
            </View>
            <View style={styles.content}>
                <View style={styles.receiptHeader}>
                    <Text style={styles.receiptAmount}>-240 🪙</Text>
                    <Text style={styles.receiptStatus}>Completed</Text>
                </View>
                <View style={styles.receiptDetails}>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Transaction ID</Text><Text style={styles.detailValue}>txn_123abc456</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Date</Text><Text style={styles.detailValue}>Jan 20, 2026, 10:34 PM</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Type</Text><Text style={styles.detailValue}>Call Charges</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>Recipient</Text><Text style={styles.detailValue}>Aria Vibe</Text></View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 24, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
    backText: { color: 'white', fontSize: 32 },
    title: { flex: 1, color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
    content: { padding: 24 },
    subtitle: { color: '#94a3b8', marginBottom: 24 },
    input: { backgroundColor: '#1e293b', color: 'white', padding: 16, borderRadius: 12, fontSize: 16, marginBottom: 16 },
    label: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8 },
    methodToggleContainer: { flexDirection: 'row', marginBottom: 16 },
    methodToggle: { flex: 1, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#334155', alignItems: 'center', marginRight: 12 },
    activeToggle: { backgroundColor: '#4f46e5', borderColor: '#4f46e5' },
    toggleText: { color: '#94a3b8' },
    activeToggleText: { color: 'white', fontWeight: 'bold' },
    mainButton: { backgroundColor: '#db2777', padding: 18, borderRadius: 12, alignItems: 'center' },
    mainButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: 16, borderRadius: 12, marginBottom: 12 },
    optionGrid: { flexDirection: 'row', marginBottom: 24 },
    optionCard: { flex: 1, backgroundColor: '#1e293b', padding: 20, borderRadius: 12, alignItems: 'center', marginRight: 12 },
    activeOption: { backgroundColor: '#4f46e5' },
    optionText: { color: 'white', fontWeight: 'bold' },
    receiptHeader: { alignItems: 'center', marginBottom: 24, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
    receiptAmount: { fontSize: 48, fontWeight: 'bold', color: '#ef4444' },
    receiptStatus: { color: '#22c55e', fontWeight: 'bold', marginTop: 8 },
    receiptDetails: { width: '100%' },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    detailLabel: { color: '#94a3b8' },
    detailValue: { color: 'white', fontWeight: 'bold' }
});
