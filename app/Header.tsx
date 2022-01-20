import React from 'react';
import {View} from 'react-native';
import styles from './Header.styles';
import {Icon} from 'react-native-elements';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon
        name="close"
        size={25}
        color="black"
        tvParallaxProperties={undefined}
      />
      <View>
        <View style={styles.bar} />
        <View style={styles.progress} />
      </View>
      <Icon
        name={'dots-three-horizontal'}
        type={'entypo'}
        size={25}
        color="black"
        tvParallaxProperties={undefined}
      />
    </View>
  );
};

export default Header;
