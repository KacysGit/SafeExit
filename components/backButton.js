import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have the expo vector icons installed

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, // Set a specific size for the button
    height: 50, // Set a specific size for the button
    marginLeft: 10, // Keep some space from the left edge
    marginTop: 10, // Keep some space from the top of the content area
  },
});

export default BackButton;
