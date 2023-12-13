import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import BackButton from "../components/backButton";
import Header from "../components/header";
import { pickImage } from '../components/imageUpload';
import { commonStyles } from '../components/styles'; // Make sure the path is correct

export default function CustomizeCall({ onCustomize, onBack, callerInfo }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(require('../assets/sunset.jpg')); // Default image

  const handleCustomize = (newImageUri) => {
    onCustomize({
      ...callerInfo, // Now callerInfo is coming from props
      image: newImageUri ? { uri: newImageUri } : callerInfo.image,
    });
  };
  
  // Function to handle reverting to default
  const revertToDefault = () => {
    setName('Unknown'); // Replace with actual default name
    setPhoneNumber('1 (469) 739-1437'); // Replace with actual default number
    setImage(require('../assets/sunset.jpg')); // Replace with actual default image
    onCustomize({
      name: 'Unknown',
      phoneNumber: '1 (469) 739-1437',
      image: require('../assets/sunset.jpg'),
    });
  };

    
  const handleImagePick = async () => {
    await pickImage(handleImagePicked); // Use the handleImagePicked function here
  };

  
  const handleImagePicked = (uri) => {
    handleCustomize(uri); // Pass the new image URI to handleCustomize
  };
  

  return (
    <View style={commonStyles.container}>
      <Header />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={commonStyles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={commonStyles.input}
      />
      
      <TouchableOpacity style={commonStyles.button} onPress={handleImagePick}>
        <Text style={commonStyles.buttonText}>Upload Caller Image</Text>
      </TouchableOpacity>
      
      {/* This is where the picked image will be rendered */}
      {image.uri && (
        <Image source={{ uri: image.uri }} style={commonStyles.image} />
      )}

      <TouchableOpacity style={commonStyles.button} onPress={() => handleNameChange(name)}>
          <Text style={commonStyles.buttonText}>Edit Caller's Name</Text>
        </TouchableOpacity>

        <TouchableOpacity style={commonStyles.button} onPress={() => handlePhoneNumberChange(phoneNumber)}>
          <Text style={commonStyles.buttonText}>Edit Caller's Number</Text>
        </TouchableOpacity>

        <TouchableOpacity style={commonStyles.button} onPress={revertToDefault}>
          <Text style={commonStyles.buttonText}>Revert to Default</Text>
        </TouchableOpacity>

      <View style={commonStyles.footer}>
        <BackButton onPress={onBack} />
      </View>
    </View>
  );
}
