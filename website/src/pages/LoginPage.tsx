import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { FormField, ErrorMessage, Button, Card } from '../components/ui';
import { useFormSubmit } from '../hooks';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const { handleSubmit, loading, error } = useFormSubmit(
    async () => {
      await login(email, password);
      navigate('/cars');
    }
  );

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            Login
          </Button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-purple-600 hover:text-purple-700 font-semibold underline"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};
