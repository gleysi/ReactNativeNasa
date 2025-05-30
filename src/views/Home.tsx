import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import TodaysImage from '../components/TodaysImage';
import fecthApi from '../utils/fetch';
import { PostImage } from '../types';
import { format, sub } from 'date-fns';
import LastFiveDaysImages from '../components/LastFiveDaysImages';

const Home = () => {
  // local state constant
  const [todaysImage, setTodaysImage] = useState<PostImage>();
  const [last5DaysImages, setLast5DaysImages] = useState<PostImage[]>([]);
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

    const loadLast5DaysImages = async () => {
      try {
        const date = new Date();
        const todaysDate = format(date, 'yyyy-MM-dd');
        const fiveDaysAgoDate = format(sub(date, {days:5}) , 'yyyy-MM-dd');
        const lastFaveDaysResponse = await fecthApi(`&start_date=${fiveDaysAgoDate}&end_date=${todaysDate}`);
        setLast5DaysImages(lastFaveDaysResponse);
      } catch (error) {
        console.error('Error loading last 5 days images:', error);
      }
    };

    loadTodaysImage().catch(null);
    loadLast5DaysImages().catch(null);
  }, []); // Second argument is an empty array of dependencies, meaning this effect runs only once when the component mounts.

  return (
    <View style={styles.container}>
      <Header />
      <TodaysImage {...todaysImage}/>
      <LastFiveDaysImages postImages={last5DaysImages} />
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
