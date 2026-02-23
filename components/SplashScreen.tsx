import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Animated, Image } from 'react-native';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Move to next screen after 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Background Blurs */}
      <View style={[styles.blur, { top: -100, left: -50, backgroundColor: 'rgba(219, 39, 119, 0.2)' }]} />
      <View style={[styles.blur, { bottom: -50, right: -50, backgroundColor: 'rgba(79, 70, 229, 0.2)' }]} />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Main Logo Image */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/app_logo.jpeg')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Brand Name */}
        <Text style={styles.brandName}>Zinngle</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>CONNECT • ENGAGE • EARN</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blur: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    width: 180,
    height: 180,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  brandName: {
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
    letterSpacing: -1,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 12,
    color: '#94a3b8',
    letterSpacing: 3,
    fontWeight: '600',
  }
});

export default SplashScreen;