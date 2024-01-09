import React, { useState } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import BackButton from './backButton';
import { commonStyles } from './styles';
import Header from './header';
import Icon from 'react-native-vector-icons/FontAwesome'; // or any other icon set

const Network = ({ onUpdateContacts, onCustomMessageChange, onBack }) => {
    const [customMessage, setCustomMessage] = useState('');
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', number: '', customMessage: '' });

    const handleCustomMessageChange = (text) => {
        setCustomMessage(text); // Local state update
        onCustomMessageChange(text); // Propagate to parent component
    };

    const isValidPhoneNumber = (number) => {
        // Strip out non-digits
        const digits = number.replace(/\D/g, '');
        // Check if the number has 10 digits
        return /^\d{10}$/.test(digits);
    };
    
    
      const isMessageValid = (message) => {
        return message.length >= 10; // Check for minimum length
      };
    
      const addOrUpdateContact = () => {
        // Extract just the digits from the phone number for validation and storage
        const plainNumber = newContact.number.replace(/\D/g, '');

        if (contacts.length >= 3 && editingIndex === -1) {
            Alert.alert("Limit Reached", "You can only add up to 3 people in your network.");
            return;
        }
    
        // Check for valid phone number
        if (!isValidPhoneNumber(plainNumber)) {
            Alert.alert("Invalid Phone Number", "Please enter a valid 10-digit phone number.");
            return;
        }
      
        // Check for valid custom message length for the new contact
        if (!isMessageValid(newContact.customMessage)) {
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
        onUpdateContacts(updatedContacts); 
        setNewContact({ name: '', number: '', customMessage: '' }); // Reset input fields
        setEditingIndex(-1);
    };
    

      const handleTextChange = (name, value) => {
        // Update the newContact state based on the input name
        setNewContact({ ...newContact, [name]: value });
        if (name === 'number') {
          // Remove all non-digits and limit the input to 10 digits
          let cleaned = value.replace(/\D/g, '').substring(0, 10);
          
          // Apply the formatting (###) ###-####
          let formatted = cleaned;
          if (cleaned.length > 6) {
            formatted = `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
          } else if (cleaned.length > 3) {
            formatted = `(${cleaned.substring(0, 3)}) ${cleaned.substring(3)}`;
          } else if (cleaned.length > 0) {
            formatted = `(${cleaned}`;
          }
          
          // Update the state with the formatted number
          setNewContact({ ...newContact, number: formatted });
        } else {
          // For other fields, no special formatting is required
          setNewContact({ ...newContact, [name]: value });
        }
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
    

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <TextInput
                    placeholder="Name"
                    value={newContact.name}
                    onChangeText={(text) => handleTextChange('name', text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Phone Number"
                    value={newContact.number}
                    onChangeText={(text) => handleTextChange('number', text)}
                    keyboardType="numeric"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Custom Message"
                    value={newContact.customMessage}
                    onChangeText={(text) => handleTextChange('customMessage', text)}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.addButton} onPress={addOrUpdateContact}>
                    <Text style={styles.buttonText}>{editingIndex >= 0 ? 'Save Changes' : 'Add Contact'}</Text>
                </TouchableOpacity>
                {/* List of contacts with edit and delete options */}
                {contacts.map((contact, index) => (
                    <View key={index} style={styles.contactContainer}>
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactText}>{contact.name} - {contact.number}</Text>
                            <Text style={styles.customMessage}>{contact.customMessage}</Text>
                        </View>
                        <View style={styles.contactActions}>
                        <TouchableOpacity onPress={() => startEditing(index)} style={styles.editButton}>
                            <Icon name="pencil" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteContact(index)} style={styles.editButton}>
                            <Icon name="trash" size={30} color="white" />
                        </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
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
        padding: 10,
    },
    scrollView: {
        flex: 1,
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
    editButton: {
        padding: 10,
        borderRadius: 5,
        marginLeft: 5, // Space between edit and delete buttons
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
    customMessage: {
        color: 'white', // Or any other color you prefer
        fontSize: 14,
    },
    contactActions: {
        flexDirection: 'row',
        // ... any additional styles
    },
    
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 5,
        marginTop: 30
    },
    contactInfo: {
        flex: 1,
        marginRight: 10, // Add some space between text and buttons
    },
});

export default Network;
