import React from 'react';
import { Text, ScrollView, ImageBackground, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function SettingsScreen() {
  return (
    <ImageBackground source={require('../assets/eels/background.png')} style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <Text>Settings!</Text>
      </ScrollView>
    </ImageBackground>
  );
}
