import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have the icons in your project

const AnswerCallScreen = ({ callerName, onHangUp }) => {
  const [callTime, setCallTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Converts total seconds into a time string format MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.topContainer}>
        <Text style={styles.callerName}>{callerName}</Text>
        <Text style={styles.time}>{formatTime(callTime)}</Text>
      </View>
      <TouchableOpacity onPress={onHangUp} style={styles.hangUpButton}>
        <Ionicons name="md-call" size={50} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  topContainer: {
    alignItems: 'center',
  },
  callerName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  time: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  hangUpButton: {
    position: 'absolute',
    bottom: 50, // Adjust based on your layout
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35, // Half the width/height to make it round
    backgroundColor: 'red', // Color for the hang-up button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  // ... rest of your styles
});

export default AnswerCallScreen;
