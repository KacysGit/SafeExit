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
  const [delay, setDelay] = useState(0);

  // Add a function to update the delay
  const setCallDelay = (value) => setDelay(value);
  
  return {
    showFakeCall,
    setShowFakeCall, 
    showAnswerCall,
    setShowAnswerCall,
    showCustomizeCall,
    setShowCustomizeCall, 
    callerInfo,
    setCallerInfo,
    toggleFakeCall,
    toggleAnswerCall,
    toggleCustomizeCall,
    delay,
    setCallDelay,
  };
};

export default useAppState;
