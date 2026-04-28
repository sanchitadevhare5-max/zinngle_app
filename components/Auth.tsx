import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  FlatList,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import { ViewState } from '../types';
import { supabase } from '../services/supabase';
import { translations } from '../services/translations';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { getOtp, startOtpListener, removeOtpListener } from 'react-native-otp-verify';

const { width } = Dimensions.get('window');

interface AuthProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onComplete: () => void;
}

const COUNTRIES = [
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+218', flag: '🇱🇾', name: 'Libya' },
    { code: '+261', flag: '🇲🇬', name: 'Madagascar' },
    { code: '+977', flag: '🇳🇵', name: 'Nepal' },
    { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: '+63', flag: '🇵🇭', name: 'Philippines' },
];

const LANGUAGES = [
  { id: 'en', name: 'English', nativeName: 'English' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { id: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { id: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { id: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { id: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

export const Auth: React.FC<AuthProps> = ({ currentView, onChangeView, onComplete }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [selectedLang, setSelectedLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [confirm, setConfirm] = useState<any>(null);
  const isVerifyingRef = useRef(false);

  const t = translations[selectedLang] || translations['en'];

  useEffect(() => {
    if (currentView === ViewState.OTP_VERIFY) {
      setOtp('');
      isVerifyingRef.current = false;

      if (Platform.OS === 'android') {
        startOtpListener(message => {
          const otpMatch = /(\d{6})/g.exec(message);
          if (otpMatch && otpMatch[1]) {
            setIsAutoFilling(true);
            setOtp(otpMatch[1]);
            setTimeout(() => setIsAutoFilling(false), 1500);
          }
        });
      }
      return () => {
        if (Platform.OS === 'android') removeOtpListener();
      };
    }
  }, [currentView]);

  const handlePhoneSubmit = async () => {
    if (phone.length < 5) {
        Alert.alert(t.invalidNumber, t.invalidNumberDesc);
        return;
    }
    setIsLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(`${selectedCountry.code}${phone}`);
      setConfirm(confirmation);
      onChangeView(ViewState.OTP_VERIFY);
    } catch (error: any) {
      Alert.alert('OTP Request Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      onComplete();
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      Alert.alert('Success', 'Check your email for the confirmation link');
      onChangeView(ViewState.LOGIN_EMAIL);
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({ provider: 'google', token: idToken });
        if (error) throw error;
        if (data.session) onComplete();
      }
    } catch (error: any) {
      if (error.code !== statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Google Sign-In Error', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6 || isVerifyingRef.current) return;
    isVerifyingRef.current = true;
    setIsLoading(true);
    try {
      if (confirm) {
        await confirm.confirm(otp);
        onComplete();
      }
    } catch (error: any) {
      isVerifyingRef.current = false;
      Alert.alert('Invalid OTP', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (otp.length === 6 && !isVerifyingRef.current && currentView === ViewState.OTP_VERIFY) {
      handleOtpSubmit();
    }
  }, [otp]);

  const BackButton = ({ targetView }: { targetView: ViewState }) => (
     <TouchableOpacity style={styles.backButton} onPress={() => onChangeView(targetView)}>
         <Text style={{color: 'white', fontSize: 24}}>←</Text>
     </TouchableOpacity>
  );

  const renderContent = () => {
      switch(currentView) {
          case ViewState.LANGUAGE_SELECT:
              return (
                  <View style={styles.fullWidth}>
                    <View style={styles.langHeader}>
                         <View style={styles.langIconContainer}>
                             <Text style={{fontSize: 24, color: 'white'}}>A文</Text>
                         </View>
                         <Text style={styles.h2}>{t.chooseLanguage}</Text>
                         <Text style={styles.p}>{t.selectPreferred}</Text>
                    </View>
                    <View style={styles.langGrid}>
                      {LANGUAGES.map((lang) => (
                        <TouchableOpacity 
                          key={lang.id} 
                          onPress={() => setSelectedLang(lang.id)} 
                          style={[styles.langGridItem, selectedLang === lang.id && styles.langGridItemActive]}
                        >
                          <Text style={styles.langGridName}>{lang.nativeName}</Text>
                          <Text style={styles.langGridSubName}>{lang.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
              )
          case ViewState.AUTH_METHOD:
              return (
                <View style={styles.centerBox}>
                    <Image source={require('../assets/app_logo.jpeg')} style={styles.logo} />
                    <Text style={styles.h2}>{t.welcome}</Text>
                    <Text style={styles.p}>{t.tagline}</Text>
                    <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn} disabled={isLoading}>
                        {isLoading ? <ActivityIndicator color="#0f172a" /> : <Text style={styles.socialBtnText}>{t.continueGoogle}</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} onPress={() => onChangeView(ViewState.LOGIN_PHONE)}>
                        <Text style={styles.socialBtnText}>{t.continuePhone}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} onPress={() => onChangeView(ViewState.LOGIN_EMAIL)}>
                        <Text style={styles.socialBtnText}>{t.continueEmail}</Text>
                    </TouchableOpacity>
                    <Text style={styles.smText}>{t.termsText}</Text>
                </View>
              );
          case ViewState.LOGIN_EMAIL:
              return (
                <View style={styles.centerBox}>
                    <Text style={styles.h2}>{t.login}</Text>
                    <TextInput 
                        style={styles.input} 
                        value={email} 
                        onChangeText={setEmail} 
                        placeholder={t.emailAddress} 
                        placeholderTextColor="#475569"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput 
                        style={styles.input} 
                        value={password} 
                        onChangeText={setPassword} 
                        placeholder={t.password} 
                        placeholderTextColor="#475569"
                        secureTextEntry
                    />
                    <TouchableOpacity onPress={() => onChangeView(ViewState.SIGNUP_EMAIL)}>
                        <Text style={styles.linkText}>{t.dontHaveAccount}</Text>
                    </TouchableOpacity>
                </View>
              );
          case ViewState.SIGNUP_EMAIL:
              return (
                <View style={styles.centerBox}>
                    <Text style={styles.h2}>{t.signup}</Text>
                    <TextInput 
                        style={styles.input} 
                        value={email} 
                        onChangeText={setEmail} 
                        placeholder={t.emailAddress} 
                        placeholderTextColor="#475569"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput 
                        style={styles.input} 
                        value={password} 
                        onChangeText={setPassword} 
                        placeholder={t.password} 
                        placeholderTextColor="#475569"
                        secureTextEntry
                    />
                    <TextInput 
                        style={styles.input} 
                        value={confirmPassword} 
                        onChangeText={setConfirmPassword} 
                        placeholder={t.confirmPassword} 
                        placeholderTextColor="#475569"
                        secureTextEntry
                    />
                    <TouchableOpacity onPress={() => onChangeView(ViewState.LOGIN_EMAIL)}>
                        <Text style={styles.alreadyAccountText}>{t.alreadyHaveAccount}</Text>
                    </TouchableOpacity>
                </View>
              );
          case ViewState.LOGIN_PHONE:
              return (
                <View style={styles.centerBox}>
                    <Text style={styles.h2}>{t.enterPhone}</Text>
                    <Text style={styles.p}>{t.sendOtpDesc}</Text>
                    <View style={styles.phoneInputContainer}>
                        <TouchableOpacity style={styles.countryPicker} onPress={() => setShowCountryModal(true)}>
                            <Text style={styles.whiteText}>{selectedCountry.flag} {selectedCountry.code}</Text>
                        </TouchableOpacity>
                        <TextInput 
                            style={styles.phoneInput} 
                            value={phone} 
                            onChangeText={setPhone} 
                            keyboardType="phone-pad" 
                            placeholder={t.enterPhone} 
                            placeholderTextColor="#475569"
                            autoFocus
                        />
                    </View>
                    <Modal visible={showCountryModal} animationType="slide" transparent={true}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Select Country</Text>
                                    <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                                        <Text style={styles.closeText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList 
                                    data={COUNTRIES}
                                    keyExtractor={(item) => item.code + item.name}
                                    renderItem={({item}) => (
                                        <TouchableOpacity style={styles.countryItem} onPress={() => { setSelectedCountry(item); setShowCountryModal(false); }}>
                                            <Text style={styles.countryText}>{item.flag} {item.name} ({item.code})</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
              );
          case ViewState.OTP_VERIFY:
              return (
                <View style={styles.centerBox}>
                  <Text style={styles.h2}>{t.verifyCode}</Text>
                  <Text style={styles.p}>{t.enterCodeDesc} {selectedCountry.code} {phone}</Text>
                  {isAutoFilling && <Text style={styles.autoFillHint}>✓ Code detected automatically</Text>}
                  <TextInput 
                    style={[styles.otpInput, isAutoFilling && styles.otpInputAutoFilled]} 
                    value={otp} 
                    onChangeText={setOtp} 
                    maxLength={6} 
                    keyboardType="number-pad" 
                    placeholder="••••••" 
                    placeholderTextColor="#475569" 
                    autoFocus 
                  />
                  <TouchableOpacity onPress={handlePhoneSubmit} disabled={isLoading}>
                      <Text style={styles.resendText}>{isLoading ? t.resending : t.resendCode}</Text>
                  </TouchableOpacity>
                </View>
              );
            default: return null;
      }
  }

  const renderFooter = () => {
      if (currentView === ViewState.LANGUAGE_SELECT) {
          return <TouchableOpacity style={styles.mainButton} onPress={() => onChangeView(ViewState.WELCOME_INTRO)}><Text style={styles.mainButtonText}>{t.continue}</Text></TouchableOpacity>
      }
      if (currentView === ViewState.LOGIN_EMAIL) {
          return <TouchableOpacity style={[styles.mainButton, isLoading && styles.disabledButton]} onPress={handleEmailLogin} disabled={isLoading}>{isLoading ? <ActivityIndicator color="white"/> : <Text style={styles.mainButtonText}>{t.login}</Text>}</TouchableOpacity>
      }
      if (currentView === ViewState.SIGNUP_EMAIL) {
          return <TouchableOpacity style={[styles.mainButton, isLoading && styles.disabledButton]} onPress={handleEmailSignup} disabled={isLoading}>{isLoading ? <ActivityIndicator color="white"/> : <Text style={styles.mainButtonText}>{t.signup}</Text>}</TouchableOpacity>
      }
      if (currentView === ViewState.LOGIN_PHONE) {
          return <TouchableOpacity style={[styles.mainButton, (isLoading || phone.length < 5) && styles.disabledButton]} onPress={handlePhoneSubmit} disabled={isLoading || phone.length < 5}>{isLoading ? <ActivityIndicator color="white"/> : <Text style={styles.mainButtonText}>{t.sendOtp}</Text>}</TouchableOpacity>
      }
      if (currentView === ViewState.OTP_VERIFY) {
          return <TouchableOpacity style={[styles.mainButton, (isLoading || otp.length < 6) && styles.disabledButton]} onPress={handleOtpSubmit} disabled={isLoading || otp.length < 6}>{isLoading ? <ActivityIndicator color="white"/> : <Text style={styles.mainButtonText}>{t.verifyLogin}</Text>}</TouchableOpacity>
      }
      return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
        {![ViewState.LANGUAGE_SELECT, ViewState.AUTH_METHOD].includes(currentView) && <BackButton targetView={ViewState.AUTH_METHOD} />}
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            {renderContent()}
        </ScrollView>
        <View style={styles.footer}>{renderFooter()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  container: { flexGrow: 1, padding: width * 0.06, justifyContent: 'center' },
  centerBox: { width: '100%', alignItems: 'center' },
  fullWidth: { width: '100%' },
  langHeader: { alignItems: 'center', marginBottom: 20 },
  langIconContainer: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  langGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 5 },
  langGridItem: { width: '48%', backgroundColor: '#1e293b', borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#334155', marginBottom: 15 },
  langGridItemActive: { borderColor: '#db2777', backgroundColor: 'rgba(219, 39, 119, 0.1)' },
  langGridName: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  langGridSubName: { color: '#94a3b8', fontSize: 14 },
  logo: { width: width * 0.25, height: width * 0.25, borderRadius: 20, marginBottom: 24 },
  footer: { padding: width * 0.06, paddingBottom: 40 },
  backButton: { position: 'absolute', top: 20, left: 20, zIndex: 10, width: 44, height: 44, borderRadius: 22, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center' },
  h2: { fontSize: width * 0.07, fontWeight: 'bold', color: 'white', marginBottom: 12, textAlign: 'center' },
  p: { fontSize: width * 0.04, color: '#94a3b8', marginBottom: 32, lineHeight: 24, textAlign: 'center' },
  whiteText: { color: 'white', fontSize: 16 },
  socialButton: { width: '100%', backgroundColor: 'white', paddingVertical: 18, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  socialBtnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 16 },
  input: { width: '100%', backgroundColor: '#1e293b', color: 'white', padding: 18, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#334155', marginBottom: 16 },
  linkText: { color: '#db2777', fontWeight: 'bold', marginTop: 8 },
  alreadyAccountText: { color: '#db2777', fontWeight: 'bold', marginTop: 8 },
  phoneInputContainer: { flexDirection: 'row', width: '100%' },
  countryPicker: { backgroundColor: '#1e293b', paddingHorizontal: 16, borderRadius: 12, marginRight: 12, justifyContent: 'center', borderWidth: 1, borderColor: '#334155' },
  phoneInput: { flex: 1, backgroundColor: '#1e293b', color: 'white', padding: 18, borderRadius: 12, fontSize: 18, borderWidth: 1, borderColor: '#334155' },
  autoFillHint: { color: '#22c55e', fontSize: 14, textAlign: 'center', marginBottom: 8 },
  otpInput: { width: '100%', height: 70, backgroundColor: '#1e293b', borderRadius: 12, fontSize: 32, color: 'white', textAlign: 'center', letterSpacing: 12, borderWidth: 1, borderColor: '#334155' },
  otpInputAutoFilled: { borderWidth: 1, borderColor: '#22c55e' },
  mainButton: { backgroundColor: '#db2777', paddingVertical: 18, borderRadius: 12, alignItems: 'center' },
  mainButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  disabledButton: { opacity: 0.5 },
  smText: { color: '#64748b', textAlign: 'center', fontSize: 13, marginTop: 24 },
  link: { color: '#94a3b8', textDecorationLine: 'underline' },
  resendText: { color: '#db2777', fontWeight: 'bold', marginTop: 24 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#1e293b', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  closeText: { color: '#db2777', fontSize: 16, fontWeight: 'bold' },
  countryItem: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#334155' },
  countryText: { color: 'white', fontSize: 16 },
});

export default Auth;
