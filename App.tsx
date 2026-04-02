import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import RootNavigator from './components/navigation/RootNavigator';
import { UserProvider } from './components/UserContext';
import FlashMessage from 'react-native-flash-message';

// Configure Google Sign-In with your new Client ID
GoogleSignin.configure({
  webClientId: '1076784105955-vi5n70n9gja81hvr1517emse4mtspad8.apps.googleusercontent.com',
  offlineAccess: true,
});

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <RootNavigator />
        <FlashMessage position="top" />
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;
