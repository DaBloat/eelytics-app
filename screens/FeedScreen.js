import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { WebView } from 'react-native-webview'; // WebView is already imported
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

const logo = require('../assets/eels/logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center', // Center the WebView horizontally
  },
  videoWrapper: {
    // This wrapper will contain both the WebView and the button
    position: 'relative',
  },
  video: {
    backgroundColor: 'black',
    width: '90%', // Adjust width to account for margin
    aspectRatio: 16 / 9, // Enforce a 16:9 aspect ratio
    borderRadius: 10, // Add rounded corners for a cleaner look
    overflow: 'hidden', // Ensure content respects the border radius
    // Add a uniform margin around the wrapper
    borderWidth: 2, // Add a border
    borderColor: 'rgba(0, 122, 255, 0.8)', // Use the app's blue color for the border
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  modalDetailsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.8)', 
  },
  modalDetailText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  streamNameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  streamNameText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  detailsContainer: {
    flexDirection: 'column', // Stack the detail boxes vertically
    alignItems: 'center', // Center the boxes horizontally
    paddingTop: 20,
    width: '100%',
  },
  detailSection: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.8)',
    width: '90%', // Make the boxes wider to fit the vertical layout
    marginBottom: 15, // Add space between the vertical boxes
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 16,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute', // Position the button over the WebView
    bottom: 10, // Add some padding from the bottom of the video
    right: 10, // Add some padding from the right of the video
    zIndex: 1,
  },
  circleButton: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});

const STREAMS = {
  processed: 'http://192.168.1.220:8889/processed/',
  cam: 'http://192.168.1.220:8889/cam/',
};

// This script will run inside the WebView to hide controls and ensure autoplay
const injectedJavaScript = `
  function hideVideoControls() {
    const video = document.querySelector("video");
    if (video) {
      video.controls = false; // Hides the controls
      video.autoplay = true; // Ensure autoplay is set
      video.muted = true; // Mute is often required for autoplay
      video.playsInline = true; // For iOS inline playback
      video.style.objectFit = "cover"; // Ensures video fills the container
      video.play().catch(error => {
        // Autoplay might be blocked, but controls should still be hidden
        console.log("Autoplay prevented:", error);
      });
    }
  }

  // Run immediately and then repeatedly for a short period to catch dynamic loading
  hideVideoControls();
  const intervalId = setInterval(hideVideoControls, 500); // Check every 500ms
  // Stop checking after a few seconds to save resources
  setTimeout(() => clearInterval(intervalId), 5000); // Stop after 5 seconds
  // The 'true' at the end is required for the script to run correctly on iOS.
  true; 
`;

export default function FeedScreen() {
  const [currentStream, setCurrentStream] = useState(STREAMS.processed);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [streamNameToDisplay, setStreamNameToDisplay] = useState(null);
  const [feedError, setFeedError] = useState(false);
  const [fullscreenFeedError, setFullscreenFeedError] = useState(false);

  const handleToggleStream = () => {
    // Determine which stream we are switching TO
    const nextStreamName = currentStream === STREAMS.processed ? '/cam' : '/processed';
    const nextStreamUrl = currentStream === STREAMS.processed ? STREAMS.cam : STREAMS.processed;

    // Show the name of the next stream
    setStreamNameToDisplay(nextStreamName);

    // Switch the stream
    setCurrentStream(nextStreamUrl);

    // Hide the text overlay after 2 seconds
    setTimeout(() => setStreamNameToDisplay(null), 2000);
  };

  const enterFullScreen = async () => {
    setIsFullScreen(true);
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  };

  const exitFullScreen = async () => {
    setIsFullScreen(false);
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={enterFullScreen}>
        <View style={[styles.video, styles.videoWrapper]}>
          {feedError ? (
              <Image source={logo} style={{ width: 75, height: '100%', alignSelf: 'center', resizeMode: 'contain' }} />
          ) : (
            <WebView
              key={currentStream}
              source={{ uri: currentStream }}
              style={{ flex: 1 }}
              scrollEnabled={false}
              mediaPlaybackRequiresUserAction={false} // Allow autoplay without user interaction
              allowsInlineMediaPlayback={true} // Allow inline playback on iOS
              injectedJavaScript={injectedJavaScript}
              onError={() => setFeedError(true)}
              onLoad={() => setFeedError(false)}
            />
          )}
          {streamNameToDisplay && (
            <View style={styles.streamNameOverlay}>
              <Text style={styles.streamNameText}>{streamNameToDisplay}</Text>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.circleButton} onPress={handleToggleStream}>
              <MaterialCommunityIcons name="camera-switch" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Size</Text>
          <Text style={styles.sectionContent}>-</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Group Size</Text>
          <Text style={styles.sectionContent}>-</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Tank</Text>
          <Text style={styles.sectionContent}>-</Text>
        </View>
      </View>

      <Modal visible={isFullScreen} supportedOrientations={['landscape']}>
        <View style={styles.fullScreenContainer}>
          <TouchableOpacity style={{ flex: 1 }} onPress={exitFullScreen}>
            {fullscreenFeedError ? (
              <Image source={logo} style={{ width: 75, height: '100%', alignSelf: 'center', resizeMode: 'contain' }} />
            ) : (
              <WebView
                key={`fullscreen-${currentStream}`} // Use a different key for the fullscreen WebView
                source={{ uri: currentStream }}
                style={{ flex: 1 }}
                scrollEnabled={false}
                mediaPlaybackRequiresUserAction={false} // Allow autoplay without user interaction
                allowsInlineMediaPlayback={true} // Allow inline playback on iOS
                injectedJavaScript={injectedJavaScript}
                onError={() => setFullscreenFeedError(true)}
                onLoad={() => setFullscreenFeedError(false)}
              />
            )}
            <View style={styles.modalDetailsContainer}>
              <Text style={styles.modalDetailText}>Size: -</Text>
              <Text style={styles.modalDetailText}>Group Size: -</Text>
              <Text style={styles.modalDetailText}>Tank: -</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}