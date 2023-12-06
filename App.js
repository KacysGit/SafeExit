import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import CustomizeCall from "./components/customizeCall";
import Header from "./components/header";
import FakeCallScreen from './Views/FakeCallScreen';
import AnswerCallScreen from './Views/AnswerCallScreen'; // Make sure this path is correct

export default function App() {
  const [showFakeCall, setShowFakeCall] = React.useState(false);
  const [showAnswerCall, setShowAnswerCall] = React.useState(false);

  // Define a function to handle the call accept action
  const handleAcceptCall = (caller) => {
    setShowFakeCall(false); // Hide the fake call screen
    setShowAnswerCall(true); // Show the answer call screen
    // You can pass the caller name to the AnswerCallScreen if needed
  };

  return (
    <View style={styles.container}>
      {showFakeCall ? (
        <FakeCallScreen
          onHangUp={() => setShowFakeCall(false)}
          onAccept={handleAcceptCall} // Pass the new function to handle accept
        />
      ) : showAnswerCall ? (
        <AnswerCallScreen
          callerName="Caller" // Pass the caller name
          onHangUp={() => setShowAnswerCall(false)} // Function to handle hang up from answer call screen
        />
      ) : (
        <>
          <Header />
          <CustomizeCall />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowFakeCall(true)}
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
