import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

interface LandingScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onGetStarted, onLogin }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0f172a', '#1e1b4b', '#2e1065']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo/Icon Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>Z</Text>
          </View>
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Zinngle</Text>
          <Text style={styles.subtitle}>
            Connect with amazing people, share moments, and build meaningful relationships
          </Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>🔍</Text>
            </View>
            <Text style={styles.featureTitle}>Discover</Text>
            <Text style={styles.featureDescription}>
              Find people who share your interests
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>💬</Text>
            </View>
            <Text style={styles.featureTitle}>Connect</Text>
            <Text style={styles.featureDescription}>
              Chat and build real connections
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>✨</Text>
            </View>
            <Text style={styles.featureTitle}>Share</Text>
            <Text style={styles.featureDescription}>
              Share your stories and moments
            </Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onGetStarted}
            activeOpacity={0.8}>
            <LinearGradient
              colors={['#db2777', '#c026d3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}>
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onLogin}>
            <Text style={styles.secondaryButtonText}>Already have an account? Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(219, 39, 119, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#db2777',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#db2777',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    gap: 12,
  },
  featureCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(219, 39, 119, 0.2)',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(219, 39, 119, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 16,
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#db2777',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  secondaryButton: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#db2777',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  footerText: {
    color: '#475569',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default LandingScreen;