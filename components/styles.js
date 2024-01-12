import { StyleSheet } from 'react-native';

export const colors = {
  black: 'black',
  red: 'red',
  white: 'white',
  blue: 'blue',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    // display: "flex"
  },
  contentContainer: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center', // This will align items horizontally in the center
    paddingHorizontal: 20, // Add some padding if needed
  },
  scrollContainer: {
    flex: 1,
    marginTop: 30,
    alignContent: 'center', // This will align items horizontally in the center
    paddingHorizontal: 20, // Add some padding if needed
  },
  button: {
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "red",
    width: '100%', // Make the button fill the width of its container
  },
  buttonText: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "red",
    position: 'absolute', // Position the button absolutely
    bottom: 10, // Place it at the bottom of the screen
    left: 10, // Align it to the left
    zIndex: 10, // Ensure it sits above other elements
  },
  backButtonText: {
    fontSize: 20,
    color: colors.white,
  },
  footer: {
    width: '100%',
    padding: 10,
    backgroundColor: "black", // Use any color you want for the footer
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align button to the left
    alignItems: 'center', // Center items vertically
  },
  input: {
    // ... other styles you might have
    borderWidth: 1,  // Add this line
    borderColor: 'black',  // And this line
    // You might also want to add some padding and margin for better aesthetics
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white', // Set the background color to white for the text input
  },
  definition: {
    color: "white",
    fontSize: 16, // Increased font size for better readability
    padding: 15, // Add padding for better spacing
    textAlign: 'center', // Center-align text
    fontWeight: 'bold', // Make the font bold
    marginBottom: 20, // Add some margin at the bottom
},

});

// Add any other styles or theme-related exports here
