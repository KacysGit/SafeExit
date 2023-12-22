// components/SetCounter.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


const SetCounter = ({ onSaveDelay, currentDelay }) => {
    const [delay, setDelay] = useState('');
  
    useEffect(() => {
      setDelay(currentDelay.toString());
    }, [currentDelay]);
  
    const handleSave = () => {
      const delayInSeconds = parseInt(delay, 10) || 0;
      onSaveDelay(delayInSeconds);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Set Delay (in seconds):</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={delay}
          onChangeText={setDelay}
          placeholder={`Current delay: ${currentDelay} seconds`}
        />
        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Set Delay</Text>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
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
    color: 'black',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default SetCounter;
