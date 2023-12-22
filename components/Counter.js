// components/Counter.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Counter = ({ initialDelay, onCountdownComplete, startCountdown }) => {
    const [countdown, setCountdown] = useState(initialDelay);
  
    useEffect(() => {
      if (!startCountdown) return; // Only start countdown if `startCountdown` is true
  
      if (countdown === 0) {
        onCountdownComplete();
        return;
      }
  
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [countdown, onCountdownComplete, startCountdown]); // Add `startCountdown` to dependency array
  
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
    padding: 10,
  },
  text: {
    fontSize: 40,
    color: 'white',
  },
});

export default Counter;
