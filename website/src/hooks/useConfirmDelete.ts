import { useCallback } from 'react';
import { useMutation } from './useMutation';

interface UseConfirmDeleteOptions {
  message?: string;
  onSuccess?: () => void;
}

export const useConfirmDelete = <T extends { _id?: string }>(
  deleteFn: (id: string) => Promise<void>,
  options?: UseConfirmDeleteOptions
) => {
  const { mutate, loading, error } = useMutation(
    async (item: T) => {
      if (!item._id) throw new Error('Item ID is required');
      await deleteFn(item._id);
    },
    {
      onSuccess: options?.onSuccess,
    }
  );

  const handleDelete = useCallback(
    async (item: T) => {
      const message = options?.message || 'Are you sure you want to delete this item?';
      if (!confirm(message)) return;
      await mutate(item);
    },
    [mutate, options?.message]
  );

  return { handleDelete, loading, error };
};

