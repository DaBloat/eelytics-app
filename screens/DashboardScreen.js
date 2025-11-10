import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    borderWidth: 1,
    position: 'relative', // Needed for absolute positioning of children
    borderColor: 'rgba(0, 122, 255, 0.8)',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: 'white',
    fontSize: 16,
  },
  summaryValue: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  batchButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  batchButtonText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
    fontWeight: '600',
  },
  populationContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center',
  },
  populationValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#58B1FF', // Using the same blue as average sizes
  },
  populationBreakdownContainer: {
    // Styles for the new breakdown section's content
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  breakdownLabel: {
    color: 'white',
    fontSize: 12,
  },
  breakdownValue: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  populationLabel: {
    color: 'white',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  // Styles for Histogram
  histogramButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    zIndex: 1, // Ensure it's above other elements
  },
  histogramButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.8)',
  },
  histogramButtonActive: {
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
  },
  histogramButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  histogramContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end', // Align bars to the bottom
    height: 150, // Set a fixed height for the chart area
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'gray',
    paddingTop: 10,
  },
  histogramBarWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  histogramBar: {
    width: '80%',
    backgroundColor: '#58B1FF',
    borderRadius: 4,
  },
  histogramLabel: {
    color: 'white',
    fontSize: 10,
    marginTop: 5,
  },
});

export default function DashboardScreen({ navigation }) {
  const [greeting, setGreeting] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedHistogramGroup, setSelectedHistogramGroup] = useState('Elver');

  const histogramGroups = ['Elver', 'Kuroko', 'Table'];

  // Placeholder function for when the batch button is pressed
  const handleBatchSelect = () => console.log('Batch selection modal should open.');
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

  const handleCycleHistogramGroup = () => {
    const currentIndex = histogramGroups.indexOf(selectedHistogramGroup);
    const nextIndex = (currentIndex + 1) % histogramGroups.length;
    setSelectedHistogramGroup(histogramGroups[nextIndex]);
  };

  const histogramData = {
    Elver: [
      { range: '2"', count: 600 },
      { range: '3"', count: 1800 },
      { range: '4"', count: 2600 },
    ],
    Kuroko: [
      { range: '6"', count: 1200 },
      { range: '7"', count: 2282 },
      { range: '8"', count: 1500 },
    ],
    Table: [
      { range: '8"', count: 500 },
      { range: '9"', count: 800 },
      { range: '10"', count: 450 },
      { range: '11"', count: 200 },
      { range: '12"', count: 50 },
    ],
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'transparent' }}>
      <View style={{ width: '100%', paddingTop: 20 }}>
        <Text style={styles.greetingText}>{greeting}</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.batchButton} onPress={handleBatchSelect}>
            <MaterialCommunityIcons name="layers-outline" size={14} color="white" />
            <Text style={styles.batchButtonText}>Batch: {selectedBatch}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Average Size (inch)</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#58B1FF' }]}>4.8</Text>
              <Text style={styles.summaryLabel}>Elver</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#58B1FF' }]}>6.2</Text>
              <Text style={styles.summaryLabel}>Kuroko</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#58B1FF' }]}>8.1</Text>
              <Text style={styles.summaryLabel}>Table</Text>
            </View>
          </View>
        </View>
        <View style={styles.horizontalContainer}>
          <View style={[styles.section, { flex: 1, marginRight: 10, marginHorizontal: 0, marginBottom: 0 }]}>
            <Text style={styles.sectionTitle}>Total Population</Text>
            <View style={styles.populationContainer}>
              <Text style={styles.populationValue}>10,482</Text>
            </View>
          </View>
          <View style={[styles.section, { flex: 1, marginLeft: 10, marginHorizontal: 0, marginBottom: 0, justifyContent: 'center' }]}>
            <View style={styles.populationBreakdownContainer}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Elver:</Text>
                <Text style={styles.breakdownValue}>5,000</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Kuroko:</Text>
                <Text style={styles.breakdownValue}>3,482</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Table:</Text>
                <Text style={styles.breakdownValue}>2,000</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.histogramButtonContainer}>
            <TouchableOpacity
              style={[styles.histogramButton, styles.histogramButtonActive]}
              onPress={handleCycleHistogramGroup}
            >
              <Text style={styles.histogramButtonText}>{selectedHistogramGroup}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Size Distribution</Text>
          <View style={styles.histogramContainer}>
            {histogramData[selectedHistogramGroup].map((dataPoint, index) => {
              const maxCount = Math.max(...histogramData[selectedHistogramGroup].map(d => d.count));
              const barHeight = (dataPoint.count / maxCount) * 100; // Height as a percentage
              return (
                <View key={index} style={styles.histogramBarWrapper}>
                  <View style={[styles.histogramBar, { height: `${barHeight}%` }]} />
                  <Text style={styles.histogramLabel}>{dataPoint.range}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Machine Status</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { fontSize: 22, color: '#4CAF50' }]}>OK</Text>
                <Text style={[styles.summaryLabel, { fontSize: 14 }]}>API</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { fontSize: 22, color: '#FFC107' }]}>WAIT</Text>
                <Text style={[styles.summaryLabel, { fontSize: 14 }]}>Database</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { fontSize: 22, color: '#F44336' }]}>ERR</Text>
                <Text style={[styles.summaryLabel, { fontSize: 14 }]}>MQTT</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
