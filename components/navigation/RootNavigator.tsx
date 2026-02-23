import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens
import AuthScreen from '../AuthScreen';
import MainNavigator from './MainNavigator';
import CreatorProfile from '../CreatorProfile';
import LiveCall from '../LiveCall';
import Search from '../Search';
import Wallet from '../Wallet';
import Settings from '../Settings';
import GiftStore from '../GiftStore';
import GiftHistory from '../GiftHistory';
import ChatInterface from '../ChatInterface';
import RandomMatch from '../RandomMatch';
import { Withdrawal, AutoReload, TransactionDetails } from '../WalletFeatures';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
        {/* The Auth screen handles the entire Splash, Login, and Onboarding flow */}
        <Stack.Screen name="Auth" component={AuthScreen} />
        
        {/* The Main navigator is the tabbed interface for logged-in users */}
        <Stack.Screen name="Main" component={MainNavigator} />

        {/* These are modal screens that can be opened from anywhere in the app */}
        <Stack.Screen name="CreatorProfile" component={CreatorProfile} />
        <Stack.Screen name="LiveCall" component={LiveCall} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="GiftStore" component={GiftStore} />
        <Stack.Screen name="GiftHistory" component={GiftHistory} />
        <Stack.Screen name="ChatInterface" component={ChatInterface} />
        <Stack.Screen name="RandomMatch" component={RandomMatch} />
        <Stack.Screen name="Withdrawal" component={Withdrawal} />
        <Stack.Screen name="AutoReload" component={AutoReload} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
