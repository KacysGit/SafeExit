import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import useAppState from './hooks/useAppState'; // Custom hook for managing app state

import CustomizeCall from './Views/customizeCall';
import FakeCallScreen from './Views/FakeCallScreen';
import AnswerCallScreen from './Views/AnswerCallScreen';
import Header from './components/header';
import Counter from './components/Counter';
import CancelButton from './components/CancelButton'; // cancels the call after it's been triggered
import Network from './components/Network';

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
    delay,
    setCallDelay,
    startCountdown,
    setStartCountdown, // Use this from useAppState
    initialDelay,
    setInitialDelay,
  } = useAppState();

  const resetToHomeScreen = () => {
    setShowFakeCall(false);
    setShowAnswerCall(false);
    setShowCustomizeCall(false);
  };

  const handleCountdownComplete = () => {
    setShowFakeCall(true);
    setStartCountdown(false); // Ensure this is set to false when the countdown completes
  };
  
  // View Network Shtuff
  // New state for showing the Network component
  const [showNetwork, setShowNetwork] = useState(false);

  // Function to toggle Network visibility
  const toggleNetwork = () => {
    setShowNetwork(!showNetwork);
  };

  const [contactsList, setContactsList] = useState([]); // State to hold contacts

  // Function to handle updates to the contacts list
  const handleContactsUpdate = (updatedContacts) => {
    setContactsList(updatedContacts);
    // Additional logic to handle the updated contacts
  };

  const setCustomMessage = (contact, message) => {
    // Implement the logic to send the custom message to the contact
    // For example, an API call, or any other logic
  };

  const handleFakeCallTrigger = () => {
    if (delay === 0) {
      // If delay is zero, trigger the call immediately
      setShowFakeCall(true);
    } else {
      // Otherwise, start the countdown
      setStartCountdown(true);
    }
  };
  

  return (
    <View style={styles.container}>

      
      {showCustomizeCall ? (
        <CustomizeCall
        onCustomize={setCallerInfo}
        onBack={() => toggleCustomizeCall(false)}
        callerInfo={callerInfo}
        setCallDelay={setCallDelay}
        currentDelay={delay}
        resetCountdown={() => {
          setStartCountdown(false);
          setInitialDelay(0);
        }}
      />
      
      ) : showAnswerCall ? (
        <AnswerCallScreen callerInfo={callerInfo} onHangUp={resetToHomeScreen} />
      ) : showFakeCall ? (
        <FakeCallScreen callerInfo={callerInfo} onHangUp={() => toggleFakeCall(false)} onAccept={() => toggleAnswerCall(true)} />
      ) : showNetwork ? (
        <Network
          onUpdateContacts={handleContactsUpdate}
          onCustomMessageChange={setCustomMessage}
          onBack={() => {
            // Define what should happen when back is pressed. For example:
            setShowNetwork(false);
          }}
        /> 
      ) : (
        <>
          <Header />
          <Text style={styles.definition}>
            Use the Call button to trigger a fake phone call that you can use to safely excuse yourself from awkward or dangerous situations!
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => toggleCustomizeCall(true)}>
              <Text style={styles.buttonText}>Customize Call</Text>
            </TouchableOpacity>

            {/* View Network Button */}
            <TouchableOpacity style={styles.button} onPress={toggleNetwork}>
              <Text style={styles.buttonText}>View Network</Text>
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

      {/* Only show CancelButton on the main screen and when a call is being delayed */}
      {startCountdown && !showFakeCall && !showCustomizeCall && (
        <CancelButton
          setShowFakeCall={setShowFakeCall}
          setStartCountdown={setStartCountdown}
          setInitialDelay={setInitialDelay}
          initialDelay={initialDelay}
        />
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
  definition: {
    color: "white",
    fontSize: 16, // Increased font size for better readability
    padding: 15, // Add padding for better spacing
    textAlign: 'center', // Center-align text
    fontWeight: 'bold', // Make the font bold
    marginBottom: 20, // Add some margin at the bottom
},
});
