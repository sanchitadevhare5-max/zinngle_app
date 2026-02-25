import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';

interface PermissionsProps {
  onComplete: () => void;
}

const PermissionsScreen: React.FC<PermissionsProps> = ({ onComplete }) => {

  const requestPermissions = async () => {
    if (Platform.OS !== 'android') {
      onComplete();
      return;
    }
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      ]);

      const cameraGranted = granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED;
      const micGranted = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED;

      if (cameraGranted && micGranted) {
        onComplete();
      } else {
        Alert.alert(
            'Permissions Required',
            'Camera and Microphone access is required for video calls. Please enable them in your device settings.',
            [{ text: 'OK', onPress: onComplete }]
        );
      }
    } catch (err) {
      console.warn(err);
      onComplete();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>🤝</Text>
        <Text style={styles.title}>Permissions Required</Text>
        <Text style={styles.description}>
          To provide the best experience, including video calls and OTP auto-fill, we need access to your device's camera, microphone, and SMS.
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermissions}>
          <Text style={styles.buttonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center' },
  content: { padding: 32, alignItems: 'center', textAlign: 'center' },
  icon: { fontSize: 80, marginBottom: 24 },
  title: { color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  description: { color: '#94a3b8', fontSize: 16, lineHeight: 24, textAlign: 'center', marginBottom: 32 },
  button: { backgroundColor: '#db2777', paddingVertical: 18, paddingHorizontal: 32, borderRadius: 12 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default PermissionsScreen;
