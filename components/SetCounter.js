// components/SetCounter.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SetCounter = ({ onSaveDelay, currentDelay }) => {
  const [delay, setDelay] = useState(currentDelay.toString());

  useEffect(() => {
    setDelay(currentDelay.toString());
  }, [currentDelay]);

  const handleTextChange = (text) => {
    setDelay(text);
    const delayInSeconds = parseInt(text, 10) || 0;
    onSaveDelay(delayInSeconds);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Set Delay (in seconds):</Text>
      <TextInput
        style={[styles.input, { color: delay ? 'black' : 'grey' }]}
        keyboardType='numeric'
        value={delay}
        onChangeText={handleTextChange}
        placeholder="Enter delay in seconds"
        maxLength={5} // Assuming you won't need delays longer than 99999 seconds
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 15,
  },
  label: {
    fontSize: 19,
    marginBottom: 10,
    color: 'white'
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 10,
    backgroundColor: 'white'
  },
});

export default SetCounter;
