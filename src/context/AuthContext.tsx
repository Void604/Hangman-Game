import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

// Mock user database
const USERS_STORAGE_KEY = 'hangman_users';
const CURRENT_USER_KEY = 'hangman_current_user';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(CURRENT_USER_KEY);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const getUsers = (): Record<string, { user: User; password: string }> => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : {};
  };

  const saveUsers = (users: Record<string, { user: User; password: string }>) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = getUsers();
      const userEntry = Object.values(users).find(entry => entry.user.email === email);
      
      if (!userEntry || userEntry.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      const { user } = userEntry;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }));
      throw error;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = getUsers();
      
      // Check if email already exists
      if (Object.values(users).some(entry => entry.user.email === email)) {
        throw new Error('Email already in use');
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
      };
      
      users[newUser.id] = { user: newUser, password };
      saveUsers(users);
      
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};