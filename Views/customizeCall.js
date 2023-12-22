import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import BackButton from "../components/backButton";
import Header from "../components/header";
import { pickImage } from '../components/imageUpload';
import { commonStyles } from '../components/styles'; // Make sure the path is correct
import EditableTextInput from "../components/EditableTextInput";
import EditNumberInput from "../components/EditNumberInput";
import EditableImage from "../components/EditableImage";
import SetCounter from '../components/SetCounter'; // Adjust path as necessary

export default function CustomizeCall({ onCustomize, onBack, callerInfo, setCallDelay, currentDelay }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(require('../assets/sunset.jpg')); 
  const defaultImage = require('../assets/sunset.jpg');

  const updateCallerInfo = (updates) => {
    onCustomize({ ...callerInfo, ...updates });
  };

  const handleSaveDelay = (delayInSeconds) => {
    setCallDelay(delayInSeconds); // Update the delay state directly
  };
  
  // Use a useEffect to update the local state whenever callerInfo changes.
  React.useEffect(() => {
    setName(callerInfo.name || 'Unknown');
    setPhoneNumber(callerInfo.phoneNumber || '');

    // Only set the image URI if callerInfo.image is defined and has a uri property
    if (callerInfo.image && callerInfo.image.uri) {
      setImage(callerInfo.image.uri);
    } else {
      // Fallback to the default image
      setImage(defaultImage);
    }
  }, [callerInfo, currentDelay]);

  const revertToDefault = () => {
    const defaultName = 'Unknown';
    const defaultPhoneNumber = '(469) 735-1438';
    
    // Update the state variables
    setName(defaultName);
    setPhoneNumber(defaultPhoneNumber);
    setImage(defaultImage); // Pass the result of require directly
    
    // Update the callerInfo object that is being passed down as props
    updateCallerInfo({
      name: defaultName,
      phoneNumber: defaultPhoneNumber,
      image: defaultImage, // Pass the result of require directly
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
    if (typeof newImageUri === 'string') {
      updateCallerInfo({ image: { uri: newImageUri } });
    }
  };
  
return (
    <View style={commonStyles.container}>
      <Header />

      <ScrollView style={commonStyles.scrollContainer}>
        {/* All your existing inputs and buttons go here */}

        {/* Editable Image */}
        <EditableImage
          imageUri={image}
          onImageSelected={handleImageSelected}
          style={commonStyles.image}
        />

        {/* Editable Text Inputs */}
        <EditableTextInput
          value={callerInfo.name}
          onSave={handleSaveName}
          placeholder="Enter Caller's Name"
          style={commonStyles.input}
        />
        <EditNumberInput
          value={callerInfo.phoneNumber}
          onSave={handleSavePhoneNumber}
          placeholder="Enter Caller's Number"
          keyboardType="phone-pad"
          style={commonStyles.input}
          isPhoneNumber={true}
        />

        {/* Set Counter */}
        <SetCounter onSaveDelay={handleSaveDelay} currentDelay={currentDelay} />

        {/* Revert to Default Button */}
        <TouchableOpacity style={commonStyles.button} onPress={revertToDefault}>
          <Text style={commonStyles.buttonText}>Revert to Default</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={commonStyles.footer}>
        <BackButton onPress={onBack} />
      </View>
    </View>
  );
}

