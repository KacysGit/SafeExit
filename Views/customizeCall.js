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

export default function CustomizeCall({ onCustomize }) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(require('../assets/sunset.jpg')); // Default image
  
    const handleCustomize = () => {
        console.log('Customize button clicked', { name, phoneNumber, image }); // Add this line to log the state values
        onCustomize({
          name,
          phoneNumber,
          image,
        });
      };
      
  
    const handleImagePick = () => {
      // Implement the logic to pick an image and update the state
      // For now, we'll use the default image
      setImage(require('../assets/sunset.jpg')); // Replace with the actual image picking logic
    };
  
    return (
      <View>
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