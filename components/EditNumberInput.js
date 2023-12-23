import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditNumberInput = ({ value, onSave, placeholder, keyboardType = 'default', style, isPhoneNumber }) => {
  const [editable, setEditable] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (!isFocused && isPhoneNumber && localValue.replace(/[^\d]/g, '').length < 10) {
      const completedNumber = completePhoneNumberIfNeeded(localValue);
      setLocalValue(completedNumber);
      onSave(completedNumber);
    }
  }, [isFocused]);

  const completePhoneNumberIfNeeded = (text) => {
    let digits = text.replace(/[^\d]/g, '');
    while (digits.length < 10) {
      digits += Math.floor(Math.random() * 10).toString();
    }
    return digits.replace(/^(\d{1,3})(\d{1,3})?(\d{1,4})?/, (match, g1, g2, g3) => {
      if (g3) {
        return `(${g1}) ${g2}-${g3}`;
      } else if (g2) {
        return `(${g1}) ${g2}`;
      } else {
        return `(${g1}`;
      }
    });
  };

  const handleTextChange = (text) => {
    let formattedText = text;
    if (isPhoneNumber) {
      formattedText = text.replace(/[^\d]/g, '');
      if (formattedText.length > 0) {
        formattedText = formattedText.substring(0, 10);
        formattedText = formattedText.replace(/^(\d{1,3})(\d{1,3})?(\d{1,4})?/, (match, g1, g2, g3) => {
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
    onSave(formattedText); // Save changes immediately
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        onChangeText={handleTextChange}
        value={localValue}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onBlur={() => setIsFocused(false)}
        onFocus={() => {
          setIsFocused(true);
          setEditable(true);
        }}
        style={[styles.textInput, { color: editable ? 'black' : 'grey' }]}
      />
      <Ionicons
        name="pencil"
        size={24}
        color={editable ? 'black' : 'grey'}
      />
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