import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { MOCK_HOSTS } from '../constants';

const RandomMatch = () => {
  const navigation = useNavigation<any>();
  const [isMatching, setIsMatching] = useState(true);
  const [matchedHost, setMatchedHost] = useState<any>(null);
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    // Start spin animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Simulate matching delay
    const timer = setTimeout(() => {
      const randomHost = MOCK_HOSTS[Math.floor(Math.random() * MOCK_HOSTS.length)];
      setMatchedHost(randomHost);
      setIsMatching(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (isMatching) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <View style={styles.loaderRing}>
              <View style={styles.loaderDot} />
            </View>
          </Animated.View>
          <Text style={styles.matchingText}>Finding your match...</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>It's a Match!</Text>
        <Image source={{ uri: matchedHost.avatarUrl }} style={styles.avatar} />
        <Text style={styles.name}>{matchedHost.name}</Text>
        <Text style={styles.username}>@{matchedHost.username}</Text>
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={styles.callBtn} 
            onPress={() => navigation.replace('LiveCall', { host: matchedHost, callType: 'video' })}
          >
            <Text style={styles.callText}>Video Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.retryBtn} 
            onPress={() => {
              setIsMatching(true);
              setMatchedHost(null);
            }}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loaderRing: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#db2777', borderStyle: 'dotted', justifyContent: 'center', alignItems: 'center' },
  loaderDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#db2777', position: 'absolute', top: -10 },
  matchingText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 40 },
  cancelBtn: { marginTop: 40 },
  cancelText: { color: '#64748b', fontSize: 16 },
  title: { color: '#db2777', fontSize: 32, fontWeight: 'bold', marginBottom: 40 },
  avatar: { width: 180, height: 180, borderRadius: 90, borderWidth: 4, borderColor: '#db2777', marginBottom: 20 },
  name: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  username: { color: '#94a3b8', fontSize: 16, marginBottom: 40 },
  buttonGroup: { width: '100%' },
  callBtn: { backgroundColor: '#db2777', padding: 18, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
  callText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  retryBtn: { padding: 18, borderRadius: 16, borderWidth: 1, borderColor: '#334155', alignItems: 'center' },
  retryText: { color: 'white', fontWeight: 'bold' }
});

export default RandomMatch;
