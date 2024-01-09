import { useState } from 'react';

const useAppState = () => {
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [showAnswerCall, setShowAnswerCall] = useState(false);
  const [showCustomizeCall, setShowCustomizeCall] = useState(false);
  const toggleFakeCall = (value) => setShowFakeCall(value);
  const toggleAnswerCall = (value) => setShowAnswerCall(value);
  const toggleCustomizeCall = (value) => setShowCustomizeCall(value);
  const [startCountdown, setStartCountdown] = useState(false);
  const [delay, setDelay] = useState(0);
  const [initialDelay, setInitialDelay] = useState(0);
  const [customMessage, setCustomMessage] = useState('');

  // Update setCallDelay to also update initialDelay
  const setCallDelay = (value) => {
    setDelay(value);
    setInitialDelay(value);
  };
  const [callerInfo, setCallerInfo] = useState({
    name: 'Unknown',
    phoneNumber: '(469) 735-1438',
    image: require('../assets/sunset.jpg'), // Replace with your default image path
  });
  
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
    startCountdown,
    setStartCountdown,
    initialDelay,
    setInitialDelay,
    customMessage,
    setCustomMessage,
  };
};

export default useAppState;
