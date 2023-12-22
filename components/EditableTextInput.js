// EditableTextInput.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditableTextInput = ({ value, onSave, placeholder, keyboardType = 'default', style }) => {
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

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.textInput}
        onChangeText={setLocalValue}
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

export default EditableTextInput;
