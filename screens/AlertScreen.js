import React, { useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, View, TouchableOpacity, Image, Switch, Modal, ScrollView } from 'react-native';
import { Button, Provider } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    color: 'white',
    marginRight: 10,
  },
  item: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius: 25,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 5,
  },
  graphContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const generateEelData = (count) => {
  const data = [];
  const tanks = ['A', 'B', 'C'];
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
      group,
      tank: tanks[Math.floor(Math.random() * tanks.length)],
      date: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)), // Random date in the last 30 days
    });
  }
  return data;
};

const allEelData = generateEelData(10000);
const ITEMS_PER_PAGE = 20;

export default function AlertScreen() {
  const [viewMode, setViewMode] = useState('list');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    const startingIndex = (page - 1) * ITEMS_PER_PAGE;
    const newData = allEelData.slice(startingIndex, startingIndex + ITEMS_PER_PAGE);
    if (page === 1) {
      setDisplayedData(newData);
    } else {
      setDisplayedData((prevData) => [...prevData, ...newData]);
    }
  }, [page]);

  const handleLoadMore = () => {
    if (displayedData.length < allEelData.length) {
      setPage((prevPage) => prevPage + 1);
    }
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
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>List</Text>
            <Switch
              value={viewMode === 'graph'}
              onValueChange={(value) => setViewMode(value ? 'graph' : 'list')}
            />
            <Text style={styles.toggleLabel}>Graph</Text>
          </View>
        </View>
        {viewMode === 'list' ? (
          <FlatList
            data={displayedData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
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
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Eel ID: {selectedItem.id}</Text>
                <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.modalImage} />
                <Text style={styles.modalText}>Date: {selectedItem.date.toLocaleDateString()}</Text>
                <Button onPress={() => setModalVisible(false)}>Close</Button>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Provider>
  );
}
