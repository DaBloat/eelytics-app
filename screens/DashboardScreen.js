import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetingText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 16, // Add horizontal padding to align with sections
  },
  section: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 16, // Set left and right margin to 16
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default function DashboardScreen() {
  const [greeting, setGreeting] = useState('');
  const userName = 'Kurt'; // User's first name

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return `Good Morning, ${userName}`;
      } else if (currentHour === 12) {
        return `Good Noon, ${userName}`;
      } else if (currentHour < 18) {
        return `Good Afternoon, ${userName}`;
      } else {
        return `Good Evening, ${userName}`;
      }
    };
    setGreeting(getGreeting());
  }, []); // Run only once when the component mounts

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'transparent' }}>
      <View style={{ width: '100%', paddingTop: 20 }}>
        <Text style={styles.greetingText}>{greeting}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Machine Status</Text>
          {/* Visualization has been moved to SettingsScreen */}
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
