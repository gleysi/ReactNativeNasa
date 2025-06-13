import useApi from './useApi';
import { PostImage } from '../types';

const useTodaysImage = () => {
  const { data, loading, error, refetch } = useApi<PostImage>();
  return {
    images: data || {},
    loading,
    error,
    refetch,
  };
};

export default useTodaysImage;
