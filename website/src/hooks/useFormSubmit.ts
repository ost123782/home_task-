import { useCallback } from 'react';
import { useMutation } from './useMutation';

interface UseFormSubmitOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useFormSubmit = <T>(
  submitFn: () => Promise<T>,
  options?: UseFormSubmitOptions
) => {
  const { mutate, loading, error } = useMutation(submitFn, {
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await mutate(undefined as any);
    },
    [mutate]
  );

  return { handleSubmit, loading, error };
};

