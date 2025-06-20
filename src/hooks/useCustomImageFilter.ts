import { PostImage, ImageDateParams } from '../types';
import useApi from './useApi';

// Overload signatures
function useCustomImageFilter(): {
  images: PostImage | null;
  loading: boolean;
  error: any;
  refetch: () => void;
};
function useCustomImageFilter(params: ImageDateParams): {
  images: PostImage[];
  loading: boolean;
  error: any;
  refetch: () => void;
};

// Implementation signature — compatible with both overloads
function useCustomImageFilter(params?: ImageDateParams): {
  images: PostImage | PostImage[] | null;
  loading: boolean;
  error: any;
  refetch: () => void;
} {
  const isRange = !!(params?.start_date && params?.end_date);
  const queryParams = isRange
    ? `&start_date=${params.start_date}&end_date=${params.end_date}`
    : '';

  const { data, loading, error, refetch } = useApi<PostImage | PostImage[]>(queryParams);

  const images = isRange
    ? (data as PostImage[]) || []
    : (data as PostImage) || {};

  return {
    images,
    loading,
    error,
    refetch,
  };
}

export default useCustomImageFilter;
