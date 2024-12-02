import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, LogOut, ShoppingCart, Search } from 'lucide-react';
import { CartDrawer } from './cart/CartDrawer';
import { SearchBar } from './search/SearchBar';

export const Navbar: React.FC = () => {
  const { user, login, logout, cart } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="bg-luxury-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-luxury-accent" />
                <span className="ml-2 text-xl font-display">StyleStore</span>
              </div>
              
              <div className="flex-1 max-w-lg">
                <SearchBar />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button
                    onClick={() => setShowCartDrawer(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-md
                             bg-luxury-accent/10 text-luxury-accent hover:bg-luxury-accent/20
                             transition-colors duration-200"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="font-sans">Cart ({totalItems})</span>
                  </button>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-sans text-luxury-cream">
                      Welcome, {user.username}
                    </span>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 px-4 py-2 rounded-md
                               hover:bg-luxury-secondary/20 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="font-sans">Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <button
                  data-login-trigger
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md
                           bg-luxury-accent text-white hover:bg-luxury-accent/90
                           transition-colors duration-200 font-sans"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-luxury-pearl rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-display text-luxury-primary mb-6">Sign In</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-luxury-secondary mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-luxury-sand
                           focus:outline-none focus:ring-2 focus:ring-luxury-accent/20
                           font-sans"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-luxury-secondary mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-luxury-sand
                           focus:outline-none focus:ring-2 focus:ring-luxury-accent/20
                           font-sans"
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm font-sans">{error}</p>
              )}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-sm font-medium text-luxury-secondary
                           hover:bg-luxury-cream rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white
                           bg-luxury-accent hover:bg-luxury-accent/90
                           rounded-md transition-colors duration-200"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <CartDrawer isOpen={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
    </>
  );
};