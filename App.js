import React from "react"
import {Text, View, StyleSheet, Button, TouchableOpacity} from "react-native";
import CustomizeCall from "./components/customizeCall"
import Header from "./components/header"
import FakeCallScreen from './components/FakeCallScreen';

export default function App() {
  const [showFakeCall, setShowFakeCall] = React.useState(false);

  return (
    <View style={styles.container}>
      {showFakeCall ? (
        <FakeCallScreen onHangUp={() => setShowFakeCall(false)} />
      ) : (
        <>
          <Header />
          <CustomizeCall />
          <TouchableOpacity style={styles.button} onPress={() => setShowFakeCall(true)}>
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
    backgroundColor: "black", // Set your desired color here
    display: "flex"
  },
  button: {
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "stretch",
    backgroundColor: "red"
  },
  buttonText: {
    fontSize: 30,
    textAlign: "center",
    color: "white"
  },
});
