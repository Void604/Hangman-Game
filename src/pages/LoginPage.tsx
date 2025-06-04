import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/game');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-md">
        <div className="bg-dark-100 rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-primary-300">
            Login to Your Account
          </h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-md flex items-center gap-2 text-red-400">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-dark-200 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-dark-200 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-gray-400">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-400 hover:text-primary-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;