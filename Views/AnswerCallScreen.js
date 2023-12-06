import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import RotatedHangUpIcon from '../components/RotatedHangupIcon';

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
    <ImageBackground 
      source={require('../assets/acceptCallBackground.jpg')} // Replace with the correct path to your image
      style={styles.fullScreen}
    >
      <View style={styles.fullScreen}>
        <View style={styles.topContainer}>
          <Text style={styles.callerName}>{callerName}</Text>
          <Text style={styles.time}>{formatTime(callTime)}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsCenterContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="mic-off" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="keypad" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="volume-high" size={40} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
             <Ionicons name="add-outline" size={45} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="videocam" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
             <Ionicons name="person-circle-outline" size={40} color="white" /> 
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={onHangUp} style={styles.hangUpButton}>
          <RotatedHangUpIcon /> 
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 100,
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
  buttonsCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 250,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 70,
    height: 70,
    backgroundColor: '#44424c', // Adjust button background color
    borderRadius: 35, // Half the width/height to make it round
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnswerCallScreen;
