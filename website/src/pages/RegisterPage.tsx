import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { FormField, ErrorMessage, Button, Card } from '../components/ui';
import { useFormSubmit } from '../hooks';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const { handleSubmit, loading, error } = useFormSubmit(
    async () => {
      await register(name, email, password);
      navigate('/cars');
    }
  );

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Name"
            id="name"
            inputProps={{
              type: 'text',
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              placeholder: 'Enter your name',
            }}
          />
          <FormField
            label="Email"
            id="email"
            inputProps={{
              type: 'email',
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              placeholder: 'Enter your email',
            }}
          />
          <FormField
            label="Password"
            id="password"
            inputProps={{
              type: 'password',
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true,
              placeholder: 'Enter your password',
            }}
          />
          <ErrorMessage message={error} />
          <Button type="submit" isLoading={loading} className="w-full">
            Register
          </Button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-purple-600 hover:text-purple-700 font-semibold underline"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};
