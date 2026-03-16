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
  Platform,
} from 'react-native';
import { ViewState } from '../types';
import { supabase } from '../supabase';
import { getOtp, startOtpListener, removeOtpListener } from 'react-native-otp-verify';

interface AuthProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onComplete: () => void;
}

const COUNTRIES = [
    { code: '+91', flag: '🇮🇳', name: 'India' },
];

const LANGUAGES = [
    { code: 'en', name: 'English', native: 'English' },
];

export const Auth: React.FC<AuthProps> = ({ currentView, onChangeView, onComplete }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const isVerifyingRef = useRef(false);

  useEffect(() => {
    if (currentView === ViewState.OTP_VERIFY) {
      setOtp('');
      isVerifyingRef.current = false;

      if (Platform.OS === 'android') {
        try {
          getOtp()
            .then(otpValue => {
              if (otpValue) setOtp(otpValue);
            })
            .catch(() => {});

          startOtpListener(message => {
            const otpMatch = /(\d{6})/g.exec(message);
            if (otpMatch && otpMatch[1]) {
              setIsAutoFilling(true);
              setOtp(otpMatch[1]);
              setTimeout(() => setIsAutoFilling(false), 1500);
            }
          });
        } catch {
        }
      }

      return () => {
        if (Platform.OS === 'android') {
          try {
            removeOtpListener();
          } catch {
          }
        }
      };
    }
  }, [currentView]);

  const handlePhoneSubmit = async () => {
    if (phone.length < 5) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `${selectedCountry.code}${phone}`,
      });
      if (error) throw error;
      Alert.alert('OTP Sent', 'Please check your messages for the verification code.');
      onChangeView(ViewState.OTP_VERIFY);
    } catch (error: any) {
      Alert.alert('OTP Request Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6 || isVerifyingRef.current) return;
    isVerifyingRef.current = true;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: `${selectedCountry.code}${phone}`,
        token: otp,
        type: 'sms',
      });
      if (error) throw error;
      onComplete();
    } catch (error: any) {
      isVerifyingRef.current = false;
      Alert.alert('Invalid OTP', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (otp.length === 6 && !isVerifyingRef.current) {
      handleOtpSubmit();
    }
  }, [otp]);

  const BackButton = ({ targetView }: { targetView: ViewState }) => (
     <TouchableOpacity style={styles.backButton} onPress={() => onChangeView(targetView)}>
        <Text style={{color: 'white'}}>←</Text>
     </TouchableOpacity>
  );

  const renderOtherViews = () => {
    if (currentView === ViewState.LANGUAGE_SELECT) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Text style={styles.appLogo}>Zinngle</Text>
              <Text style={styles.subtitle}>Connect with hosts worldwide</Text>
            </View>
            <Text style={styles.sectionTitle}>Select your language</Text>
            <View style={styles.languageList}>
              {LANGUAGES.map((lang) => (
                <TouchableOpacity 
                  key={lang.code} 
                  style={styles.languageItem}
                  onPress={() => onChangeView(ViewState.AUTH_METHOD)}
                >
                  <Text style={styles.languageFlag}>{lang.code === 'en' ? '🇺🇸' : '🌍'}</Text>
                  <View style={styles.languageTextContainer}>
                    <Text style={styles.languageName}>{lang.name}</Text>
                    <Text style={styles.languageNative}>{lang.native}</Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>
      );
    }
    
    if (currentView === ViewState.AUTH_METHOD) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity style={styles.backButton} onPress={() => onChangeView(ViewState.LANGUAGE_SELECT)}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Text style={styles.appLogo}>Zinngle</Text>
            </View>
            <Text style={styles.sectionTitle}>How would you like to continue?</Text>
            
            <TouchableOpacity 
              style={styles.authMethodButton}
              onPress={() => onChangeView(ViewState.LOGIN_PHONE)}
            >
              <Text style={styles.authMethodIcon}>📱</Text>
              <View style={styles.authMethodTextContainer}>
                <Text style={styles.authMethodTitle}>Continue with Phone</Text>
                <Text style={styles.authMethodSubtitle}>Use your mobile number</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.authMethodButton}
              onPress={() => onChangeView(ViewState.LOGIN_EMAIL)}
            >
              <Text style={styles.authMethodIcon}>✉️</Text>
              <View style={styles.authMethodTextContainer}>
                <Text style={styles.authMethodTitle}>Continue with Email</Text>
                <Text style={styles.authMethodSubtitle}>Use your email address</Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>
            
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </SafeAreaView>
      );
    }
    
    if (currentView === ViewState.LOGIN_PHONE) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity style={styles.backButton} onPress={() => onChangeView(ViewState.AUTH_METHOD)}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.h2}>Enter your phone</Text>
            <Text style={styles.p}>We'll send you a verification code</Text>
            
            <TouchableOpacity 
              style={styles.countrySelector}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
              <Text style={styles.countryCode}>{selectedCountry.code}</Text>
              <Text style={styles.countryName}>{selectedCountry.name}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            
            {isDropdownOpen && (
              <View style={styles.dropdown}>
                {COUNTRIES.map((country) => (
                  <TouchableOpacity
                    key={country.code}
                    style={styles.countryOption}
                    onPress={() => {
                      setSelectedCountry(country);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.countryFlag}>{country.flag}</Text>
                    <Text style={styles.countryOptionText}>{country.name} ({country.code})</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryPrefix}>{selectedCountry.code}</Text>
              <TextInput
                style={styles.phoneInput}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone number"
                placeholderTextColor="#475569"
                keyboardType="phone-pad"
                autoFocus
              />
            </View>
            
            <TouchableOpacity 
              style={[styles.mainButton, (isLoading || phone.length < 5) && styles.disabledButton]} 
              onPress={handlePhoneSubmit}
              disabled={isLoading || phone.length < 5}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.mainButtonText}>Continue</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      );
    }
    
    if (currentView === ViewState.LOGIN_EMAIL) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity style={styles.backButton} onPress={() => onChangeView(ViewState.AUTH_METHOD)}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.h2}>Enter your email</Text>
            <Text style={styles.p}>We'll send you a verification link</Text>
            
            <TextInput
              style={styles.emailInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
              placeholderTextColor="#475569"
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus
            />
            
            <TouchableOpacity 
              style={[styles.mainButton, (isLoading || email.length < 5) && styles.disabledButton]} 
              onPress={async () => {
                if (email.length < 5) return;
                setIsLoading(true);
                try {
                  const { error } = await supabase.auth.signInWithOtp({ email });
                  if (error) throw error;
                  Alert.alert('Email Sent', 'Please check your inbox for the verification link.');
                } catch (error: any) {
                  Alert.alert('Error', error.message);
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading || email.length < 5}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.mainButtonText}>Send Verification Link</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      );
    }
    
    return null;
  };

  // Render other views
  const renderedOtherViews = renderOtherViews();
  if (renderedOtherViews) {
    return renderedOtherViews;
  }

  // Render OTP verification
  if (currentView === ViewState.OTP_VERIFY) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => onChangeView(ViewState.LOGIN_PHONE)}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.h2}>Verify Code</Text>
            <Text style={styles.p}>Enter the code sent to {selectedCountry.code} {phone}</Text>
            {isAutoFilling && (
              <Text style={styles.autoFillHint}>✓ Code detected automatically</Text>
            )}
            <TextInput
              style={[styles.otpInput, isAutoFilling && styles.otpInputAutoFilled]}
              value={otp}
              onChangeText={text => {
                isVerifyingRef.current = false;
                setOtp(text);
              }}
              maxLength={6}
              keyboardType="number-pad"
              placeholder="••••••"
              placeholderTextColor="#475569"
              autoFocus
              textContentType="oneTimeCode"
            />
            <TouchableOpacity onPress={handlePhoneSubmit} disabled={isLoading}>
                <Text style={{color: '#db2777', textAlign: 'center', marginTop: 16}}>{isLoading ? 'Resending...' : 'Resend Code'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
         <View style={styles.footer}>
             <TouchableOpacity style={[styles.mainButton, (isLoading || otp.length < 6) && styles.disabledButton]} onPress={handleOtpSubmit} disabled={isLoading || otp.length < 6}>
                 {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.mainButtonText}>Verify & Login</Text>}
              </TouchableOpacity>
          </View>
    </SafeAreaView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  container: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  footer: { padding: 24, paddingTop: 0 },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 1, width: 40, height: 40, borderRadius: 20, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center' },
  backButtonText: { color: 'white', fontSize: 20 },
  h2: { fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 8, textAlign: 'center' },
  p: { fontSize: 16, color: '#94a3b8', marginBottom: 24, lineHeight: 24, textAlign: 'center' },
  autoFillHint: { color: '#22c55e', fontSize: 14, textAlign: 'center', marginBottom: 8 },
  otpInput: { width: '100%', height: 60, backgroundColor: '#1e293b', borderRadius: 12, fontSize: 24, color: 'white', textAlign: 'center', letterSpacing: 16 },
  otpInputAutoFilled: { borderWidth: 1, borderColor: '#22c55e' },
  mainButton: { backgroundColor: '#db2777', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  mainButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  disabledButton: { backgroundColor: '#db2777', opacity: 0.5 },
  
  // New styles for auth flow
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  appLogo: { fontSize: 42, fontWeight: 'bold', color: '#db2777', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#94a3b8' },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: 'white', marginBottom: 20, textAlign: 'center' },
  
  // Language selection
  languageList: { backgroundColor: '#1e293b', borderRadius: 12, overflow: 'hidden' },
  languageItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#334155' },
  languageFlag: { fontSize: 28, marginRight: 12 },
  languageTextContainer: { flex: 1 },
  languageName: { fontSize: 16, fontWeight: '600', color: 'white' },
  languageNative: { fontSize: 14, color: '#94a3b8' },
  chevron: { fontSize: 24, color: '#64748b' },
  
  // Auth method selection
  authMethodButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 16, borderRadius: 12, marginBottom: 12 },
  authMethodIcon: { fontSize: 28, marginRight: 12 },
  authMethodTextContainer: { flex: 1 },
  authMethodTitle: { fontSize: 16, fontWeight: '600', color: 'white' },
  authMethodSubtitle: { fontSize: 14, color: '#94a3b8' },
  
  // Divider
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  divider: { flex: 1, height: 1, backgroundColor: '#334155' },
  dividerText: { color: '#64748b', marginHorizontal: 16, fontSize: 14 },
  
  // Social button
  socialButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  socialIcon: { fontSize: 20, fontWeight: 'bold', color: '#333', marginRight: 12 },
  socialButtonText: { fontSize: 16, fontWeight: '600', color: '#333' },
  
  // Terms text
  termsText: { fontSize: 12, color: '#64748b', textAlign: 'center', marginTop: 24, lineHeight: 18 },
  linkText: { color: '#db2777' },
  
  // Phone login
  countrySelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 16, borderRadius: 12, marginBottom: 8 },
  countryFlag: { fontSize: 24, marginRight: 8 },
  countryCode: { fontSize: 18, fontWeight: '600', color: 'white', marginRight: 8 },
  countryName: { flex: 1, fontSize: 16, color: '#94a3b8' },
  dropdownArrow: { fontSize: 12, color: '#64748b' },
  
  // Dropdown
  dropdown: { backgroundColor: '#1e293b', borderRadius: 12, marginBottom: 16, overflow: 'hidden' },
  countryOption: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#334155' },
  countryOptionText: { fontSize: 16, color: 'white' },
  
  // Phone input
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 12, marginBottom: 24 },
  countryPrefix: { fontSize: 18, fontWeight: '600', color: '#94a3b8', paddingLeft: 16, paddingRight: 8 },
  phoneInput: { flex: 1, height: 56, fontSize: 18, color: 'white' },
  
  // Email input
  emailInput: { width: '100%', height: 56, backgroundColor: '#1e293b', borderRadius: 12, fontSize: 16, color: 'white', paddingHorizontal: 16, marginBottom: 24 },
});

export default Auth;
