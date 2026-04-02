import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const INTRO_SCREENS = [
  {
    key: '1',
    emoji: '🎥',
    title: 'Live Video Calls',
    description: 'Connect face-to-face with your favorite hosts anytime, anywhere. Experience real-time interaction like never before.',
    color: '#FF3B5C', // Pinkish red
  },
  {
    key: '2',
    emoji: '🎁',
    title: 'Virtual Gifting',
    description: 'Support hosts by sending stunning virtual gifts during live sessions. Watch them come alive on screen!',
    color: '#8B5CF6', // Purple
  },
  {
    key: '3',
    emoji: '👥',
    title: 'Join the Community',
    description: 'Whether you are a fan or a host, Zinngle is the place to be. Earn money by sharing your time and talent.',
    color: '#F59E0B', // Orange
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

  const onScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <TouchableOpacity style={styles.skipButton} onPress={onComplete}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={INTRO_SCREENS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
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
            <View 
              key={i} 
              style={[
                styles.dot, 
                i === currentIndex ? styles.activeDot : styles.inactiveDot
              ]} 
            />
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
  container: { 
    flex: 1, 
    backgroundColor: '#0f172a' // Dark navy matching the screenshots
  },
  skipButton: { 
    position: 'absolute', 
    top: 50, 
    right: 24, 
    zIndex: 10,
    padding: 8
  },
  skipText: { 
    color: '#94a3b8', 
    fontSize: 16,
    fontWeight: '500'
  },
  slide: { 
    width, 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 30 
  },
  iconContainer: { 
    width: 160,
    height: 160,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    // Add shadow for better look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  icon: { 
    fontSize: 70,
  },
  title: { 
    color: 'white', 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  description: { 
    color: '#94a3b8', 
    fontSize: 17, 
    textAlign: 'center', 
    lineHeight: 26, 
    paddingHorizontal: 10
  },
  footer: { 
    paddingHorizontal: 32, 
    paddingBottom: 50 
  },
  pagination: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 40 
  },
  dot: { 
    height: 8, 
    borderRadius: 4, 
    marginHorizontal: 4 
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#334155',
  },
  activeDot: { 
    width: 24,
    backgroundColor: 'white',
  },
  nextButton: { 
    backgroundColor: 'white', 
    paddingVertical: 18, 
    borderRadius: 16, 
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  nextButtonText: { 
    color: '#0f172a', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});

export default WelcomeIntro;
