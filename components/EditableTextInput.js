// EditableTextInput.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditableTextInput = ({ value, onSave, placeholder, keyboardType = 'default', style }) => {
  const [isEditable, setEditable] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(localValue);
    setEditable(false);
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.textInput, { color: isEditable ? 'black' : 'grey' }]} // Color changes based on edit mode
        onChangeText={setLocalValue}
        value={localValue}
        editable={true} // Make it editable by default
        placeholder={placeholder}
        keyboardType={keyboardType}
        onBlur={handleSave} // Save on losing focus
        onFocus={() => setEditable(true)} // Set edit mode when the text input is focused
      />
      <Ionicons name="pencil" size={24} color={isEditable ? 'black' : 'grey'} />
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

export default EditableTextInput;
