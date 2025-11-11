import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, ActivityIndicator, TouchableOpacity, Modal, TextInput } from 'react-native';
import Tank from '../components/Tank'; // Import the new Tank component
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Use flexGrow to allow the container to expand and enable scrolling
    paddingTop: 20,
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'stretch', // Allow children to fill the height
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.8)',
    width: '90%',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1, // Take up the remaining space
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    paddingLeft: 10, // Add some space from the tank visual
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  tankDetailsText: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
  maintainModeText: {
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    color: 'white',
  },
  tankVisualContainer: {
    height: 150,
    width: '45%',
    backgroundColor: 'rgba(100, 100, 100, 0.3)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#555',
    position: 'relative',
    overflow: 'hidden', // Ensures the water respects the border radius
    justifyContent: 'center',
    alignItems: 'center',
  },
  waterLevel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 122, 255, 0.7)', // Water color
  },
  waterLevelText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
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
  modalTankVisualContainer: {
    height: 300, // Taller for modal view
    width: '80%',
    backgroundColor: 'rgba(100, 100, 100, 0.3)',
    borderRadius: 8,
    borderWidth: 3, // Thicker border in modal
    borderColor: '#555',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  modalTankDetailsText: {
    fontSize: 16,
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonIcon: {
    color: 'white',
    fontSize: 30,
  },
  // New styles for editable fields in modal
  modalInput: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    padding: 10,
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalToggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  groupSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  groupSelectorButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  groupSelectorText: {
    fontSize: 14,
    fontWeight: 'bold',
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
  // Styles for bottom action buttons (matching FeedScreen)
  actionSection: {
    alignItems: 'center',
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 150, // Adjusted for longer text
  },
});

// Define the total height of the tanks in centimeters.
const TOTAL_TANK_HEIGHT_CM = 15;

// Define a minimum threshold. If the level is at or below this, it's critical.
const MINIMUM_THRESHOLD_CM = 2; // e.g., ~13% of total height

// Define all possible group sizes for the dropdown/selector
const ALL_GROUP_SIZES = ['Kuroko', 'Elver', 'Table'];

// This is a mock API function. Replace this with your actual fetch call.
const fetchTankDataFromAPI = async () => {
  console.log('Fetching tank data...');
  // To simulate a network request, we use a Promise that resolves after a delay.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // To test the error state, you can uncomment the next line:
      // reject(new Error('Failed to fetch tank data.'));

      // On success, resolve with the tank data.
      resolve([
        {
          name: 'Tank A',
          level: 10, // Current level
          population: 0,
          description: 'Main breeding tank for Elver eels.',
          acceptedGroups: ['Elver'],
          maintainedLevelCm: 10,
          mode: 'MAINTENANCE',
        },
        {
          name: 'Tank B',
          level: 15, // Current level
          population: 0,
          description: 'Grow-out tank for Table-size eels.',
          acceptedGroups: ['Table'],
          maintainedLevelCm: 12,
          mode: 'HOUSING',
        },
        {
          name: 'Tank C',
          level: 1, // Current level
          population: 0,
          description: 'Quarantine tank for new Kuroko eels.',
          acceptedGroups: ['Kuroko'],
          maintainedLevelCm: 8,
          mode: 'MAINTENANCE',
        },
      ]);
    }, 1500); // 1.5-second delay to simulate network latency
  });
};

export default function TankScreen() {
  const [tanks, setTanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTank, setSelectedTank] = useState(null);
  // State for editable fields in modal
  const [editedDescription, setEditedDescription] = useState('');
  const [editedAcceptedGroups, setEditedAcceptedGroups] = useState([]);
  const [editedMaintainedLevelCm, setEditedMaintainedLevelCm] = useState('');
  const [editedMode, setEditedMode] = useState('');

  useEffect(() => {
    const loadTankData = async () => {
      try {
        const data = await fetchTankDataFromAPI();
        setTanks(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTankData();
  }, []); // The empty dependency array ensures this runs only once on mount.

  // This useEffect simulates live data coming from sensors.
  // In a real application, you would replace this with your WebSocket listener or polling logic.
  useEffect(() => {
    const sensorInterval = setInterval(() => {
      setTanks(currentTanks => {
        // If there are no tanks, do nothing.
        if (currentTanks.length === 0) {
          return [];
        }
        // Map over the current tanks to produce a new state.
        return currentTanks.map(tank => {
          // In HOUSING mode, the system tries to maintain the water level.
          if (tank.mode === 'HOUSING') {
            // Calculate the difference from the target level.
            const difference = tank.maintainedLevelCm - tank.level;
            
            // Create a small correction force pulling the level towards the target.
            const correction = difference * 0.1;

            // Add a smaller random fluctuation to simulate natural variations.
            const fluctuation = (Math.random() - 0.5) * 0.4;

            let newLevel = tank.level + correction + fluctuation;

            // Ensure the new level stays within the tank's physical bounds (0 to 15 cm).
            newLevel = Math.max(0, Math.min(newLevel, TOTAL_TANK_HEIGHT_CM));
            return { ...tank, level: parseFloat(newLevel.toFixed(1)) };
          }
          // In MAINTENANCE mode, the level does not change.
          return tank;
        });
      });
    }, 3000); // Update every 3 seconds.

    return () => clearInterval(sensorInterval); // Cleanup on unmount to prevent memory leaks.
  }, []); // The empty dependency array ensures this effect runs only once.

  if (isLoading) {
    return <View style={[styles.container, { justifyContent: 'center' }]}><ActivityIndicator size="large" color="#007AFF" /></View>;
  }

  if (error) {
    return <View style={[styles.container, { justifyContent: 'center' }]}><Text style={styles.sectionTitle}>{error}</Text></View>;
  }

  const handleOpenModal = (tank) => {
    setSelectedTank(tank);
    setIsModalVisible(true);
    // Initialize editable states with current tank values
    setEditedDescription(tank.description);
    setEditedAcceptedGroups(tank.acceptedGroups);
    setEditedMaintainedLevelCm(tank.maintainedLevelCm.toString()); // Convert number to string
    setEditedMode(tank.mode);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTank(null);
    // Clear editable states
    setEditedDescription('');
    setEditedAcceptedGroups([]);
    setEditedMaintainedLevelCm('');
    setEditedMode('');
  };

  const handleSaveTankDetails = () => {
    if (!selectedTank) return;

    const updatedTanks = tanks.map(tank => {
      if (tank.name === selectedTank.name) {
        return {
          ...tank,
          description: editedDescription,
          acceptedGroups: editedAcceptedGroups,
          maintainedLevelCm: parseInt(editedMaintainedLevelCm, 10) || 0, // Convert string to number
          mode: editedMode,
        };
      }
      return tank;
    });
    setTanks(updatedTanks);
    handleCloseModal();
  };

  const handleToggleGroup = (group) => {
    // Enforce single selection: always replace the current selection with the new one.
    setEditedAcceptedGroups([group]);
  };

  // Placeholder function for flushing water
  const handleFlushWater = () => {
    if (!selectedTank) return;
    console.log(`Flushing water for ${selectedTank.name}`);
  };

  // Placeholder function for adding water
  const handleAddWater = () => {
    if (!selectedTank) return;
    console.log(`Adding water to ${selectedTank.name}`);
  };

  // Placeholder function for flushing all tanks
  const handleFlushAll = () => {
    console.log('Flushing all tanks...');
    const updatedTanks = tanks.map(tank => ({
      ...tank,
      level: 0,
      mode: 'MAINTENANCE',
    }));
    setTanks(updatedTanks);
  };

  // Placeholder function for changing mode for all tanks
  const handleChangeModeAll = () => {
    console.log('Changing mode for all tanks to HOUSING...');
    const updatedTanks = tanks.map(tank => ({
      ...tank,
      mode: 'HOUSING',
    }));
    setTanks(updatedTanks);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {tanks.map((tank) => (
          <Tank key={tank.name} tank={tank} onOpenModal={handleOpenModal} styles={styles} />
        ))}

        <View style={styles.actionSection}>
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#E59400' }]}
              onPress={handleFlushAll}
            >
              <Text style={styles.modalButtonText}>Flush All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#007AFF' }]} onPress={handleChangeModeAll}>
              <Text style={styles.modalButtonText}>Change Mode All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {selectedTank && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <MaterialCommunityIcons name="close-circle" style={styles.closeButtonIcon} />
              </TouchableOpacity>
              <Text style={styles.modalSectionTitle}>{selectedTank.name}</Text>
              <View style={[styles.modalTankVisualContainer, { borderColor: selectedTank.level >= TOTAL_TANK_HEIGHT_CM || selectedTank.level <= MINIMUM_THRESHOLD_CM || selectedTank.level !== selectedTank.maintainedLevelCm ? 'red' : 'green' }]}>
                <View style={[styles.waterLevel, { height: `${(selectedTank.level / TOTAL_TANK_HEIGHT_CM) * 100}%` }]} />
                <Text style={styles.waterLevelText}>{`${selectedTank.level} cm`}</Text>
              </View>

              {/* Editable Description */}
              <TextInput
                style={styles.modalInput}
                value={editedDescription}
                onChangeText={setEditedDescription}
                placeholder="Tank Description"
                placeholderTextColor="gray"
                multiline
              />

              {/* Group Size Selector */}
              <View style={styles.groupSelectorContainer}>
                {ALL_GROUP_SIZES.map(group => {
                  const isSelected = editedAcceptedGroups.includes(group);
                  return (
                    <TouchableOpacity
                      key={group}
                      style={[
                        styles.groupSelectorButton,
                        { backgroundColor: isSelected ? '#007AFF' : 'transparent', borderColor: isSelected ? '#007AFF' : 'gray' }
                      ]}
                      onPress={() => handleToggleGroup(group)}
                    >
                      <Text style={[styles.groupSelectorText, { color: isSelected ? 'white' : 'gray' }]}>{group}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Editable Maintained Level */}
              <TextInput
                style={styles.modalInput}
                value={editedMaintainedLevelCm}
                onChangeText={setEditedMaintainedLevelCm}
                placeholder="Maintained Level (cm)"
                placeholderTextColor="gray"
                keyboardType="numeric"
              />

              {/* Toggleable Mode Button */}
              <TouchableOpacity
                style={[styles.modalToggleButton, { backgroundColor: editedMode === 'HOUSING' ? 'green' : 'red' }]}
                onPress={() => setEditedMode(prevMode => prevMode === 'HOUSING' ? 'MAINTENANCE' : 'HOUSING')}
              >
                <Text style={[styles.maintainModeText, { color: 'white' }]}>MODE: {editedMode}</Text>
              </TouchableOpacity>

              <Text style={styles.modalTankDetailsText}>
                Current Level: {selectedTank.level} cm
              </Text>
              <Text style={styles.modalTankDetailsText}>
                Population: {selectedTank.population}
              </Text>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalActionButton, { backgroundColor: '#007AFF' }]}
                  onPress={handleSaveTankDetails}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalActionButton,
                    { backgroundColor: editedMode === 'HOUSING' ? 'gray' : '#E59400' },
                  ]}
                  onPress={handleFlushWater}
                  disabled={editedMode === 'HOUSING'}
                >
                  <Text style={styles.modalButtonText}>Flush</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalActionButton,
                    { backgroundColor: editedMode === 'HOUSING' ? 'gray' : '#4CAF50' },
                  ]}
                  onPress={handleAddWater}
                  disabled={editedMode === 'HOUSING'}
                >
                  <Text style={styles.modalButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
