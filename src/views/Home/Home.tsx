import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Header from '../../components/Header';
import TodaysImage from '../../components/TodaysImage';
import LastFiveDaysImages from '../../components/LastFiveDaysImages';
import fetchApi from '../../utils/fetch';
import { PostImage } from '../../types';
import { format, sub } from 'date-fns';
import styles from './styles';

const Home = () => {
  // local state constant
  const [todaysImage, setTodaysImage] = useState<PostImage>();
  const [last5DaysImages, setLast5DaysImages] = useState<PostImage[]>([]);
  // useEffect means that this function will run after the component mounts
  // useEffect lets you run side effects in function components, such as data fetching, subscriptions, or manually changing the DOM.
  useEffect(() => {
    const loadTodaysImage = async () => {
      try {
        const todaysImageResponse = await fetchApi();
        setTodaysImage(todaysImageResponse);
      } catch (error) {
        console.error('Error loading image:', error);
        setTodaysImage(undefined);
      }
    };

    const loadLast5DaysImages = async () => {
      try {
        const date = new Date();
        const todaysDate = format(date, 'yyyy-MM-dd');
        const fiveDaysAgoDate = format(sub(date, { days: 5 }), 'yyyy-MM-dd');
        const lastFiveDaysResponse = await fetchApi(`&start_date=${fiveDaysAgoDate}&end_date=${todaysDate}`);
        setLast5DaysImages(lastFiveDaysResponse);
      } catch (error) {
        console.error('Error loading last 5 days images:', error);
      }
    };

    loadTodaysImage().catch(() => { });
    loadLast5DaysImages().catch(() => { });
  }, []); // Second argument is an empty array of dependencies, meaning this effect runs only once when the component mounts.

  return (
    <View style={styles.container}>
      <Header />
      {todaysImage && (
        <TodaysImage
          date={todaysImage.date}
          title={todaysImage.title}
          url={todaysImage.url}
          explanation={todaysImage.explanation}
        />
      )}
      <LastFiveDaysImages postImages={last5DaysImages} />
    </View>
  );
};

export default Home;
