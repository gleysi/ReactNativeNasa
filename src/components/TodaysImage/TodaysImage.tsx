import React, { FC, useEffect, useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { PostImage } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../types';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

// Type for navigation prop
type NavigationProp = NativeStackNavigationProp<RootStackParams, 'Home'>;

const TodaysImage: FC<PostImage> = ({ title, url, date, explanation }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleViewPress = () => {
    if (title && date && url && explanation) {
      navigation.navigate('Detail', { title, date, url, explanation });
    }
  };

  const [message, setMessage] = useState('');

  // NestJs API call to fetch welcome message
  useEffect(() => {
    fetch('http://192.168.4.84:3000/welcome')
      .then(res => res.text())
      .then(setMessage)
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: url ?? '' }} style={styles.image} />
      <Text style={styles.title}>{title ?? 'No title'}</Text>
      <Text style={styles.date}>{date ?? 'No date'}</Text>
      <Text style={styles.nest}>{message}</Text>
      <View style={styles.buttonContainer}>
        <Button title="View" onPress={handleViewPress} />
      </View>
    </View>
  );
};

export default TodaysImage;
