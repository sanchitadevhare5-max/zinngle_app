import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { ViewState } from '../types';

const STEPS = [
    { id: ViewState.HOST_WELCOME, title: 'Become a Host' },
    { id: ViewState.HOST_PROFILE_FORM, title: 'Your Profile' },
    { id: ViewState.HOST_VERIFICATION, title: 'Verification' },
    { id: ViewState.HOST_PRICING, title: 'Set Your Rates' },
    { id: ViewState.HOST_PAYMENT, title: 'Payment Info' },
];

interface HostOnboardingProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onComplete: () => void;
}

const HostOnboarding: React.FC<HostOnboardingProps> = ({ currentView, onChangeView, onComplete }) => {
    const [price, setPrice] = useState('20');
    const activeIndex = STEPS.findIndex(s => s.id === currentView);

    const goNext = () => {
        if (activeIndex < STEPS.length - 1) {
            onChangeView(STEPS[activeIndex + 1].id);
        } else {
            onComplete();
        }
    };

    const renderContent = () => {
        switch(currentView) {
            case ViewState.HOST_WELCOME:
                return (
                    <View style={styles.centerContent}>
                        <Text style={styles.icon}>⭐</Text>
                        <Text style={styles.title}>Become a Star on Zinngle</Text>
                        <Text style={styles.subtitle}>Connect with fans, share your talents, and earn money on your own schedule.</Text>
                        <View style={styles.featureList}>
                            <View style={styles.featureCard}>
                                <Text style={styles.featureIcon}>📹</Text>
                                <View style={styles.featureTextContainer}>
                                    <Text style={styles.featureTitle}>Live Video Calls</Text>
                                    <Text style={styles.featureDesc}>Engage in one-on-one video calls with your followers.</Text>
                                </View>
                            </View>
                            <View style={styles.featureCard}>
                                <Text style={styles.featureIcon}>💰</Text>
                                <View style={styles.featureTextContainer}>
                                    <Text style={styles.featureTitle}>Get Paid Securely</Text>
                                    <Text style={styles.featureDesc}>Receive your earnings directly through our secure payment system.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case ViewState.HOST_PROFILE_FORM:
                 return (
                    <ScrollView>
                        <Text style={styles.label}>Public Name</Text>
                        <TextInput style={styles.input} placeholder="How you'll appear to users" placeholderTextColor="#475569" />
                        <Text style={styles.label}>Bio</Text>
                        <TextInput style={[styles.input, {height: 100}]} multiline placeholder="Tell everyone a bit about yourself" placeholderTextColor="#475569" />
                        <Text style={styles.label}>Category Tags</Text>
                        <TextInput style={styles.input} placeholder="e.g., Music, Gaming, Fitness" placeholderTextColor="#475569" />
                    </ScrollView>
                );
            case ViewState.HOST_VERIFICATION:
                return (
                    <View style={styles.centerContent}>
                        <Text style={styles.title}>Verify Your Identity</Text>
                        <Text style={styles.subtitle}>To ensure the safety of our community, we require all hosts to complete a quick verification process.</Text>
                        <TouchableOpacity style={styles.cameraBtn}>
                            <Text style={styles.cameraIcon}>📷</Text>
                            <Text style={styles.cameraText}>Scan Government ID</Text>
                        </TouchableOpacity>
                        <Text style={styles.disclaimer}>Your information is kept private and secure.</Text>
                    </View>
                );
            case ViewState.HOST_PRICING:
                return(
                    <View style={styles.centerContent}>
                        <Text style={styles.title}>Set Your Per-Minute Rate</Text>
                        <Text style={styles.subtitle}>You can change this at any time from your dashboard.</Text>
                        <View style={styles.priceContainer}>
                             <Text style={styles.priceCurrency}>🪙</Text>
                             <TextInput style={styles.priceInput} value={price} onChangeText={setPrice} keyboardType="numeric" />
                             <Text style={styles.pricePerMinute}>/ minute</Text>
                        </View>
                        <Text style={styles.disclaimer}>Zinngle takes a 20% platform fee.</Text>
                    </View>
                );
            case ViewState.HOST_PAYMENT:
                 return (
                    <View style={styles.centerContent}>
                        <Text style={styles.title}>Set Up Payouts</Text>
                        <Text style={styles.subtitle}>Connect your bank account to receive your earnings securely.</Text>
                        <TouchableOpacity style={styles.mainButton} onPress={() => Alert.alert("Connect Bank", "Stripe/Plaid integration would go here.")}>
                            <Text style={styles.mainButtonText}>Connect Bank Account</Text>
                        </TouchableOpacity>
                    </View>
                );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                 <TouchableOpacity onPress={() => onChangeView(ViewState.USER_TYPE_SELECT)}><Text style={{color:'white'}}>‹ Back</Text></TouchableOpacity>
                 <Text style={styles.headerTitle}>{STEPS.find(s => s.id === currentView)?.title}</Text>
                 <View style={{width: 50}} />
            </View>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${((activeIndex + 1) / STEPS.length) * 100}%` }]} />
            </View>
            <View style={styles.content}>{renderContent()}</View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.mainButton} onPress={goNext}>
                    <Text style={styles.mainButtonText}>{activeIndex === STEPS.length - 1 ? 'Finish' : 'Continue'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 24 },
    headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    progressBarContainer: { height: 4, backgroundColor: '#1e293b' },
    progressBar: { height: '100%', backgroundColor: '#db2777' },
    content: { flex: 1, padding: 24 },
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    icon: { fontSize: 60, marginBottom: 20 },
    title: { fontSize: 26, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 12 },
    subtitle: { fontSize: 16, color: '#94a3b8', textAlign: 'center', marginBottom: 32 },
    featureList: { width: '100%', marginTop: 16 },
    featureCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 16, padding: 20, marginBottom: 16 },
    featureIcon: { fontSize: 24, marginRight: 16 },
    featureTextContainer: { flex: 1 },
    featureTitle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    featureDesc: { color: '#94a3b8', fontSize: 12, marginTop: 2 },
    label: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, marginTop: 16 },
    input: { backgroundColor: '#1e293b', color: 'white', paddingHorizontal: 16, paddingVertical: 18, borderRadius: 12, fontSize: 16, marginBottom: 16 },
    cameraBtn: { backgroundColor: '#334155', borderRadius: 12, padding: 24, alignItems: 'center', marginBottom: 12 },
    cameraIcon: { fontSize: 40, marginBottom: 8 },
    cameraText: { color: 'white', fontWeight: 'bold' },
    disclaimer: { fontSize: 12, color: '#64748b', textAlign: 'center' },
    priceContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 16, paddingHorizontal: 24 },
    priceCurrency: { color: '#fbbf24', fontSize: 32, marginRight: 8 },
    priceInput: { flex: 1, color: 'white', fontSize: 48, fontWeight: 'bold' },
    pricePerMinute: { color: '#94a3b8' },
    footer: { padding: 24, borderTopWidth: 1, borderTopColor: '#1e293b' },
    mainButton: { backgroundColor: '#db2777', padding: 18, borderRadius: 12, alignItems: 'center' },
    mainButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});

export default HostOnboarding;
