import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Auth } from './components/Auth';
import { ViewState } from '../types';

/**
 * This screen component manages the state for the Auth component,
 * which is designed to be a controlled component.
 */
export const AuthScreen: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANGUAGE_SELECT);
  const navigation = useNavigation();

  // When authentication is complete, navigate to the main app
  const handleComplete = () => {
    navigation.navigate('Home');
  };

  return <Auth currentView={view} onChangeView={setView} onComplete={handleComplete} />;
};