import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // If you're using Expo or ensure you have the equivalent in your project
import AnswerCallScreen from './AnswerCallScreen'

const FakeCallScreen = ({ onHangUp, onAccept }) => {

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.fullScreen}>
      <View style={styles.topContainer}>
        <Image
            source={require('.././assets/sunset.jpg')} // Replace with your caller image path
            style={styles.callerImage}
          />
        <Text style={styles.smollNotice}> Incoming call</Text>        
        <Text style={styles.callerName}>Unknown</Text>
        <Text style={styles.smollNotice}> Mobile +1 214-519-7328</Text>
      </View>
      <View style={styles.middleContainer}>        
        <Text style={styles.time}>{currentTime}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={onHangUp} style={[styles.button, styles.declineButton]}>
          <Ionicons name="md-close" size={50} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onAccept('Caller')} style={[styles.button, styles.acceptButton]}>
          <Ionicons name="md-call" size={50} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#283933', // Adjust the color to match your example
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'green', // This should match your example image's background color
  },
  topContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  time: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  callerName: {
    color: 'white',
    fontSize: 28,
    fontWeight: '400',
  },  
  callerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  smollNotice: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40, // Adjust padding as needed
    width: '100%',
  },
  middleContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40, // Adjust padding as needed
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 100, // This should be half the width/height to be perfectly round
    padding: 15,
  },
  declineButton: {
    backgroundColor: '#FF3B30', // Adjust the color to match your example
    alignItems: 'center'
  },
  acceptButton: {
    backgroundColor: '#30D158', // Adjust the color to match your example
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },

});

export default FakeCallScreen;
