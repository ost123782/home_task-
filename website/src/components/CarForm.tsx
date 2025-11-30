import { useState, useEffect } from 'react';
import { carsAPI } from '../services/api';
import type { ICar } from '../services/api';
import { useAuthStore } from '../stores/authStore';
import { Modal, FormField, ErrorMessage, Button } from './ui';
import { useMutation } from '../hooks';

interface CarFormProps {
  car?: ICar | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CarForm = ({ car, onClose, onSuccess }: CarFormProps) => {
  const { token } = useAuthStore();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (car) {
      setMake(car.make || '');
      setModel(car.model || '');
      setYear(
        car.year
          ? new Date(car.year).getFullYear().toString()
          : new Date().getFullYear().toString()
      );
    }
  }, [car]);

  const { mutate, loading, error } = useMutation<ICar, void>(
    async () => {
      if (!token) throw new Error('Token is required');
      
      if (car?._id) {
        return await carsAPI.update(car._id, { make, model }, token);
      } else {
        const yearDate = new Date(parseInt(year), 0, 1);
        return await carsAPI.create(
          {
            make,
            model,
            year: yearDate,
          },
          token
        );
      }
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
      title={car ? 'Edit Car' : 'New Car'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Make"
          id="car-make"
          inputProps={{
            type: 'text',
            value: make,
            onChange: (e) => setMake(e.target.value),
            required: true,
            placeholder: 'Enter car make',
          }}
        />
        <FormField
          label="Model"
          id="car-model"
          inputProps={{
            type: 'text',
            value: model,
            onChange: (e) => setModel(e.target.value),
            required: true,
            placeholder: 'Enter car model',
          }}
        />
        {!car && (
          <FormField
            label="Year"
            id="car-year"
            inputProps={{
              type: 'number',
              value: year,
              onChange: (e) => setYear(e.target.value),
              required: true,
              min: '1900',
              max: String(new Date().getFullYear() + 1),
              placeholder: 'Enter year',
            }}
          />
        )}
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
