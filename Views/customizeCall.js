import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import BackButton from "../components/backButton";
import Header from "../components/header";
import { pickImage } from '../components/imageUpload';
import { commonStyles } from '../components/styles'; // Make sure the path is correct

export default function CustomizeCall({ onCustomize, onBack, callerInfo }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(require('../assets/sunset.jpg')); // Default image
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [isPhoneNumberModalVisible, setIsPhoneNumberModalVisible] = useState(false);

  const handleCustomize = (newImageUri) => {
    onCustomize({
      ...callerInfo,
      image: newImageUri ? { uri: newImageUri } : callerInfo.image,
    });
  };

  const updateCallerInfo = (updates) => {
    onCustomize({ ...callerInfo, ...updates });
  };

  const handleNameChange = (newName) => {
    setName(newName);
    updateCallerInfo({ name: newName });
  };

  const handlePhoneNumberChange = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
    updateCallerInfo({ phoneNumber: newPhoneNumber });
  };

  const revertToDefault = () => {
    const defaultName = 'Unknown';
    const defaultPhoneNumber = '1 (469) 739-1437';
    setName(defaultName);
    setPhoneNumber(defaultPhoneNumber);
    setImage(require('../assets/sunset.jpg'));
    onCustomize({
      name: defaultName,
      phoneNumber: defaultPhoneNumber,
      image: require('../assets/sunset.jpg'),
    });
  };

  const handleImagePick = async () => {
    await pickImage(handleImagePicked);
  };

  const handleImagePicked = (uri) => {
    handleCustomize(uri);
  };

  return (
    <View style={commonStyles.container}>
      <Header />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(newName) => handleNameChange(newName)}
        style={commonStyles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(newPhoneNumber) => handlePhoneNumberChange(newPhoneNumber)}
        style={commonStyles.input}
      />

      <TouchableOpacity style={commonStyles.button} onPress={handleImagePick}>
        <Text style={commonStyles.buttonText}>Upload Caller Image</Text>
      </TouchableOpacity>

      {image.uri && (
        <Image source={{ uri: image.uri }} style={commonStyles.image} />
      )}

      <TouchableOpacity style={commonStyles.button} onPress={() => setIsNameModalVisible(true)}>
        <Text style={commonStyles.buttonText}>Edit Caller's Name</Text>
      </TouchableOpacity>

      <TouchableOpacity style={commonStyles.button} onPress={() => setIsPhoneNumberModalVisible(true)}>
        <Text style={commonStyles.buttonText}>Edit Caller's Number</Text>
      </TouchableOpacity>

      <TouchableOpacity style={commonStyles.button} onPress={revertToDefault}>
        <Text style={commonStyles.buttonText}>Revert to Default</Text>
      </TouchableOpacity>

      <View style={commonStyles.footer}>
        <BackButton onPress={onBack} />
      </View>

      {/* Name Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNameModalVisible}
        onRequestClose={() => setIsNameModalVisible(false)}
      >
        <View style={modalStyles.modalView}>
          <TextInput
            style={commonStyles.input}
            value={name}
            onChangeText={(newName) => handleNameChange(newName)}
          />
          <TouchableOpacity
            style={commonStyles.button}
            onPress={() => setIsNameModalVisible(false)}
          >
            <Text style={commonStyles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Phone Number Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPhoneNumberModalVisible}
        onRequestClose={() => setIsPhoneNumberModalVisible(false)}
      >
        <View style={modalStyles.modalView}>
          <TextInput
            style={commonStyles.input}
            value={phoneNumber}
            onChangeText={(newPhoneNumber) => handlePhoneNumberChange(newPhoneNumber)}
          />
          <TouchableOpacity
            style={commonStyles.button}
            onPress={() => setIsPhoneNumberModalVisible(false)}
          >
            <Text style={commonStyles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
