import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();

  const handleLoginClick = () => {
    const loginButton = document.querySelector('[data-login-trigger]');
    if (loginButton instanceof HTMLElement) {
      loginButton.click();
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-luxury-primary">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-primary/95 to-luxury-primary/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600"
          alt="Luxury Fashion"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <ShoppingBag className="h-8 w-8 text-luxury-accent" />
              <span className="text-2xl font-display text-white">StyleStore</span>
            </div>
            
            <h1 className="text-5xl font-display text-white leading-tight mb-6">
              Discover Your Perfect Style
            </h1>
            
            <p className="text-xl text-luxury-cream/90 mb-12 font-sans max-w-xl">
              Sign in to explore our personalized collection tailored to your preferences
              and shopping history.
            </p>

            <div className="flex items-center space-x-6">
              <button
                onClick={handleLoginClick}
                className="flex items-center space-x-2 px-8 py-4 bg-luxury-accent 
                         text-white rounded-lg font-sans font-medium
                         hover:bg-luxury-accent/90 transition-all duration-200
                         transform hover:translate-y-[-2px]"
              >
                <User className="h-5 w-5" />
                <span>Sign In to Shop</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-24 border-t border-luxury-cream/20 pt-8"
          >
            <div className="grid grid-cols-3 gap-8">
              {[
                { label: 'Personalized Shopping', value: 'Experience' },
                { label: 'Curated Collections', value: 'Premium' },
                { label: 'Exclusive Offers', value: 'Members Only' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-display text-luxury-accent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-luxury-cream/70 font-sans">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};