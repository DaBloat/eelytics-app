import React from 'react';
// WebView is a new import
import { View, Text, ScrollView, StyleSheet } from 'react-native'; 
import { WebView } from 'react-native-webview'; // Replaced 'expo-av'

// --- 1. UPDATE THIS with your PC's IP address ---
const PC_STREAM_URL = 'http://192.168.0.200:8080/stream.mjpg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: '100%', // Take up the full width
    height: 10, // You can adjust this as needed
  },
  detailsContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailSection: {
    alignItems: 'center', // Center items horizontally
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // White text for titles
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 16,
    color: 'white', // White text for content
  },
});

export default function FeedScreen() {
  // This HTML code will be loaded into the WebView to display the stream
  const htmlContent = `
    <html>
      <head>
        <style>
          body { margin: 0; background-color: #000; }
          img { 
            display: block; 
            width: 100%; 
            height: 100%; 
            object-fit: contain; 
          }
        </style>
      </head>
      <body>
        <img src="${PC_STREAM_URL}" />
      </body>
    </html
  `;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'transparent' }}>
      
      {/* --- THIS IS THE REPLACEMENT FOR THE <Video> COMPONENT --- */}
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.video}
        scrollEnabled={false}
        bounces={false}
      />
      {/* --- END OF REPLACEMENT --- */}

      <View style={styles.detailsContainer}>
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Size</Text>
          <Text style={styles.sectionContent}>Medium</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Group Size</Text>
          <Text style={styles.sectionContent}>100</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Tank</Text>
          <Text style={styles.sectionContent}>Tank A</Text>
        </View>
      </View>
    </ScrollView>
  );
}