// This file adds the button titled "Customize Call"
// * Set trigger
// * Customize name
// * Customize number
// * Customize caller picture

import React, { useState, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity
} from "react-native";
import BackButton from "../components/backButton";
import Header from "../components/header";

export default function CustomizeCall({ onCustomize, onBack }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(require('../assets/sunset.jpg')); // Default image

  const handleCustomize = () => {
    // Assuming you want to keep the default image if not changed
    onCustomize({
      name: name || 'Unknown',
      phoneNumber: phoneNumber || '(469) 735-1438',
      image: image // Or a logic to check if image was changed
    });
  };   
  
    const handleImagePick = () => {
      // Implement the logic to pick an image and update the state
      // For now, we'll use the default image
      setImage(require('../assets/sunset.jpg')); // Replace with the actual image picking logic
    };
  
    return (
      <View>
        <Header />
        <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => {
            console.log('Name changed:', text); // Log the change
            setName(text);
        }}
        style={style.input}
        />
        <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => {
            console.log('Phone Number changed:', text); // Log the change
            setPhoneNumber(text);
        }}
        style={style.input}
        />

        <Button title="Pick an image" onPress={handleImagePick} />
        <TouchableOpacity style={style.button} onPress={handleCustomize}>
          <Text style={style.buttonText}>Customize Call</Text>
        </TouchableOpacity>
        <BackButton onPress={onBack} />
      </View>
    );
  }
  



const style = StyleSheet.create({
    button: {
        margin: 10,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: "stretch",
        backgroundColor: "red"
      },
      buttonText: {
        fontSize: 30,
        textAlign: "center",
        color: "white"
      },
})