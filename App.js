import React from "react"
import {Text, View, StyleSheet} from "react-native";
import CustomizeCall from "./components/CustomizeCall"
import Header from "./components/header"

export default function App(){
  return (
    <View style={styles.container}>
      <Header />
      <CustomizeCall />
    </View>

    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Set your desired color here
    display: "flex"
  },
});
