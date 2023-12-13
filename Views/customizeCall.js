import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import BackButton from "../components/backButton";
import Header from "../components/header";
import { commonStyles } from '../components/styles'; // Make sure the path is correct

export default function CustomizeCall({ onCustomize, onBack }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(require('../assets/sunset.jpg')); // Default image

  const handleCustomize = () => {
    onCustomize({
      name: name || 'Unknown',
      phoneNumber: phoneNumber || '(469) 735-1438',
      image: image
    });
  };
  
  const handleImagePick = () => {
    // Your image picking logic
    setImage(require('../assets/sunset.jpg'));
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
        <Text style={commonStyles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={commonStyles.button} onPress={handleCustomize}>
        <Text style={commonStyles.buttonText}>Edit Name</Text>
      </TouchableOpacity>
      <View style={commonStyles.footer}>
        <BackButton onPress={onBack} />
      </View>
    </View>
  );
}
