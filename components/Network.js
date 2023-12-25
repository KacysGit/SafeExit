import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
            style={styles.input} // Apply styles for TextInput
        />
        <TextInput
            placeholder="Phone Number"
            value={newContact.number}
            onChangeText={(text) => handleTextChange('number', text)}
            style={styles.input} // Apply styles for TextInput
        />
        <TextInput
            placeholder="Custom Message"
            value={customMessage}
            onChangeText={handleCustomMessageChange}
            style={styles.input} // Apply styles for TextInput
        />
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
            <Text style={styles.buttonText}>Add Contact</Text>
        </TouchableOpacity>
        {contacts.map((contact, index) => (
            <Text key={index} style={styles.contactText}>{contact.name} - {contact.number}</Text>
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
        padding: 10, // Add padding for the overall container
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        height: 40,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: 'blue', // Choose your color
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    contactText: {
        color: 'white', // Or any other color
        fontSize: 16,
        marginVertical: 5,
    },
});

export default Network;
