import { useState, useCallback } from 'react';

interface UseMutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export const useMutation = <T, V = void>(mutationFn: (variables: V) => Promise<T>, options?: UseMutationOptions<T>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mutate = useCallback(async (variables: V) => {
    setLoading(true);
    setError('');

    try {
      const data = await mutationFn(variables);
      options?.onSuccess?.(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options?.onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFn, options]);

  const reset = useCallback(() => {
    setError('');
  }, []);

  return { mutate, loading, error, reset };
};

