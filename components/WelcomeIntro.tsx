import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const INTRO_SCREENS = [
  {
    key: '1',
    emoji: '📹',
    title: 'Live Video Calls',
    description: 'Connect face-to-face with your favorite hosts. Experience real-time interaction like never before.',
  },
  {
    key: '2',
    emoji: '🎁',
    title: 'Virtual Gifting',
    description: 'Support hosts by sending stunning virtual gifts during live sessions. Watch them come alive on screen!',
  },
  {
    key: '3',
    emoji: '👥',
    title: 'Join the Community',
    description: 'Whether you are a fan or a host, Zinngle is the place to be. Earn money by sharing your time and talent.',
  },
];

interface WelcomeIntroProps {
  onComplete: () => void;
}

const WelcomeIntro: React.FC<WelcomeIntroProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < INTRO_SCREENS.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onComplete();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={onComplete}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={INTRO_SCREENS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x;
          setCurrentIndex(Math.round(x / width));
        }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{item.emoji}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {INTRO_SCREENS.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentIndex ? styles.activeDot : {}]} />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex === INTRO_SCREENS.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  skipButton: { position: 'absolute', top: 60, right: 24, zIndex: 1, padding: 8 },
  skipText: { color: '#94a3b8', fontSize: 16 },
  slide: { width, flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  iconContainer: { 
    width: 140,
    height: 140,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  icon: { 
    fontSize: 60,
  },
  title: { color: 'white', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  description: { color: '#e0e0e0', fontSize: 16, textAlign: 'center', lineHeight: 24, opacity: 0.8 },
  footer: { padding: 32, paddingBottom: 48 },
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#475569', marginHorizontal: 4 },
  activeDot: { backgroundColor: '#db2777', width: 24 },
  nextButton: { backgroundColor: 'white', paddingVertical: 18, borderRadius: 99, alignItems: 'center' },
  nextButtonText: { color: '#1a1a2e', fontSize: 18, fontWeight: 'bold' },
});

export default WelcomeIntro;
