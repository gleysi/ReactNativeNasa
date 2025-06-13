import { useEffect, useState, useCallback } from 'react';
import fetchApi from '../utils/fetch';

const useApi = <T>(urlParams: string = '', autoFetch: boolean = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  // useCallback memoizes (store the result or identity of a function) a function definition — 
  // it ensures that the function doesn’t get re-created on every render unless its dependencies change.
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchApi(urlParams);
      setData(response);
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [urlParams]);

  // useEffect is used to call fetchData when the component mounts or when urlParams changes
  // If autoFetch is true, it will automatically fetch data on mount
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);
  // Second argument is an empty array of dependencies, meaning this effect runs only once when the component mounts.

  return { data, loading, error, refetch: fetchData };
  // You expose fetchData outside the hook as refetch to let your component call it when needed
};

export default useApi;
