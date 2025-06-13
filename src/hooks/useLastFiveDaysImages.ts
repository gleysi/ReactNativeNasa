import { PostImage } from '../types';
import { format, sub } from 'date-fns';
import useApi from './useApi';

const useLastFiveDaysImages = () => {
  const date = new Date();
  const today = format(date, 'yyyy-MM-dd');
  const fiveDaysAgo = format(sub(date, { days: 5 }), 'yyyy-MM-dd');
  const queryParams = `&start_date=${fiveDaysAgo}&end_date=${today}`;

  const { data, loading, error, refetch } = useApi<PostImage[]>(queryParams);
  return {
    images: data || [],
    loading,
    error,
    refetch,
  };

};

export default useLastFiveDaysImages;
