import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import useAppState from './hooks/useAppState'; // Custom hook for managing app state

import CustomizeCall from './Views/customizeCall';
import FakeCallScreen from './Views/FakeCallScreen';
import AnswerCallScreen from './Views/AnswerCallScreen';
import Header from './components/header';

export default function App() {
  const {
    showFakeCall,
    setShowFakeCall, // Destructure this setter
    showAnswerCall,
    setShowAnswerCall, // Destructure this setter
    showCustomizeCall,
    setShowCustomizeCall, // Destructure this setter
    callerInfo,
    setCallerInfo,
    toggleFakeCall,
    toggleAnswerCall,
    toggleCustomizeCall,
  } = useAppState();

  const resetToHomeScreen = () => {
    setShowFakeCall(false);
    setShowAnswerCall(false);
    setShowCustomizeCall(false);
  };

  const updateCallerInfo = (newInfo) => {
    setCallerInfo(prevInfo => ({
      ...prevInfo,
      ...newInfo, // This will update the callerInfo with newInfo
    }));
  };


  return (
    <View style={styles.container}>
      {showCustomizeCall ? (
        <CustomizeCall onCustomize={updateCallerInfo} onBack={() => toggleCustomizeCall(false)} />
      ) : showAnswerCall ? (
        <AnswerCallScreen callerInfo={callerInfo} onHangUp={resetToHomeScreen} />
      ) : showFakeCall ? (
        <FakeCallScreen callerInfo={callerInfo} onHangUp={() => toggleFakeCall(false)} onAccept={() => toggleAnswerCall(true)} />
      ) : (
        <>
          <Header />
          <TouchableOpacity style={styles.button} onPress={() => toggleCustomizeCall(true)}>
            <Text style={styles.buttonText}>Customize Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => toggleFakeCall(true)}>
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    display: "flex",
  },
  button: {
    margin: 10,
    alignContent: "center",
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "stretch",
    backgroundColor: "red",
    width: '80%'
  },
  buttonText: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
});
