import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

  // components/CancelButton.js
  const CancelButton = ({ setShowFakeCall, setStartCountdown, setInitialDelay, initialDelay }) => {
    const handleCancelCall = () => {
      setShowFakeCall(false);
      setStartCountdown(false);
      setInitialDelay(initialDelay); // Reset the countdown to the initial delay
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