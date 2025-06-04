import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <h1 className="text-6xl font-bold text-primary-400 mb-4">404</h1>
      <p className="text-2xl text-gray-300 mb-8">Page not found</p>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors"
      >
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;