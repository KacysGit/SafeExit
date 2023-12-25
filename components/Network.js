import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import BackButton from './backButton';
import { commonStyles } from './styles';
import Header from './header';

const Network = ({ onUpdateContacts, onCustomMessageChange, onBack }) => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', number: '' });
    const [customMessage, setCustomMessage] = useState('');

    const handleCustomMessageChange = (text) => {
        setCustomMessage(text); // Local state update
        onCustomMessageChange(text); // Propagate to parent component
    };

    
    const handleTextChange = (name, value) => {
        setNewContact({ ...newContact, [name]: value });
    };
  
  
    const addContact = () => {
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      onUpdateContacts(updatedContacts); // Update contacts in the parent component
      setNewContact({ name: '', number: '' }); // Reset after adding
    };
    

  // Render UI for adding contacts and listing them
  return (
    <View style={styles.container}>
        <Header />
      <TextInput
        placeholder="Name"
        value={newContact.name}
        onChangeText={(text) => handleTextChange('name', text)}
      />
      <TextInput
        placeholder="Phone Number"
        value={newContact.number}
        onChangeText={(text) => handleTextChange('number', text)}
      />
      <TextInput
        placeholder="Custom Message"
        value={customMessage}
        onChangeText={handleCustomMessageChange}
      />
      <Button title="Add Contact" onPress={addContact} />
      {contacts.map((contact, index) => (
        <Text key={index}>{contact.name} - {contact.number}</Text>
      ))}
      <View style={commonStyles.footer}>
        <BackButton onPress={onBack} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        display: "flex",
      },
      buttonContainer: {
        alignItems: 'center', // This will horizontally center your buttons within this container
        marginTop: 20
      },
      button: {
        marginVertical: 10, // Vertical margin for spacing between buttons
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "red",
        width: '80%', // Set a specific width for the buttons
      },
      buttonText: {
        fontSize: 30,
        textAlign: "center",
        color: "white",
      },
});

export default Network;
