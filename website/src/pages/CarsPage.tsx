import { useEffect, useState } from 'react';
import { carsAPI, usersAPI } from '../services/api';
import type { ICar, IUser } from '../services/api';
import { useAuthStore } from '../stores/authStore';
import { CarForm } from '../components/CarForm';
import { PageContainer, Card, LoadingSpinner, ErrorMessage, Button, DataTable } from '../components/ui';
import { useQuery, useConfirmDelete } from '../hooks';

export const CarsPage = () => {
  const { token, isAuthenticated } = useAuthStore();
  const [users, setUsers] = useState<IUser[]>([]);
  const [editingCar, setEditingCar] = useState<ICar | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: cars, loading, error, refetch } = useQuery<ICar[]>(
    () => carsAPI.getAll(token || undefined),
    [token]
  );

  const { handleDelete, error: deleteError } = useConfirmDelete<ICar>(
    async (id) => {
      if (!token) throw new Error('You need to be logged in to delete cars');
      await carsAPI.delete(id, token);
      await refetch();
    },
    {
      message: 'Are you sure you want to delete this car?',
      onSuccess: () => refetch(),
    }
  );

  useEffect(() => {
    if (token) {
      usersAPI.getAll().then(setUsers).catch(console.error);
    }
  }, [token]);

  const handleEdit = (car: ICar) => {
    if (!isAuthenticated) {
      alert('You need to be logged in to edit cars');
      return;
    }
    setEditingCar(car);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCar(null);
    refetch();
  };

  const getUserName = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : userId;
  };

  if (loading) {
    return <LoadingSpinner message="Loading cars..." />;
  }

  return (
    <PageContainer>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Cars Management</h2>
          {isAuthenticated && (
            <Button onClick={() => setShowForm(true)}>
              Add New Car
            </Button>
          )}
        </div>

        {!isAuthenticated && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
            You can view cars without login. Login to create, edit, or delete cars.
          </div>
        )}

        <ErrorMessage message={error || deleteError} className="mb-6" />

        {showForm && isAuthenticated && (
          <CarForm
            car={editingCar}
            onClose={handleFormClose}
            onSuccess={handleFormClose}
          />
        )}

        <DataTable
          columns={[
            { key: 'make', label: 'Make' },
            { key: 'model', label: 'Model' },
            {
              key: 'year',
              label: 'Year',
              render: (car) => (car.year ? new Date(car.year).getFullYear() : 'N/A'),
            },
            {
              key: 'user_id',
              label: 'Owner',
              render: (car) => getUserName(car.user_id),
            },
          ]}
          data={cars || []}
          emptyMessage="No cars found"
          onEdit={isAuthenticated ? handleEdit : undefined}
          onDelete={isAuthenticated ? handleDelete : undefined}
          showActions={isAuthenticated}
        />
      </Card>
    </PageContainer>
  );
};
