import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-dark-200 shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-400">
          Hangman
        </Link>
        
        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link 
                to="/game" 
                className={`text-sm font-medium ${
                  location.pathname === '/game' 
                    ? 'text-primary-400' 
                    : 'text-gray-300 hover:text-primary-300'
                }`}
              >
                Play
              </Link>
              <Link 
                to="/profile" 
                className={`text-sm font-medium ${
                  location.pathname === '/profile' 
                    ? 'text-primary-400' 
                    : 'text-gray-300 hover:text-primary-300'
                }`}
              >
                Profile
              </Link>
              <div className="flex items-center gap-2 text-gray-300">
                <User size={16} />
                <span className="text-sm">{user?.username}</span>
              </div>
              <button 
                onClick={logout}
                className="flex items-center gap-1 text-sm text-gray-300 hover:text-primary-300"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`text-sm font-medium ${
                  location.pathname === '/login' 
                    ? 'text-primary-400' 
                    : 'text-gray-300 hover:text-primary-300'
                }`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;