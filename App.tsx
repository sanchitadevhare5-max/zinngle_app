import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import RootNavigator from './components/navigation/RootNavigator';
import { UserProvider } from './components/UserContext';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '600062182109-vkqv0q0q0q0q0q0q0q0.apps.googleusercontent.com',
});

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <RootNavigator />
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;
