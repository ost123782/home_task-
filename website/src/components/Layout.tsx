import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <header className="bg-white/10 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-white hover:opacity-80 transition-opacity">
              Car & User Management
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <nav className="flex gap-2">
                  <Link
                    to="/cars"
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      location.pathname === '/cars'
                        ? 'bg-white text-purple-600'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    Cars
                  </Link>
                  <Link
                    to="/users"
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      location.pathname === '/users'
                        ? 'bg-white text-purple-600'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    Profile
                  </Link>
                </nav>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <nav className="flex gap-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    location.pathname === '/login'
                      ? 'bg-white text-purple-600'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    location.pathname === '/register'
                      ? 'bg-white text-purple-600'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  Register
                </Link>
              </nav>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
