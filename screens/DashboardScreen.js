import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '80%',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default function DashboardScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <View style={{ alignItems: 'center', width: '100%' }}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Machine Control</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Population</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Average Size Group</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary of Today</Text>
        </View>
      </View>
    </ScrollView>
  );
}
