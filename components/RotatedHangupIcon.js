import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RotatedHangUpIcon = () => {
  return (
    <View style={styles.rotateIcon}>
      <Ionicons name="md-call" size={50} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  rotateIcon: {
    transform: [{ rotate: '135deg' }],
  },
});

export default RotatedHangUpIcon;
