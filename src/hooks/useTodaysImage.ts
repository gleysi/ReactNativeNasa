import { useEffect, useState } from 'react';
import fetchApi from '../utils/fetch';
import { PostImage } from '../types';

const useTodaysImage = () => {
  // local state constant
  const [todaysImage, setTodaysImage] = useState<PostImage | undefined>(undefined);
  // useEffect lets you run side effects in function components, such as data fetching, subscriptions, or manually changing the DOM.
  useEffect(() => {
    const fetchTodaysImage = async () => {
      try {
        const response = await fetchApi();
        setTodaysImage(response);
      } catch (error) {
        console.error('Error fetching today’s image:', error);
        setTodaysImage(undefined);
      }
    };

    fetchTodaysImage();
  }, []);// Second argument is an empty array of dependencies, meaning this effect runs only once when the component mounts.

  return todaysImage;
};

export default useTodaysImage;
