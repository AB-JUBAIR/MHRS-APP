import React, { useState, useRef, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, SafeAreaView, StatusBar, BackHandler, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const webviewRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      if (webviewRef.current) {
        webviewRef.current.goBack();
        return true; // prevent default back behavior
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  if (loading) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('../assets/images/logo1.png')} style={styles.logo} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://mhrs.free.nf' }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  logo: { width: 200, height: 200, resizeMode: 'contain' },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
