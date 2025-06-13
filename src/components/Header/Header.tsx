import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>Explore</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image  source={require('../../assets/nasa-logo.png')} style={styles.image}/>
      </View>
    </View>
  );
};

export default Header;
