import { useState } from 'react';

const useAppState = () => {
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [showAnswerCall, setShowAnswerCall] = useState(false);
  const [showCustomizeCall, setShowCustomizeCall] = useState(false);
  const [callerInfo, setCallerInfo] = useState({
    name: 'Unknown',
    phoneNumber: '(469) 735-1438',
    image: require('../assets/sunset.jpg'), // Replace with your default image path
  });

  const toggleFakeCall = (value) => setShowFakeCall(value);
  const toggleAnswerCall = (value) => setShowAnswerCall(value);
  const toggleCustomizeCall = (value) => setShowCustomizeCall(value);

  // Add the following setters to the return statement if not already added
  return {
    showFakeCall,
    setShowFakeCall, // Ensure this setter is returned
    showAnswerCall,
    setShowAnswerCall, // Ensure this setter is returned
    showCustomizeCall,
    setShowCustomizeCall, // Ensure this setter is returned
    callerInfo,
    setCallerInfo,
    toggleFakeCall,
    toggleAnswerCall,
    toggleCustomizeCall,
  };
};

export default useAppState;
