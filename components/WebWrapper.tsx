import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, View, BackHandler, Platform, Text } from 'react-native';
import { WebView } from 'react-native-webview';
// @ts-ignore
import { WEB_APP_URL as ENV_URL } from '@env';

// Fallback URL if env is not set
const DEFAULT_URL = 'https://google.com'; 
const WEB_APP_URL = ENV_URL || DEFAULT_URL;

export default function WebWrapper() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const onBackPress = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }
  }, [canGoBack]);

  if (!WEB_APP_URL || WEB_APP_URL.includes('your-zingle-webapp-url')) {
    return (
      <View style={styles.center}>
        <Text>Please set EXPO_PUBLIC_WEB_APP_URL in your .env file</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_APP_URL }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onPermissionRequest={request => {
          request.grant(request.resources);
        }}
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setError(`WebView error: ${nativeEvent.description}`);
        }}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      />
      {error && (
        <View style={styles.errorBanner}>
          <Text style={{ color: 'white' }}>{error}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  errorBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    padding: 10,
  }
});