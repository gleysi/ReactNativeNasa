import { useEffect, useState } from 'react';
import fetchApi from '../utils/fetch';
import { PostImage } from '../types';
import { format, sub } from 'date-fns';

const useLastFiveDaysImages = () => {
  // local state constant
  const [last5DaysImages, setLast5DaysImages] = useState<PostImage[]>([]);
  // useEffect lets you run side effects in function components, such as data fetching, subscriptions, or manually changing the DOM.
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const date = new Date();
        const today = format(date, 'yyyy-MM-dd');
        const fiveDaysAgo = format(sub(date, { days: 5 }), 'yyyy-MM-dd');
        const response = await fetchApi(`&start_date=${fiveDaysAgo}&end_date=${today}`);
        setLast5DaysImages(response);
      } catch (error) {
        console.error('Error fetching last 5 days images:', error);
      }
    };

    fetchImages();
  }, []);

  return last5DaysImages;
};

export default useLastFiveDaysImages;
