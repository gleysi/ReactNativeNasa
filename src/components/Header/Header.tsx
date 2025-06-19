import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../types';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParams, 'Home'>;

const Header = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleViewPress = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>Explore</Text>
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={handleViewPress}>
        <Text style={styles.searchButtonText}>Browse NASA Images</Text>
      </TouchableOpacity>
      <View style={styles.rightContainer}>
        <Image  source={require('../../assets/nasa-logo.png')} style={styles.image}/>
      </View>
    </View>
  );
};

export default Header;
