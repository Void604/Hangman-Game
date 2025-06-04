import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, AlertCircle } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(username, email, password);
      navigate('/game');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-md">
        <div className="bg-dark-100 rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-primary-300">
            Create an Account
          </h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-md flex items-center gap-2 text-red-400">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-dark-200 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
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
            
            <div className="mb-4">
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
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                <span>Creating account...</span>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-gray-400">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-primary-400 hover:text-primary-300">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;