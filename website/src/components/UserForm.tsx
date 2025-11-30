import { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';
import type { IUser } from '../services/api';
import { useAuthStore } from '../stores/authStore';
import { Modal, FormField, ErrorMessage, Button } from './ui';
import { useMutation } from '../hooks';

interface UserFormProps {
  user?: IUser | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const UserForm = ({ user, onClose, onSuccess }: UserFormProps) => {
  const { token } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const { mutate, loading, error } = useMutation<void, void>(
    async () => {
      if (!token) throw new Error('Token is required');
      await usersAPI.update({ name, email }, token);
    },
    {
      onSuccess: () => {
        onSuccess?.();
        onClose();
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutate(undefined);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Edit Profile"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Name"
          id="user-name"
          inputProps={{
            type: 'text',
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true,
            placeholder: 'Enter name',
          }}
        />
        <FormField
          label="Email"
          id="user-email"
          inputProps={{
            type: 'email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            placeholder: 'Enter email',
          }}
        />
        <ErrorMessage message={error} />
        <div className="flex gap-3 justify-end pt-4">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={loading}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};
