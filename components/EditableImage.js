// EditableImage.js
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { pickImage } from '../components/imageUpload'; // Assuming this is your image picking function

const EditableImage = ({ imageUri, onImageSelected, style }) => {
  const defaultImage = require('../assets/sunset.jpg'); // Path to your default image

  const handleImagePick = async () => {
    try {
      await pickImage(onImageSelected); // Re-use your existing image picking logic
    } catch (error) {
      console.error("ImagePicker Error: ", error);
      alert("An error occurred while picking the image.");
    }
  };

  // Use default image if imageUri is not set
  const imageSource = typeof imageUri === 'string' ? { uri: imageUri } : defaultImage;

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handleImagePick}>
      <Image source={imageSource} style={styles.image} />
      <Ionicons name="pencil" size={30} color="black" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    borderRadius: 20,
  },
});

export default EditableImage;
