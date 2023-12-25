import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
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

    const isValidPhoneNumber = (number) => {
        const phoneNumberPattern = /^\d{10}$/; // Adjust the regex according to the format you need
        return phoneNumberPattern.test(number);
      };
    
      const isMessageValid = (message) => {
        return message.length >= 10; // Check for minimum length
      };
    
      const addOrUpdateContact = () => {
        // Check for valid phone number
        if (!isValidPhoneNumber(newContact.number)) {
          Alert.alert("Invalid Phone Number", "Please enter a valid 10-digit phone number.");
          return;
        }
      
        // Check for valid custom message length
        if (!isMessageValid(customMessage)) {
          Alert.alert("Invalid Message", "The custom message must be at least 10 characters long.");
          return;
        }
      
        let updatedContacts;
        if (editingIndex >= 0) {
          // Update contact
          updatedContacts = [...contacts];
          updatedContacts[editingIndex] = newContact;
        } else {
          // Add new contact
          updatedContacts = [...contacts, newContact];
        }
        setContacts(updatedContacts);
        onUpdateContacts(updatedContacts); // Notify parent component of update
        setNewContact({ name: '', number: '' }); // Reset input fields
        setEditingIndex(-1); // Reset editing index
      };
      

    
    const handleTextChange = (name, value) => {
        setNewContact({ ...newContact, [name]: value });
    };

    const [editingIndex, setEditingIndex] = useState(-1); // -1 when not editing

    const startEditing = (index) => {
        setNewContact(contacts[index]);
        setEditingIndex(index);
    };

    const deleteContact = (index) => {
        Alert.alert(
            "Delete Contact",
            "Are you sure you want to delete this contact?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => {
                    const updatedContacts = contacts.filter((_, i) => i !== index);
                    setContacts(updatedContacts);
                    onUpdateContacts(updatedContacts);
                }, style: 'destructive' }
            ]
        );
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
        <TouchableOpacity style={styles.addButton} onPress={addOrUpdateContact}>
                <Text style={styles.buttonText}>{editingIndex >= 0 ? 'Save Changes' : 'Add Contact'}</Text>
            </TouchableOpacity>
            {/* List of contacts with edit and delete options */}
            {contacts.map((contact, index) => (
                <View key={index} style={styles.contactContainer}>
                    <Text style={styles.contactText}>{contact.name} - {contact.number}</Text>
                    <TouchableOpacity onPress={() => startEditing(index)} style={styles.editButton}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteContact(index)} style={styles.deleteButton}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: 'red', // Choose your color
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
