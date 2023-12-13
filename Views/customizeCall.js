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

      <TouchableOpacity style={commonStyles.button} onPress={handleCustomize}>
        <Text style={commonStyles.buttonText}>Customize Call</Text>
      </TouchableOpacity>

      <View style={commonStyles.footer}>
        <BackButton onPress={onBack} />
      </View>
    </View>
  );
}
