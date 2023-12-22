import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// This function is exported for use in other components
export const pickImage = async (onImagePicked) => {
  try {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    // Note the changes here from 'cancelled' to 'canceled' and the use of 'assets'
    if (pickerResult.canceled) {
      return;
    }

    // Access the uri from the first item in the assets array
    const uri = pickerResult.assets[0].uri;
    onImagePicked(uri); // Call the onImagePicked function with the selected image URI
  } catch (error) {
    console.error("ImagePicker Error: ", error);
    alert("An error occurred while picking the image.");
  }
};



const ImageUpload = ({ onImagePicked }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Call the pickImage function and pass setSelectedImage to update the state
  const handlePickImage = async () => {
    await pickImage(setSelectedImage);
  };

  const confirmImageSelection = () => {
    if (selectedImage) {
      onImagePicked(selectedImage.localUri); // Call the prop function with the selected image URI
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={handlePickImage} />
      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage.localUri }} style={styles.image} />
          <Button title="Confirm Selection" onPress={confirmImageSelection} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
  },
});

export default ImageUpload;
