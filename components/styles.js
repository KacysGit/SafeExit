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
    display: "flex",
  },
  button: {
    margin: 10,
    alignContent: "center",
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "stretch",
    backgroundColor: "red",
    width: '80%'
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
});

// Add any other styles or theme-related exports here
