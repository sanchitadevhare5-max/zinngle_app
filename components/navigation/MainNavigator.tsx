import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import Screens for the tab bar
import HomePage from '../../HomePage';
import ChatList from '../ChatList';
import RandomMatch from '../RandomMatch';
import UserProfile from '../UserProfile';

const Tab = createBottomTabNavigator();

// This is the main tab navigator that users see after logging in.
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = '🏠';
          else if (route.name === 'Chats') iconName = '💬';
          else if (route.name === 'Match') iconName = '🔀';
          else if (route.name === 'Profile') iconName = '👤';
          
          return <Text style={{ fontSize: 24, color: focused ? '#db2777' : color }}>{iconName}</Text>;
        },
        tabBarStyle: { 
            backgroundColor: '#1e293b', 
            borderTopColor: '#334155',
            height: 80, 
            paddingBottom: 20,
        },
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: '#db2777',
        tabBarInactiveTintColor: '#64748b',
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Chats" component={ChatList} />
      <Tab.Screen name="Match" component={RandomMatch} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
