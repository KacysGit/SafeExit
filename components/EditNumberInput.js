import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditNumberInput = ({ value, onSave, placeholder, keyboardType = 'default', style, formatPattern, isPhoneNumber }) => {
  const [editable, setEditable] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    // Update localValue whenever the value prop changes
    setLocalValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(localValue);
    setEditable(false);
  };

  const handleTextChange = (text) => {
    let formattedText = text;
    if (isPhoneNumber) {
      // Strip all non-numeric characters
      formattedText = text.replace(/[^\d]/g, '');

      // Apply the pattern # (###) ###-####
      if (formattedText.length > 0) {
        formattedText = formattedText.substring(0, 10); // enforce max length
        formattedText = formattedText.replace(/^(\d{1,3})(\d{1,3})?(\d{1,4})?/, function(match, g1, g2, g3) {
          if (g3) {
            return `(${g1}) ${g2}-${g3}`;
          } else if (g2) {
            return `(${g1}) ${g2}`;
          } else if (g1) {
            return `(${g1}`;
          }
        });
      }
    }
    setLocalValue(formattedText);
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.textInput}
        onChangeText={handleTextChange}
        value={localValue}
        editable={editable}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
      {editable ? (
        <TouchableOpacity onPress={handleSave}>
          <Ionicons name="checkmark" size={24} color="green" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setEditable(true)}>
          <Ionicons name="pencil" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'grey',
      padding: 10,
      marginRight: 10,
    },
  });


export default EditNumberInput;

