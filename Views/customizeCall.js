import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import BackButton from "../components/backButton";
import Header from "../components/header";
import { pickImage } from '../components/imageUpload';
import { commonStyles } from '../components/styles'; // Make sure the path is correct

export default function CustomizeCall({ onCustomize, onBack }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(require('../assets/sunset.jpg')); // Default image

  const handleCustomize = () => {
    onCustomize({
      name: name || 'Unknown',
      phoneNumber: phoneNumber || '(469) 735-1438',
      image: image.uri ? image : require('../assets/sunset.jpg')
    });
  };

    
  const handleImagePick = async () => {
    await pickImage(handleImagePicked); // Use the handleImagePicked function here
  };

  
  const handleImagePicked = (uri) => {
    // You don't need to call setImage here if you're immediately calling onCustomize
    // setImage({ uri }); // This line can be removed if you don't need to show the image in CustomizeCall component
  
    // Call onCustomize which is actually `updateCallerInfo` in `App`
    onCustomize({
      name, // keep the current name
      phoneNumber, // keep the current phone number
      image: { uri }, // update the image with the new URI
    });
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
