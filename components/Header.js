import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const Header = ({ title }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Image source={require('../assets/eels/logo.png')} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={require('../assets/user/KURT.png')} style={styles.profilePhoto} />
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.modalHeader}>
            <Image source={require('../assets/user/KURT.png')} style={styles.profilePhoto} />
            <Text style={styles.userName}>Villamor, Kurt Russel A.</Text>
          </View>
          <TouchableOpacity style={styles.menuItem} onPress={toggleModal}>
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={toggleModal}>
            <Text style={styles.menuItemText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={toggleModal}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 120,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 10,
    
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePhoto: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  modal: {
    margin: 0,
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E2022',
    width: '80%',
    height: '100%',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuItemText: {
    color: 'white',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoutButton: {
    paddingVertical: 15,
  },
  logoutButtonText: {
    color: 'red',
  },
});

export default Header;