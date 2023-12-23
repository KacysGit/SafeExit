// components/Counter.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Counter = ({ onCountdownComplete, startCountdown, initialDelay }) => {
    const [countdown, setCountdown] = useState(initialDelay);
  
    useEffect(() => {
        // If countdown shouldn't start or is already completed, reset the countdown
        if (!startCountdown || countdown <= 0) {
            setCountdown(initialDelay);
            return;
        }
      
        const timer = setTimeout(() => {
            if (countdown === 1) {
                onCountdownComplete();
            } else {
                setCountdown(prevCountdown => prevCountdown - 1);
            }
        }, 1000);
      
        // Clear the timer when the component unmounts or the countdown changes
        return () => clearTimeout(timer);
    }, [countdown, startCountdown, onCountdownComplete, initialDelay]);
      
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
        marginTop: 150,
    },
    text: {
        fontSize: 70,
        color: 'white',
    },
});

export default Counter;
