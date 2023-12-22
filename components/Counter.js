// components/Counter.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Counter = ({ initialDelay, onCountdownComplete, startCountdown }) => {
    const [countdown, setCountdown] = useState(initialDelay);
  
    useEffect(() => {
        if (!startCountdown || countdown <= 0) return; // Exit if countdown shouldn't start or is already completed
      
        const timer = setTimeout(() => {
          if (countdown === 1) {
            onCountdownComplete();
          }
          setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);
      
        return () => clearTimeout(timer);
      }, [countdown, startCountdown, onCountdownComplete]);
      
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{countdown}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 150,
  },
  text: {
    fontSize: 70,
    color: 'white',
  },
});

export default Counter;
