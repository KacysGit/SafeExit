import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CancelButton = ({ setShowFakeCall, setStartCountdown }) => {
  const handleCancelCall = () => {
    // Resetting relevant states to stop the call process
    setShowFakeCall(false);
    setStartCountdown(false);
    // Add any other state resets if needed
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCancelCall}>
      <Text style={styles.buttonText}>Cancel Call</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "red",
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});

export default CancelButton;