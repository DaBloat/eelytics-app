import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function TankScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', paddingTop: 120 }}>
      <SafeAreaView>
        <Text>Screen 3!</Text>
      </SafeAreaView>
    </ScrollView>
  );
}
