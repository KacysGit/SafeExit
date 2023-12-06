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
            <ButtonWithLabel iconName="mic-off" label="mute" />
            <ButtonWithLabel iconName="keypad" label="keypad" />
            <ButtonWithLabel iconName="volume-high" label="audio" />
          </View>
          <View style={[styles.buttonsContainer, styles.secondButtonsContainer]}>
            <ButtonWithLabel iconName="add-outline" label="add call" />
            <ButtonWithLabel iconName="videocam" label="FaceTime" />
            <ButtonWithLabel iconName="person-circle-outline" label="contacts" />
          </View>
        </View>

        <TouchableOpacity onPress={onHangUp} style={styles.hangUpButton}>
          <RotatedHangUpIcon /> 
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Define a separate component for buttons with labels
const ButtonWithLabel = ({ iconName, label }) => (
  <TouchableOpacity style={styles.button}>
    <Ionicons name={iconName} size={40} color="white" />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

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
    flex: 1.5, // Adjust this to allow for more space for the buttons
    justifyContent: 'center', // This centers the buttons vertically
    alignItems: 'center',
    paddingHorizontal: 20, // Add padding to maintain spacing from screen edges
    marginBottom: 160
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%', // Take the full width of the container to space out the buttons
  },
  button: {
    marginHorizontal: 10, // Keep the buttons spaced out horizontally
    marginBottom: 20, // Add some space below the first row of buttons
    width: 70,
    height: 70,
    backgroundColor: '#44424c',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondButtonsContainer: {
    marginTop: 30, // Add space above the second row of buttons to push it down from the first row
  },
  label: {
    color: 'white',
    fontSize: 12, // Adjust the size as needed
    marginTop: 4, // Space between icon and label
    textAlign: 'center',
  },
});

export default AnswerCallScreen;
