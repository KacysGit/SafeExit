import { useState, useEffect } from 'react';
import VolumeControl, { VolumeControlEvents } from 'react-native-volume-control';

const useVolumeControl = (triggerFunction) => {
  const [volumeSequence, setVolumeSequence] = useState('');
  let previousVolume = 0;

  useEffect(() => {
    const volumeListener = VolumeControlEvents.addListener(
      'VolumeChanged',
      handleVolumeChange
    );

    return () => {
      volumeListener.remove();
    };
  }, []);

  const handleVolumeChange = (event) => {
    let newSequence = volumeSequence;
    if (event.volume > previousVolume) {
      newSequence += 'I';
    } else if (event.volume < previousVolume) {
      newSequence += 'D';
    }

    if (newSequence.endsWith('IDI')) {
      triggerFunction();
      newSequence = '';
    }

    setVolumeSequence(newSequence);
    previousVolume = event.volume;
  };
};

export default useVolumeControl;
