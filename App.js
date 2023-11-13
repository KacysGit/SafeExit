import React from "react"
import {Text, View, StyleSheet} from "react-native";

export default function App(){
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}> Hello World </Text>
      <Text style={styles.textStyle}> Lets Stop Sexual Harassment </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Set your desired color here
  },
  textStyle: {
    color: "white", // Change this to your desired text color
    fontSize: 20,
  },
});
