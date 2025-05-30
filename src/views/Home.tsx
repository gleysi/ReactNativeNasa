import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import TodaysImage from '../components/TodaysImage';
import fecthApi from '../utils/fetch';
import { PostImage } from '../types';

const Home = () => {
  // local state constant
  const [todaysImage, setTodaysImage] = useState<PostImage>();
  // useEffect means that this function will run after the component mounts
  useEffect(() => {
    const loadTodaysImage = async () => {
      try {
        const todasysImageResponse = await fecthApi();
        setTodaysImage(todasysImageResponse);
      } catch (error) {
        console.error('Error loading image:', error);
        setTodaysImage({});
      }
    };

    loadTodaysImage().catch(null);
  }, []); // Second argument is an empty array of dependencies, meaning this effect runs only once when the component mounts.

  return (
    <View style={styles.container}>
      <Header />
      <TodaysImage {...todaysImage}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
export default Home;
