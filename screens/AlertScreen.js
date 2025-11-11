import React, { useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, View, TouchableOpacity, Image, Switch, Modal, ScrollView, TextInput } from 'react-native';
import { Button, Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items to start and end
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 5,
  },
  item: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.8)',
  },
  itemNumber: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  placeholderImage: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'white',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  // Re-using the circle button style from the Feed screen for consistency
  viewToggleButton: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    margin: 2, // Add a small margin around the button
  },
  circleButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  closeButtonIcon: {
    color: 'white',
    fontSize: 24,
  },
  paginationButtonContainer: {
    flexDirection: 'row',
    // No marginLeft needed if using space-between in header
  },
  paginationButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    borderWidth: 0.5, // Make border slightly thinner for pagination buttons
    borderColor: 'rgba(0, 122, 255, 0.8)',
    marginLeft: 5, // Space between buttons
    backgroundColor: 'transparent',
  },
  paginationButtonActive: {
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
  },
  paginationButtonText: {
    color: 'white',
    fontSize: 12,
  },
  graphContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eelImagePlaceholder: {
    width: 250,
    height: 180,
    backgroundColor: '#555',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eelImagePlaceholderText: {
    color: 'white',
    fontSize: 18,
  },
  modalText: {
    color: 'white',
    fontSize: 17,
    marginBottom: 8,
  },
});

const generateEelData = (count) => {
  const data = [];
  const tanks = ['A', 'B', 'C'];
  const groups = ['Table', 'Kuroko', 'Elver'];
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 10;
    let group = '';
    if (size > 7) {
      group = 'Table';
    } else if (size > 5) {
      group = 'Kuroko';
    } else {
      group = 'Elver';
    }
    data.push({
      id: i.toString(),
      size: size.toFixed(2),
      group: groups[Math.floor(Math.random() * groups.length)],
      tank: tanks[Math.floor(Math.random() * tanks.length)],
      date: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)), // Random date in the last 30 days
    });
  }
  return data;
};

const allEelData = generateEelData(10000); // Generate a large dataset

export default function AlertScreen() {
  const [viewMode, setViewMode] = useState('list');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [displayedData, setDisplayedData] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(50); // Default to 50 items

  // Effect to update the displayed data when the limit changes
  useEffect(() => {
    // Slice the main data array to get the desired number of items
    const newData = allEelData.slice(0, displayLimit);
    setDisplayedData(newData);
  }, [displayLimit]); // This effect runs whenever displayLimit changes

  const handleChangeItemsPerPage = (newCount) => {
    setDisplayLimit(newCount);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.itemNumber}>{index + 1}</Text>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{`Eel Size: ${item.size} inches`}</Text>
        <Text style={styles.title}>{`Group: ${item.group}`}</Text>
        <Text style={styles.title}>{`Tank: ${item.tank}`}</Text>
        <Text style={styles.title}>{`Date: ${item.date.toLocaleDateString()}`}</Text>
      </View>
      <View style={styles.placeholderImage} />
    </TouchableOpacity>
  );



  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.viewToggleButton}
            onPress={() => setViewMode(viewMode === 'list' ? 'graph' : 'list')}>
            <MaterialCommunityIcons name={viewMode === 'list' ? 'chart-bar' : 'format-list-bulleted'} size={20} color="white" />
          </TouchableOpacity>
          {/* Pagination Controls */}
          <View style={styles.paginationButtonContainer}>
            {[50, 100, 200].map((count) => (
              <TouchableOpacity
                key={count}
                style={[styles.paginationButton, displayLimit === count && styles.paginationButtonActive]}
                onPress={() => handleChangeItemsPerPage(count)}
              >
                <Text style={styles.paginationButtonText}>{count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {viewMode === 'list' ? (
          <FlatList
            data={displayedData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
          />
        ) : (
          <ScrollView>
            <View style={styles.graphContainer}>
              <Text style={styles.title}>Graph View Placeholder</Text>
            </View>
          </ScrollView>
        )}
        {selectedItem && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <MaterialCommunityIcons name="close-circle" style={styles.closeButtonIcon} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Eel Information</Text>
                
                <View style={styles.eelImagePlaceholder}>
                  <Text style={styles.eelImagePlaceholderText}>Eel Image Placeholder</Text>
                </View>

                <Text style={styles.modalText}>{`Eel Size: ${selectedItem.size} inches`}</Text>
                <Text style={styles.modalText}>{`Group Size: ${selectedItem.group}`}</Text>
                <Text style={styles.modalText}>{`Tank: ${selectedItem.tank}`}</Text>
                <Text style={styles.modalText}>{`Date: ${selectedItem.date.toLocaleDateString()}`}</Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.circleButton}>
                    <MaterialCommunityIcons name="content-save" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.circleButton}>
                    <MaterialCommunityIcons name="pencil" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.circleButton, styles.deleteButton]}>
                    <MaterialCommunityIcons name="delete" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}






      </View>
    </Provider>
  );
}