// This file adds the banner at the top of the screen
// * App name
// * settings icon

import React, { useState, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity
} from "react-native";

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>SafelyExit</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    header: {
      backgroundColor: "grey", // Background color of the header
      padding: 20, // Adjust padding as needed
      alignItems: "left", // Center align the text
      flexDirection: "row"
    },
    headerText: {
      color: "white", // Color of the header text
      fontSize: 24, // Font size of the header text
      fontWeight: "bold", // Bold font weight for header text
      margin: 10
    },
})