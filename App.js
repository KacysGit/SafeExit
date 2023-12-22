import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import useAppState from './hooks/useAppState'; // Custom hook for managing app state

import CustomizeCall from './Views/customizeCall';
import FakeCallScreen from './Views/FakeCallScreen';
import AnswerCallScreen from './Views/AnswerCallScreen';
import Header from './components/header';
import Counter from './components/Counter';


export default function App() {
  const {
    showFakeCall,
    setShowFakeCall,
    showAnswerCall,
    setShowAnswerCall,
    showCustomizeCall,
    setShowCustomizeCall,
    callerInfo,
    setCallerInfo,
    toggleFakeCall,
    toggleAnswerCall,
    toggleCustomizeCall,
    delay, // Retrieve delay from useAppState
    setCallDelay, // Ensure this is correctly destructured from useAppState
  } = useAppState();

  const [startCountdown, setStartCountdown] = useState(false);

  const resetToHomeScreen = () => {
    setShowFakeCall(false);
    setShowAnswerCall(false);
    setShowCustomizeCall(false);
  };

  const handleCountdownComplete = () => {
    setShowFakeCall(true);
    setStartCountdown(false); // Resetting the countdown state
    //setCountdown(delay); // Resetting the countdown number if necessary
  };
  

  const updateCallerInfo = (newInfo) => {
    setCallerInfo(prevInfo => ({
      ...prevInfo,
      ...newInfo,
    }));
  };

  const handleFakeCallTrigger = () => {
    setStartCountdown(true);
  };

  return (
    <View style={styles.container}>
      {showCustomizeCall ? (
        <CustomizeCall
          onCustomize={setCallerInfo}
          onBack={() => toggleCustomizeCall(false)}
          callerInfo={callerInfo}
          setCallDelay={setCallDelay}
          currentDelay={delay} // Pass the current delay to CustomizeCall
        />
      
      ) : showAnswerCall ? (
        <AnswerCallScreen callerInfo={callerInfo} onHangUp={resetToHomeScreen} />
      ) : showFakeCall ? (
        <FakeCallScreen callerInfo={callerInfo} onHangUp={() => toggleFakeCall(false)} onAccept={() => toggleAnswerCall(true)} />
      ) : (
        <>
          <Header />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => toggleCustomizeCall(true)}>
              <Text style={styles.buttonText}>Customize Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleFakeCallTrigger}>
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
          </View>

          {delay > 0 && (
            <Counter
            initialDelay={delay}
            onCountdownComplete={handleCountdownComplete}
            startCountdown={startCountdown}
          />
          )}
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
  buttonContainer: {
    alignItems: 'center', // This will horizontally center your buttons within this container
    marginTop: 20
  },
  button: {
    marginVertical: 10, // Vertical margin for spacing between buttons
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "red",
    width: '80%', // Set a specific width for the buttons
  },
  buttonText: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
});
