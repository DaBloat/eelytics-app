import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: 'transparent' }}>
      <Text>Settings!</Text>
    </ScrollView>
  );
}
