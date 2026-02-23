import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import { RAZORPAY_CONFIG, COIN_PACKAGES } from '../constants'; // Assuming these are in constants
import { ViewState } from '../types';

interface WalletProps {
  route: { params: { userType: 'user' | 'host', balance: number } };
  navigation: any;
}

const Wallet: React.FC<WalletProps> = ({ route, navigation }) => {
    const { userType, balance } = route.params;

    const handlePurchase = (pkg: { coins: number; price: string }) => {
      const amount = parseInt(pkg.price.replace(/[^\d]/g, ''), 10);
      
      const options = {
          description: `Purchase ${pkg.coins} Coins`,
          image: 'https://via.placeholder.com/150/EC4899/FFFFFF?text=Z',
          currency: 'INR',
          key: RAZORPAY_CONFIG.keyId,
          amount: amount * 100,
          name: 'Zinngle App',
          prefill: {
              email: 'user@zinngle.com',
              contact: '9999999999',
              name: 'Zinngle User'
          },
          theme: { color: '#EC4899' }
      };

      RazorpayCheckout.open(options).then((data) => {
          // handle success
          Alert.alert(`Success`, `Payment successful: ${data.razorpay_payment_id}`);
          // onAddCoins(pkg.coins) would be called here via state management
          navigation.navigate(ViewState.TRANSACTION_DETAILS, { transactionId: data.razorpay_payment_id });
      }).catch((error) => {
          // handle failure
          Alert.alert(`Error`, `Payment failed: ${error.code} ${error.description}`);
      });
  };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backText}>‹</Text></TouchableOpacity>
                <Text style={styles.title}>My Wallet</Text>
                <View style={{width: 20}}/>
            </View>
            
            <ScrollView>
                <View style={styles.balanceSection}>
                    <Text style={styles.balanceLabel}>Total Balance</Text>
                    <Text style={styles.balanceAmount}>🪙 {balance.toLocaleString()}</Text>
                    <TouchableOpacity style={styles.autoReloadBtn} onPress={() => navigation.navigate(ViewState.AUTO_RELOAD)}>
                        <Text style={styles.autoReloadText}>Auto-Reload Settings</Text>
                    </TouchableOpacity>
                </View>

                {userType === 'host' && (
                    <View style={styles.hostActions}>
                        <TouchableOpacity style={styles.hostBtn} onPress={() => navigation.navigate(ViewState.WITHDRAWAL)}><Text style={styles.hostBtnText}>Withdraw</Text></TouchableOpacity>
                    </View>
                )}

                <View style={styles.p24}>
                    <Text style={styles.sectionTitle}>🛍️ Top Up Coins</Text>
                    <View style={styles.packageGrid}>
                        {COIN_PACKAGES.map((pkg, idx) => (
                            <TouchableOpacity key={idx} style={[styles.packageCard, pkg.popular && styles.popularPackage]} onPress={() => handlePurchase(pkg)}>
                                {pkg.popular && <Text style={styles.popularTag}>BEST VALUE</Text>}
                                <Text style={styles.packageCoins}>🪙 {pkg.coins}</Text>
                                <Text style={styles.packagePrice}>{pkg.price}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                
                <View style={styles.p24}>
                    <Text style={styles.sectionTitle}>🕒 Recent Activity</Text>
                    <View style={styles.activityList}>
                        <TouchableOpacity style={styles.activityItem} onPress={() => navigation.navigate(ViewState.TRANSACTION_DETAILS, {id: '1'})}>
                            <View style={styles.activityIcon}><Text>📞</Text></View>
                            <View><Text style={styles.activityTitle}>Call with Aria</Text><Text style={styles.activityDate}>Yesterday</Text></View>
                            <Text style={[styles.activityAmount, {color: '#ef4444'}]}>-240</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.activityItem} onPress={() => navigation.navigate(ViewState.TRANSACTION_DETAILS, {id: '2'})}>
                             <View style={[styles.activityIcon, {backgroundColor:'#dcfce7'}]}><Text>➕</Text></View>
                             <View><Text style={styles.activityTitle}>Purchased Coins</Text><Text style={styles.activityDate}>2 days ago</Text></View>
                             <Text style={[styles.activityAmount, {color: '#22c55e'}]}>+100</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    p24: { padding: 24 },
    header: { flexDirection: 'row', alignItems: 'center', padding: 24, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
    backText: { color: 'white', fontSize: 32 },
    title: { flex: 1, color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
    balanceSection: { padding: 24, alignItems: 'center', backgroundColor: '#1e293b', margin: 24, borderRadius: 24 },
    balanceLabel: { color: '#94a3b8', fontSize: 14, textTransform: 'uppercase' },
    balanceAmount: { color: 'white', fontSize: 48, fontWeight: 'bold', marginVertical: 8 },
    autoReloadBtn: { backgroundColor: '#334155', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    autoReloadText: { color: '#cbd5e1', fontWeight: 'bold' },
    hostActions: { paddingHorizontal: 24, marginBottom: 12 },
    hostBtn: { flex: 1, backgroundColor: '#4f46e5', padding: 12, borderRadius: 12, alignItems: 'center' },
    hostBtnText: { color: 'white', fontWeight: 'bold' },
    sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    packageGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    packageCard: { width: '48%', backgroundColor: '#1e293b', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 16, borderWidth: 2, borderColor: '#334155' },
    popularPackage: { borderColor: '#db2777' },
    popularTag: { position: 'absolute', top: -10, backgroundColor: '#db2777', color: 'white', fontSize: 10, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
    packageCoins: { fontSize: 24, color: '#fbbf24', fontWeight: 'bold' },
    packagePrice: { color: '#94a3b8', marginTop: 4 },
    activityList: { },
    activityItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 16, borderRadius: 12, marginBottom: 12 },
    activityIcon: { width: 40, height: 40, borderRadius: 20, justifyContent:'center', alignItems:'center', backgroundColor: '#fce7f3', marginRight: 12 },
    activityTitle: { color: 'white', fontWeight: 'bold' },
    activityDate: { color: '#64748b', fontSize: 12 },
    activityAmount: { marginLeft: 'auto', fontWeight: 'bold', fontSize: 16 }
});

export default Wallet;
