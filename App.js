import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import CustomizeCall from "./Views/customizeCall";
import Header from "./components/header";
import FakeCallScreen from './Views/FakeCallScreen';
import AnswerCallScreen from './Views/AnswerCallScreen'; // Make sure this path is correct

export default function App() {
  const [showFakeCall, setShowFakeCall] = React.useState(false);
  const [showAnswerCall, setShowAnswerCall] = React.useState(false);
  const [callerInfo, setCallerInfo] = React.useState({
    name: 'Unknown',
    phoneNumber: '+1 214-519-7328',
    image: require('./assets/sunset.jpg'), 
  });
  

  // Define a function to handle the call accept action
  const handleAcceptCall = (caller) => {
    setShowFakeCall(false); // Hide the fake call screen
    setShowAnswerCall(true); // Show the answer call screen
    // You can pass the caller name to the AnswerCallScreen if needed
  };

  // Function to initiate a fake call
  const initiateFakeCall = () => {
    setShowFakeCall(true);
  };

  return (
    <View style={styles.container}>
      {showFakeCall ? (
        <FakeCallScreen
          onHangUp={() => setShowFakeCall(false)}
          onAccept={handleAcceptCall}
          callerName={callerInfo.name || 'Unknown'} // Fallback to 'Unknown' if name is empty
          callerNumber={callerInfo.phoneNumber || '+1 214-519-7328'} // Fallback to default number if phoneNumber is empty
          callerImage={callerInfo.image}
        />
      
      ) : showAnswerCall ? (
        <AnswerCallScreen
          callerName={callerInfo.name}
          onHangUp={() => setShowAnswerCall(false)}
        />
      ) : (
        <>
          <Header />
          <CustomizeCall onCustomize={(info) => setCallerInfo(info)} />

          <TouchableOpacity
            style={styles.button}
            onPress={initiateFakeCall} // Updated to use initiateFakeCall function
          >
            <Text style={styles.buttonText}>Call Me</Text>
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
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "stretch",
    backgroundColor: "red",
  },
  buttonText: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
});
