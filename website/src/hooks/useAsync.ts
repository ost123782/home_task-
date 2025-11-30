import { useState, useCallback } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string;
}

export const useAsync = <T,>() => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: '',
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState({ data: null, loading: true, error: '' });
    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: '' });
      return data;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      setState({ data: null, loading: false, error });
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: '' });
  }, []);

  return { ...state, execute, reset };
};

