import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, X } from 'lucide-react';

interface SignInPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const SignInPrompt: React.FC<SignInPromptProps> = ({ isOpen, onClose, onLogin }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-luxury-pearl rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-luxury-cream rounded-full">
                <LogIn className="h-6 w-6 text-luxury-accent" />
              </div>
              <button
                onClick={onClose}
                className="text-luxury-secondary hover:text-luxury-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <h3 className="text-2xl font-display text-luxury-primary mb-2">
              Sign in to Continue
            </h3>
            <p className="text-luxury-secondary/80 mb-6 font-sans">
              Please sign in to add items to your cart and enjoy a personalized shopping experience.
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={onLogin}
                className="w-full bg-luxury-accent text-white py-3 rounded-lg
                         font-sans font-medium hover:bg-luxury-accent/90
                         transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                onClick={onClose}
                className="w-full bg-luxury-cream text-luxury-primary py-3 rounded-lg
                         font-sans font-medium hover:bg-luxury-cream/80
                         transition-colors duration-200"
              >
                Continue Browsing
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};