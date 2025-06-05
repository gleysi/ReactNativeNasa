import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button} from 'react-native';
import { PostImage } from '../../types';

// Functional component type definition
const TodaysImage: FC<PostImage> = ({date, title, url}) => {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://192.168.4.84:3000/welcome')
      .then(res => res.text())
      .then(setMessage)
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: url }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.nest}>{message}</Text>
      <View style={styles.buttonContainer}><Button title="View" /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c449d',
    marginVertical: 16,
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 190,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 32,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginVertical: 12,
    fontWeight: 'bold',
  },
  date: {
    color: 'white',
    fontSize: 16,
  },
  nest: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
});
export default TodaysImage;
