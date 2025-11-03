import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function TankScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <View>
        <Text>Screen 3!</Text>
      </View>
    </ScrollView>
  );
}
