import React from 'react';
import {Image, StyleSheet} from 'react-native';

const MicIcon: React.FC = () => {
  return <Image style={styles.image} source={require('../images/mic.png')} />;
};

const styles = StyleSheet.create({
  image: {
    width: 59,
    height: 59,
    marginTop: 10,
  },
});

export default MicIcon;
