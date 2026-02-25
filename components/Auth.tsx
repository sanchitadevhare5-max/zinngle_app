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
          return <View><Text style={styles.h2}>Language Selection</Text></View>
      }
      if (currentView === ViewState.AUTH_METHOD) {
          return <View><Text style={styles.h2}>Auth Method</Text></View>
      }
      if (currentView === ViewState.LOGIN_PHONE) {
          return <View><Text style={styles.h2}>Phone Login</Text></View>
      }
      return null
  }

  if (currentView !== ViewState.OTP_VERIFY) {
      return renderOtherViews();
  }

  return (
      <SafeAreaView style={styles.safeArea}>
          <BackButton targetView={ViewState.LOGIN_PHONE} />
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
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  container: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  footer: { padding: 24, paddingTop: 0 },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 1, width: 40, height: 40, borderRadius: 20, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center' },
  h2: { fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 8, textAlign: 'center' },
  p: { fontSize: 16, color: '#94a3b8', marginBottom: 24, lineHeight: 24, textAlign: 'center' },
  autoFillHint: { color: '#22c55e', fontSize: 14, textAlign: 'center', marginBottom: 8 },
  otpInput: { width: '100%', height: 60, backgroundColor: '#1e293b', borderRadius: 12, fontSize: 24, color: 'white', textAlign: 'center', letterSpacing: 16 },
  otpInputAutoFilled: { borderWidth: 1, borderColor: '#22c55e' },
  mainButton: { backgroundColor: '#db2777', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  mainButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  disabledButton: { backgroundColor: '#db2777', opacity: 0.5 },
});

export default Auth;
