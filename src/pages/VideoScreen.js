// VideoScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const VideoScreen = ({ route, navigation }) => {
  const { videoLink } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        style={styles.video}
        javaScriptEnabled={true}
        source={{ uri: videoLink }}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    margin: 10,
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default VideoScreen;
