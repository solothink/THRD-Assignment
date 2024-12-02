import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, CartItem } from '../types';
import dataService from '../services/DataService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Toast } from '../components/notifications/Toast';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useLocalStorage<CartItem[]>('userCart', []);
  const [isInitialized, setIsInitialized] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await dataService.initialize();
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize data service:', error);
      }
    };
    initializeData();
  }, []);

  const login = (username: string, password: string): boolean => {
    const validatedUser = dataService.validateCredentials(username, password);
    if (validatedUser) {
      setUser(validatedUser);
      localStorage.setItem('currentUser', JSON.stringify(validatedUser));
      const savedCart = localStorage.getItem(`cart_${validatedUser.id}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      setToast({ message: `Welcome back, ${validatedUser.username}!`, type: 'success' });
      return true;
    }
    setToast({ message: 'Invalid credentials', type: 'error' });
    return false;
  };

  const logout = () => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
      setToast({ message: 'Successfully logged out', type: 'success' });
    }
    localStorage.removeItem('currentUser');
    setUser(null);
    setCart([]);
  };

  const addToCart = (productId: number) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.productId === productId);
      const newCart = existingItem
        ? currentCart.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...currentCart, { productId, quantity: 1 }];
      
      if (user) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(currentCart => {
      const newCart = currentCart.filter(item => item.productId !== productId);
      if (user) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2EDE4]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2C3639]"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      cart, 
      addToCart, 
      removeFromCart 
    }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {children}
    </AuthContext.Provider>
  );
};