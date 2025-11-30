import { useState, useEffect, useCallback } from 'react';

interface UseQueryOptions {
  enabled?: boolean;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useQuery = <T>(
  queryFn: () => Promise<T>,
  deps: React.DependencyList = [],
  options?: UseQueryOptions
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refetch = useCallback(async () => {
    if (options?.enabled === false) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await queryFn();
      setData(result);
      options?.onSuccess?.();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options?.onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [queryFn, options]);

  useEffect(() => {
    refetch();
  }, deps);

  return { data, loading, error, refetch };
};

