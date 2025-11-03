import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ title }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
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
          <Image source={require('../assets/eels/background.png')} style={styles.bannerImage} />
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}> X </Text>
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <Image source={require('../assets/user/KURT.png')} style={styles.modalProfilePhoto} />
            <Text style={styles.userName}>Villamor, Kurt Russel A.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.circleButton} onPress={toggleModal}>
              <MaterialCommunityIcons name="book-open-page-variant" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton} onPress={toggleModal}>
              <MaterialCommunityIcons name="information-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.circleButton, styles.logoutButton]} onPress={toggleModal}>
              <MaterialCommunityIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.copyrightText}>© 2025 EelMate @ Eelytics All Rights Reserved</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90,
    backgroundColor: 'rgba(30, 32, 34, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomColor: '#007AFF',
    borderBottomWidth: 1,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3
  },
  profilePhoto: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 15,
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  modal: {
    margin: 0,
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E2022',
    width: '80%',
    height: '100%',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    position: 'absolute',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  modalProfilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#007AFF',
    borderWidth: 3,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 12,
  },
  copyrightText: {
    color: 'gray',
    fontSize: 10,
    position: 'absolute',
    bottom: 20,
  },
});

export default Header;