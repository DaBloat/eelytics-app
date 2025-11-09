import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  section: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 16, // Set left and right margin to 16
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.8)',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // Styles for Machine Status Visualization
  visualizationContainer: {
    height: 250, // Increased height for the new server node
    alignItems: 'center',
    paddingVertical: 10,
  },
  serverNode: {
    width: 70,
    height: 40,
    backgroundColor: '#607D8B', // A neutral server gray
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    top: 10,
  },
  youNode: {
    width: 50,
    height: 40,
    backgroundColor: '#007AFF', // App's primary blue color
    borderRadius: 20, // Make it an oval shape
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    top: 10,
    right: '10%', // Position on the upper right
  },
  raspiCamNode: {
    width: 50,
    height: 30,
    backgroundColor: '#00BCD4', // A cyan color for the camera
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    top: 85, // Align vertically with Raspi node
    left: '15%', // Position to the left of the Raspi node
  },
  raspiNode: {
    width: 60,
    height: 40,
    backgroundColor: '#C70039', // Raspberry Pi red
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    top: 80,
  },
  nodeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  espContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 40,
  },
  espNodeWrapper: {
    alignItems: 'center',
  },
  espNode: {
    width: 50,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  connectionLine: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
  },
  signalIcon: {
    position: 'absolute',
    top: 55,
    right: '25%',
    transform: [{ rotate: '45deg' }],
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
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
  modalText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalCloseIcon: {
    fontSize: 30,
    color: 'white',
  },
});

const espDevices = [
  { name: 'ESP-01', color: '#4CAF50' }, // Green
  { name: 'ESP-02', color: '#FFC107' }, // Amber
  { name: 'ESP-03', color: '#2196F3' }, // Blue
  { name: 'ESP-04', color: '#9C27B0' }, // Purple
  { name: 'ESP-05', color: '#E91E63' }, // Pink
];

// Placeholder details for each node
const nodeDetails = {
  YOU: { title: 'Your Device', details: 'Status: Connected\nIP: 192.168.1.105' },
  SERVER: { title: 'Main Server', details: 'Status: Online\nUptime: 99.98%\nIP: 10.0.0.1' },
  RASPI: { title: 'Raspberry Pi', details: 'Status: Online\nTemp: 45°C\nIP: 192.168.1.220' },
  CAM: { title: 'Raspi Cam', details: 'Status: Streaming\nResolution: 1080p' },
  'ESP-01': { title: 'ESP-01 (Receiver)', details: 'Status: Connected\nLast Reading: 10cm' },
  'ESP-02': { title: 'ESP-02 (Segregation Gate)', details: 'Status: Connected\nLast Reading: 6.8 pH' },
  'ESP-03': { title: 'ESP-03 (Tank A)', details: 'Status: Connected\nLast Reading: 28°C' },
  'ESP-04': { title: 'ESP-04 (Tank B)', details: 'Status: Disconnected\nLast Active: 2h ago' },
  'ESP-05': { title: 'ESP-05 (Tank C)', details: 'Status: Connected\nLast Reading: 8.2 mg/L' },
};

export default function SettingsScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodePress = (nodeKey) => {
    setSelectedNode(nodeDetails[nodeKey]);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedNode(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ width: '100%', paddingTop: 20 }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Machine Status</Text>
            <View style={styles.visualizationContainer}>
              {/* "YOU" Node */}
              <TouchableOpacity style={styles.youNode} onPress={() => handleNodePress('YOU')}>
                <Text style={styles.nodeText}>YOU</Text>
              </TouchableOpacity>
              {/* Wireless signal from YOU to Raspi */}
              <MaterialCommunityIcons name="wifi" size={30} color="#FFC107" style={styles.signalIcon} />

              {/* Server Node */}
              <TouchableOpacity style={styles.serverNode} onPress={() => handleNodePress('SERVER')}>
                <Text style={styles.nodeText}>SERVER</Text>
              </TouchableOpacity>
              {/* Line from Server to Raspi */}
              <View style={[styles.connectionLine, { top: 50, width: 2, height: 30 }]} />

              {/* Raspi Cam Node */}
              <TouchableOpacity style={styles.raspiCamNode} onPress={() => handleNodePress('CAM')}>
                <Text style={styles.nodeText}>CAM</Text>
              </TouchableOpacity>

              {/* Line from Raspi Cam to Raspi */}
              <View style={[styles.connectionLine, { top: 99, left: '30%', width: '15%', height: 2 }]} />

              {/* Raspi Node */}
              <TouchableOpacity style={styles.raspiNode} onPress={() => handleNodePress('RASPI')}>
                <Text style={styles.nodeText}>RASPI</Text>
              </TouchableOpacity>

              {/* Line from Raspi to Bus */}
              <View style={[styles.connectionLine, { top: 120, width: 2, height: 12 }]} />

              {/* Main Bus Line */}
              <View style={[styles.connectionLine, { top: 132, width: '80%', height: 2 }]} />

              {/* ESP32 Nodes */}
              <View style={styles.espContainer}>
                {espDevices.map((device, index) => (
                  <View key={device.name} style={styles.espNodeWrapper}>
                    {/* Line from Bus to ESP */}
                    <View style={[styles.connectionLine, { bottom: 29, width: 2, height: 49 }]} />
                    <TouchableOpacity style={[styles.espNode, { backgroundColor: device.color }]} onPress={() => handleNodePress(device.name)}>
                      <Text style={styles.nodeText}>{device.name}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {selectedNode && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalCloseButton} onPress={handleCloseModal}>
                <MaterialCommunityIcons name="close-circle" style={styles.modalCloseIcon} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedNode.title}</Text>
              <Text style={styles.modalText}>{selectedNode.details}</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
