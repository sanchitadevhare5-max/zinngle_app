import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Auth } from './Auth';
import WelcomeIntro from './WelcomeIntro';
import Onboarding from './Onboarding';
import SplashScreen from './SplashScreen';
import PermissionsScreen from './Permissions'; // Import the new screen
import HostOnboarding from './HostOnboarding';
import { ViewState } from '../types';
import { useUser } from './UserContext';

const AuthScreen: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.SPLASH);
  const { profile, session, loading } = useUser();
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!loading) {
      if (session && profile) {
        // User is signed in and has a profile, go to main app
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
      } else if (session && !profile) {
        // User is signed in but has no profile, start the full onboarding flow
        setView(ViewState.PERMISSIONS);
      } else {
        // User is not signed in, start the auth flow
        setView(ViewState.LANGUAGE_SELECT);
      }
    }
  }, [session, profile, loading, navigation]);

  const handleOnboardingComplete = (userType: 'user' | 'host') => {
    if (userType === 'host') {
      setView(ViewState.HOST_WELCOME);
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    }
  };

  // --- RENDER LOGIC ---
  if (loading || view === ViewState.SPLASH) {
    return <SplashScreen onComplete={() => {}} />;
  }

  if ([ViewState.LANGUAGE_SELECT, ViewState.AUTH_METHOD, ViewState.LOGIN_PHONE, ViewState.OTP_VERIFY, ViewState.LOGIN_EMAIL, ViewState.SIGNUP_EMAIL].includes(view)) {
    return <Auth currentView={view} onChangeView={setView} onComplete={() => setView(ViewState.PERMISSIONS)} />;
  }
  
  if (view === ViewState.WELCOME_INTRO) {
    return <WelcomeIntro onComplete={() => setView(ViewState.AUTH_METHOD)} />;
  }

  // This is the new step in the flow
  if (view === ViewState.PERMISSIONS) {
      return <PermissionsScreen onComplete={() => setView(ViewState.USER_TYPE_SELECT)} />
  }

  if ([ViewState.USER_TYPE_SELECT, ViewState.PROFILE_SETUP, ViewState.INTERESTS_SELECT].includes(view)) {
    return <Onboarding currentView={view} onChangeView={setView} onComplete={handleOnboardingComplete} />;
  }

  if ([ViewState.HOST_WELCOME, ViewState.HOST_PROFILE_FORM, ViewState.HOST_VERIFICATION, ViewState.HOST_PRICING, ViewState.HOST_PAYMENT].includes(view)) {
    return <HostOnboarding currentView={view} onChangeView={setView} onComplete={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })} />;
  }

  return <SplashScreen onComplete={() => {}} />; // Default fallback
};

export default AuthScreen;
