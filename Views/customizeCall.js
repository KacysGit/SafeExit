import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import BackButton from "../components/backButton";
import Header from "../components/header";
import { pickImage } from '../components/imageUpload';
import { commonStyles } from '../components/styles'; // Make sure the path is correct
import EditableTextInput from "../components/EditableTextInput";
import EditableImage from "../components/EditableImage";

export default function CustomizeCall({ onCustomize, onBack, callerInfo }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(require('../assets/sunset.jpg')); // Default image
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [isPhoneNumberModalVisible, setIsPhoneNumberModalVisible] = useState(false);

  const updateCallerInfo = (updates) => {
    onCustomize({ ...callerInfo, ...updates });
  };


  
  // Use a useEffect to update the local state whenever callerInfo changes.
  React.useEffect(() => {
    setName(callerInfo.name);
    setPhoneNumber(callerInfo.phoneNumber);
    setImage(callerInfo.image.uri);
  }, [callerInfo]);

  const revertToDefault = () => {
    const defaultName = 'Unknown';
    const defaultPhoneNumber = '1 (469) 739-1437';
    const defaultImageUri = Image.resolveAssetSource(require('../assets/sunset.jpg')).uri;
    
    // Update the state variables
    setName(defaultName);
    setPhoneNumber(defaultPhoneNumber);
    setImage(defaultImageUri); // Set the default image uri directly
    
    // Update the callerInfo object that is being passed down as props
    updateCallerInfo({
      name: defaultName,
      phoneNumber: defaultPhoneNumber,
      image: { uri: defaultImageUri },
    });
  };


  // Function to handle saving the edited name
  const handleSaveName = (newName) => {
    updateCallerInfo({ name: newName });
  };

   // Function to handle saving the edited phone number
   const handleSavePhoneNumber = (newPhoneNumber) => {
    updateCallerInfo({ phoneNumber: newPhoneNumber });
  };

  // Function to handle the image selection
  const handleImageSelected = (newImageUri) => {
    updateCallerInfo({ image: { uri: newImageUri } });
  };

  return (
    <View style={commonStyles.container}>
      <Header />

      {image.uri && (
        <Image source={{ uri: image.uri }} style={commonStyles.image} />
      )}

      <EditableImage
        imageUri={callerInfo.image.uri}
        onImageSelected={handleImageSelected}
        style={commonStyles.image} // You may need to create this style if it doesn't exist
      />

      {/* Editable Text Input for Caller's Name */}
      <EditableTextInput
        value={callerInfo.name}
        onSave={handleSaveName}
        placeholder="Enter Caller's Name"
        style={commonStyles.input}
      />
      
      {/* Editable Text Input for Caller's Phone Number */}
      <EditableTextInput
        value={callerInfo.phoneNumber}
        onSave={handleSavePhoneNumber}
        placeholder="Enter Caller's Number"
        keyboardType="phone-pad" // Set keyboard type for phone number input
        style={commonStyles.input}
      />

      <TouchableOpacity style={commonStyles.button} onPress={revertToDefault}>
        <Text style={commonStyles.buttonText}>Revert to Default</Text>
      </TouchableOpacity>

      <View style={commonStyles.footer}>
        <BackButton onPress={onBack} />
      </View>

      
    </View>
  );
}

const modalStyles = StyleSheet.create({
  modalView: {
    marginTop: '50%', // Center the modal on the screen vertically
    marginHorizontal: '10%', // Add horizontal margins
    backgroundColor: 'grey', // Semi-transparent white
    borderRadius: 30,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 3,
    borderColor: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.82)', // Semi-transparent overlay
 
  },
  
});
