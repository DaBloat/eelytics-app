import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetingText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  batchButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
  },
  batchButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#1E2022',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.8)',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalCloseIcon: {
    fontSize: 30,
    color: 'white',
  },
  calendarPlaceholder: {
    height: 300,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarPlaceholderText: {
    color: 'gray',
    fontSize: 18,
  },
  batchButtonIcon: {
    color: 'white',
    marginRight: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalActionButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default function DashboardScreen({ navigation }) {
  const [greeting, setGreeting] = useState('');
  const [selectedHistogramGroup, setSelectedHistogramGroup] = useState('Elver');
  const [isBatchModalVisible, setBatchModalVisible] = useState(false);
  const [batchDate, setBatchDate] = useState('All');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const histogramGroups = ['Elver', 'Kuroko', 'Table'];
  const today = new Date().toISOString().split('T')[0];

  // Placeholder function for when the batch button is pressed
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

  const handleSaveDate = () => {
    setBatchDate(selectedDate);
    setBatchModalVisible(false);
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
        <View style={styles.header}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <TouchableOpacity style={styles.batchButton} onPress={() => setBatchModalVisible(true)}>
            <MaterialCommunityIcons name="calendar-month" size={14} style={styles.batchButtonIcon} />
            <Text style={styles.batchButtonText}>{batchDate === 'All' ? 'All Batches' : `${batchDate}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={isBatchModalVisible}
        onRequestClose={() => setBatchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setBatchModalVisible(false)}>
              <MaterialCommunityIcons name="close-circle" style={styles.modalCloseIcon} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Batch Date</Text>
            <Calendar
              current={today}
              style={{ width: 320, height: 350 }} // Set a fixed width and height for consistency
              hideExtraDays={false} // Explicitly set to false to ensure 6 weeks are always rendered
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: 'rgba(0, 122, 255, 0.8)' },
                [today]: { marked: true, dotColor: '#58B1FF' }
              }}
              theme={{
                backgroundColor: '#1E2022',
                calendarBackground: '#1E2022',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: 'rgba(0, 122, 255, 0.8)',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#58B1FF',
                dayTextColor: '#d9e1e8',
                textDisabledColor: '#444',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'white',
                disabledArrowColor: '#444',
                monthTextColor: 'white',
                indicatorColor: 'blue',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
                'stylesheet.calendar.header': {
                  week: { marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }
                }
              }}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalActionButton, { backgroundColor: '#007AFF' }]}
                onPress={handleSaveDate}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}
