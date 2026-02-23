import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Auth } from '../Auth';
import WelcomeIntro from '../WelcomeIntro';
import Onboarding from '../Onboarding';
import SplashScreen from '../SplashScreen';
import HostOnboarding from '../HostOnboarding';
import { ViewState } from '../../types';

export const AuthScreen: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.SPLASH);
  const navigation = useNavigation<any>();

  // Function to handle completion of general onboarding
  const handleOnboardingComplete = (userType: 'user' | 'host') => {
    if (userType === 'host') {
      setView(ViewState.HOST_WELCOME);
    } else {
      navigation.navigate('Home');
    }
  };

  // 1. Show Splash Screen first
  if (view === ViewState.SPLASH) {
    return <SplashScreen onComplete={() => setView(ViewState.LANGUAGE_SELECT)} />;
  }

  // 2. Show Welcome Slides
  if (view === ViewState.WELCOME_INTRO) {
    return <WelcomeIntro onComplete={() => setView(ViewState.AUTH_METHOD)} />;
  }

  // 3. Show Onboarding (Who are you, Permissions, Profile, Interests)
  if ([
    ViewState.USER_TYPE_SELECT, 
    ViewState.PERMISSIONS, 
    ViewState.PROFILE_SETUP, 
    ViewState.INTERESTS_SELECT
  ].includes(view)) {
    return (
      <Onboarding 
        currentView={view} 
        onChangeView={setView} 
        onComplete={handleOnboardingComplete} 
      />
    );
  }

  // 4. Show Host-Specific Onboarding
  if ([
    ViewState.HOST_WELCOME,
    ViewState.HOST_PROFILE_FORM,
    ViewState.HOST_VERIFICATION,
    ViewState.HOST_PRICING,
    ViewState.HOST_PAYMENT
  ].includes(view)) {
    return (
      <HostOnboarding
        currentView={view}
        onChangeView={setView}
        onComplete={() => navigation.navigate('Home')}
      />
    );
  }

  // 5. Show Auth (Language, Login, OTP)
  return (
    <Auth 
      currentView={view} 
      onChangeView={setView} 
      onComplete={() => setView(ViewState.USER_TYPE_SELECT)} 
    />
  );
};