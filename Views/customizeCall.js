import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import BackButton from "../components/backButton";
import Header from "../components/header";
import { pickImage } from '../components/imageUpload';
import { commonStyles } from '../components/styles'; // Make sure the path is correct
import EditableTextInput from "../components/EditableTextInput";
import EditNumberInput from "../components/EditNumberInput";
import EditableImage from "../components/EditableImage";

export default function CustomizeCall({ onCustomize, onBack, callerInfo }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(require('../assets/sunset.jpg')); 
  const defaultImage = require('../assets/sunset.jpg');

  const updateCallerInfo = (updates) => {
    onCustomize({ ...callerInfo, ...updates });
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
  }, [callerInfo]);

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

      <View style={commonStyles.contentContainer}>

      {image.uri && (
        <Image source={{ uri: image.uri }} style={commonStyles.image} />
      )}

      <EditableImage
        imageUri={image} // Pass the entire image object directly
        onImageSelected={handleImageSelected}
        style={commonStyles.image}
      />

      {/* Editable Text Input for Caller's Name */}
      <EditableTextInput
        value={callerInfo.name}
        onSave={handleSaveName}
        placeholder="Enter Caller's Name"
        style={commonStyles.input}
      />
      
      {/* Editable Text Input for Caller's Phone Number */}
      <EditNumberInput
        value={callerInfo.phoneNumber}
        onSave={handleSavePhoneNumber}
        placeholder="Enter Caller's Number"
        keyboardType="phone-pad"
        style={commonStyles.input}
        isPhoneNumber={true}
      />


      <TouchableOpacity style={commonStyles.button} onPress={revertToDefault}>
        <Text style={commonStyles.buttonText}>Revert to Default</Text>
      </TouchableOpacity>
    </View>

      <View style={commonStyles.footer}>
        <BackButton onPress={onBack} />
      </View>

      
    </View>
  );
}


