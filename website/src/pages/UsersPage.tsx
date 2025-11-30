import { useState } from 'react';
import { usersAPI } from '../services/api';
import type { IUser } from '../services/api';
import { useAuthStore } from '../stores/authStore';
import { UserForm } from '../components/UserForm';
import { PageContainer, Card, LoadingSpinner, ErrorMessage, Button } from '../components/ui';
import { useQuery, useMutation } from '../hooks';

export const UsersPage = () => {
  const { token, userId } = useAuthStore();
  const [showForm, setShowForm] = useState(false);

  const { data: currentUser, loading, error, refetch } = useQuery<IUser>(
    () => usersAPI.getById(userId!),
    [userId],
    { enabled: !!userId }
  );

  const { mutate: deleteUser, loading: deleting, error: deleteError } = useMutation<void, void>(
    async () => {
      if (!token) throw new Error('Token is required');
      await usersAPI.delete(token);
      useAuthStore.getState().logout();
      window.location.href = '/login';
    },
    {
      onError: (error) => console.error('Delete error:', error),
    }
  );

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    await deleteUser(undefined);
  };

  const handleFormClose = () => {
    setShowForm(false);
    refetch();
  };

  if (loading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  if (!currentUser) {
    return (
      <PageContainer>
        <div className="text-white text-xl text-center">User not found</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="4xl">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
          <div className="flex gap-2">
            <Button onClick={() => setShowForm(true)}>
              Edit Profile
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={deleting}>
              Delete Account
            </Button>
          </div>
        </div>

        <ErrorMessage message={error || deleteError} className="mb-6" />

        {showForm && (
          <UserForm
            user={currentUser}
            onClose={handleFormClose}
            onSuccess={handleFormClose}
          />
        )}

        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-lg text-gray-900">{currentUser.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-lg text-gray-900">{currentUser.email}</p>
          </div>
          {currentUser._id && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <p className="text-sm text-gray-600 font-mono">{currentUser._id}</p>
            </div>
          )}
        </div>
      </Card>
    </PageContainer>
  );
};
