// This file adds the button titled "Customize Call"
// * Set trigger
// * Customize name

import React, { useState, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity
} from "react-native";

export default function CustomizeCall() {
    return (
        <View>
            <TouchableOpacity 
                style={style.button}
                onPress={() => {
                    // Your onPress action
                }}>
                <Text style={style.buttonText}>Customize Call</Text>
            </TouchableOpacity>
        </View>
    );
}


const style = StyleSheet.create({
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
})