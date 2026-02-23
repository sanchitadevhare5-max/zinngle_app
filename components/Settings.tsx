import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ViewState } from '../types';

interface SettingsProps {
  route: { params: { initialView?: ViewState } };
  navigation: any;
}

const FAQ_ITEMS = [
    { q: "How do I buy coins?", a: "You can purchase coins in the Wallet section using your credit card, debit card, or UPI." },
    { q: "Can I get a refund?", a: "Refunds are processed on a case-by-case basis. Please contact support within 24 hours of the transaction." },
    { q: "How do I become a Host?", a: "Go to Account Settings and check if you are eligible to switch to a Host account, or sign up as a Host/Tele-caller." },
    { q: "Is my video call recorded?", a: "No, Zinngle does not record video calls. Your privacy is our priority." },
];

const Settings: React.FC<SettingsProps> = ({ route, navigation }) => {
    const { initialView = ViewState.SETTINGS_MAIN } = route.params || {};
    const [view, setView] = useState<ViewState>(initialView);
    
    const [notifications, setNotifications] = useState({ calls: true, messages: true, promo: false });
    const [privacy, setPrivacy] = useState({ online: true, tagging: true });

    const handleLogout = () => {
        Alert.alert('Log Out', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log Out', onPress: () => navigation.navigate('Auth'), style: 'destructive' }
        ]);
    };

    const renderHeader = (title: string, backView?: ViewState) => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => backView ? setView(backView) : navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={{width: 40}}/>
        </View>
    );

    const renderContent = () => {
        switch(view) {
            case ViewState.SETTINGS_ACCOUNT:
                return (
                    <ScrollView style={styles.p24}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput defaultValue="John Doe" style={styles.input} placeholderTextColor="#64748b" />
                        <Text style={styles.label}>Email</Text>
                        <TextInput defaultValue="john@example.com" style={styles.input} placeholderTextColor="#64748b" keyboardType="email-address"/>
                        <Text style={styles.label}>Phone</Text>
                        <TextInput defaultValue="+1 234 567 8900" style={[styles.input, styles.disabledInput]} editable={false} />
                        <TouchableOpacity style={styles.mainButton}><Text style={styles.mainButtonText}>Save Changes</Text></TouchableOpacity>
                        <TouchableOpacity style={{marginTop: 24}}><Text style={{color: '#ef4444', textAlign:'center'}}>Delete Account</Text></TouchableOpacity>
                    </ScrollView>
                );
            case ViewState.SETTINGS_PRIVACY:
                 return (
                     <View style={styles.p24}>
                        <View style={styles.toggleItem}><View><Text style={styles.toggleTitle}>Show Online Status</Text><Text style={styles.toggleDesc}>Let others see when you are active</Text></View><Switch value={privacy.online} onValueChange={v => setPrivacy({...privacy, online:v})} /></View>
                        <View style={styles.toggleItem}><View><Text style={styles.toggleTitle}>Allow Tagging</Text><Text style={styles.toggleDesc}>Allow others to mention you</Text></View><Switch value={privacy.tagging} onValueChange={v => setPrivacy({...privacy, tagging:v})} /></View>
                        <TouchableOpacity style={styles.menuButton}><Text style={styles.menuButtonText}>Blocked Users</Text><Text style={styles.chevron}>›</Text></TouchableOpacity>
                     </View>
                 );
            case ViewState.SETTINGS_NOTIFICATIONS:
                return (
                     <View style={styles.p24}>
                        {Object.entries(notifications).map(([key, val]) => (
                            <View key={key} style={styles.toggleItem}>
                                <View><Text style={styles.toggleTitle} className="capitalize">{key}</Text><Text style={styles.toggleDesc}>Push notifications for {key}</Text></View>
                                <Switch value={val} onValueChange={v => setNotifications(n=>({...n, [key]:v}))} />
                            </View>
                        ))}
                     </View>
                );
            case ViewState.HELP_CENTER:
                return (
                    <View style={styles.p24}>
                        <TouchableOpacity style={styles.helpItem} onPress={() => setView(ViewState.FAQ)}><Text style={styles.helpIcon}>❓</Text><Text style={styles.helpText}>FAQ</Text><Text style={styles.chevron}>›</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.helpItem} onPress={() => setView(ViewState.CONTACT_SUPPORT)}><Text style={styles.helpIcon}>🎧</Text><Text style={styles.helpText}>Contact Support</Text><Text style={styles.chevron}>›</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.helpItem} onPress={() => setView(ViewState.REPORT_ISSUE)}><Text style={styles.helpIcon}>🐞</Text><Text style={styles.helpText}>Report an Issue</Text><Text style={styles.chevron}>›</Text></TouchableOpacity>
                    </View>
                );
            case ViewState.FAQ:
                return (
                    <ScrollView style={styles.p24}>
                        {FAQ_ITEMS.map((item, i) => (
                            <View key={i} style={styles.faqItem}>
                                <Text style={styles.faqQuestion}>{item.q}</Text>
                                <Text style={styles.faqAnswer}>{item.a}</Text>
                            </View>
                        ))}
                    </ScrollView>
                );
            case ViewState.CONTACT_SUPPORT: case ViewState.REPORT_ISSUE:
                const isReport = view === ViewState.REPORT_ISSUE;
                return (
                    <View style={styles.p24}>
                        <Text style={styles.label}>Subject</Text>
                        <TextInput style={styles.input} placeholder={isReport ? "Bug summary" : "How can we help?"} placeholderTextColor="#64748b" />
                        <Text style={styles.label}>Description</Text>
                        <TextInput style={[styles.input, {height: 120, textAlignVertical: 'top'}]} multiline placeholder="Provide details..." placeholderTextColor="#64748b"/>
                        <TouchableOpacity style={styles.mainButton}><Text style={styles.mainButtonText}>Submit</Text></TouchableOpacity>
                    </View>
                );
             case ViewState.LEGAL_TOS: case ViewState.LEGAL_PRIVACY:
                const isTos = view === ViewState.LEGAL_TOS;
                return (
                    <ScrollView style={styles.p24}>
                        <Text style={styles.legalText}>Last updated: October 2023...</Text>
                    </ScrollView>
                );
            case ViewState.ABOUT:
                 return (
                    <View style={[styles.p24, {alignItems: 'center', justifyContent: 'center'}]}>
                        <View style={styles.aboutIcon}><Text style={{fontSize: 50}}>⚡</Text></View>
                        <Text style={styles.aboutTitle}>Zinngle</Text>
                        <Text style={styles.aboutVersion}>Version 1.0.0 (Beta)</Text>
                    </View>
                );
            default: // Main settings menu
                return (
                    <ScrollView style={styles.p24}>
                        <Text style={styles.sectionTitle}>Account</Text>
                        <View style={styles.menuGroup}>
                            <TouchableOpacity style={styles.menuButton} onPress={() => setView(ViewState.SETTINGS_ACCOUNT)}><Text style={styles.menuIcon}>👤</Text><Text style={styles.menuButtonText}>Account Info</Text><Text style={styles.chevron}>›</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.menuButton} onPress={() => setView(ViewState.SETTINGS_PRIVACY)}><Text style={styles.menuIcon}>🛡️</Text><Text style={styles.menuButtonText}>Privacy</Text><Text style={styles.chevron}>›</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.menuButton} onPress={() => setView(ViewState.SETTINGS_NOTIFICATIONS)}><Text style={styles.menuIcon}>🔔</Text><Text style={styles.menuButtonText}>Notifications</Text><Text style={styles.chevron}>›</Text></TouchableOpacity>
                        </View>

                        <Text style={styles.sectionTitle}>Support</Text>
                        <View style={styles.menuGroup}>
                            <TouchableOpacity style={styles.menuButton} onPress={() => setView(ViewState.HELP_CENTER)}><Text style={styles.menuIcon}>❓</Text><Text style={styles.menuButtonText}>Help Center</Text><Text style={styles.chevron}>›</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.menuButton} onPress={() => setView(ViewState.ABOUT)}><Text style={styles.menuIcon}>ℹ️</Text><Text style={styles.menuButtonText}>About Zinngle</Text><Text style={styles.chevron}>›</Text></TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity style={[styles.menuButton, {marginTop: 24}]} onPress={handleLogout}><Text style={styles.menuIcon}>🚪</Text><Text style={[styles.menuButtonText, {color: '#ef4444'}]}>Log Out</Text></TouchableOpacity>
                    </ScrollView>
                );
        }
    };

    const getHeaderInfo = () => {
        switch(view) {
            case ViewState.SETTINGS_ACCOUNT: return { title: 'Account', back: ViewState.SETTINGS_MAIN };
            case ViewState.SETTINGS_PRIVACY: return { title: 'Privacy', back: ViewState.SETTINGS_MAIN };
            case ViewState.SETTINGS_NOTIFICATIONS: return { title: 'Notifications', back: ViewState.SETTINGS_MAIN };
            case ViewState.HELP_CENTER: return { title: 'Help Center', back: ViewState.SETTINGS_MAIN };
            case ViewState.FAQ: return { title: 'FAQ', back: ViewState.HELP_CENTER };
            case ViewState.CONTACT_SUPPORT: return { title: 'Contact Support', back: ViewState.HELP_CENTER };
            case ViewState.REPORT_ISSUE: return { title: 'Report Issue', back: ViewState.HELP_CENTER };
            case ViewState.LEGAL_TOS: return { title: 'Terms of Service', back: ViewState.SETTINGS_MAIN };
            case ViewState.LEGAL_PRIVACY: return { title: 'Privacy Policy', back: ViewState.SETTINGS_MAIN };
            case ViewState.ABOUT: return { title: 'About', back: ViewState.SETTINGS_MAIN };
            default: return { title: 'Settings', back: undefined };
        }
    }

    const { title, back } = getHeaderInfo();

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader(title, back)}
            {renderContent()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    p24: { padding: 24 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
    backButton: { width: 40, height: 40, justifyContent: 'center' },
    backIcon: { color: 'white', fontSize: 32 },
    headerTitle: { flex: 1, color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
    sectionTitle: { color: '#64748b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 16, marginBottom: 8 },
    menuGroup: { backgroundColor: '#1e293b', borderRadius: 16 },
    menuButton: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#334155' },
    menuIcon: { fontSize: 16, width: 24, textAlign: 'center' },
    menuButtonText: { color: 'white', fontSize: 16, flex: 1, marginLeft: 12 },
    chevron: { color: '#64748b' },
    label: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 16, marginBottom: 8 },
    input: { backgroundColor: '#1e293b', paddingHorizontal: 16, height: 56, borderRadius: 12, color: 'white', fontSize: 16, borderWidth: 1, borderColor: '#334155' },
    disabledInput: { backgroundColor: '#1e293b', color: '#94a3b8' },
    mainButton: { backgroundColor: '#db2777', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 24 },
    mainButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    toggleItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1e293b', padding: 16, borderRadius: 12, marginBottom: 10 },
    toggleTitle: { color: 'white', fontSize: 16, fontWeight: '500' },
    toggleDesc: { color: '#64748b', fontSize: 12, marginTop: 2 },
    helpItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 20, borderRadius: 16, marginBottom: 12 },
    helpIcon: { fontSize: 20, marginRight: 16 },
    helpText: { flex: 1, color: 'white', fontSize: 16, fontWeight: 'bold' },
    faqItem: { backgroundColor: '#1e293b', padding: 16, borderRadius: 12, marginBottom: 12 },
    faqQuestion: { color: 'white', fontWeight: 'bold', marginBottom: 8 },
    faqAnswer: { color: '#94a3b8', lineHeight: 20 },
    legalText: { color: '#94a3b8', lineHeight: 22 },
    aboutIcon: { width: 96, height: 96, borderRadius: 24, backgroundColor: '#db2777', justifyContent:'center', alignItems:'center', marginBottom: 24 },
    aboutTitle: { fontSize: 32, color: 'white', fontWeight: 'bold' },
    aboutVersion: { color: '#64748b', marginTop: 4 },
});

export default Settings;
