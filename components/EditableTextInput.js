// EditableTextInput.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditableTextInput = ({ value, onSave, placeholder, keyboardType = 'default', style }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue) => {
    setLocalValue(newValue);
    onSave(newValue); // Call the onSave function with the new value
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.textInput, { color: 'black' }]} 
        onChangeText={handleChange}
        value={localValue}
        editable={true}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
      <Ionicons name="pencil" size={24} color="grey" />
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
