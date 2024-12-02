import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dataService from '../../services/DataService';
import { Product } from '../../types';
import { formatPrice } from '../../utils/format';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      const products = dataService.getProducts();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for luxury fashion..."
          className="w-full bg-luxury-pearl text-luxury-primary pl-12 pr-10 py-3 rounded-lg 
                   border border-luxury-sand focus:border-luxury-accent
                   focus:outline-none focus:ring-2 focus:ring-luxury-accent/20
                   font-sans text-sm placeholder:text-luxury-secondary/50
                   transition-all duration-200"
        />
        <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-luxury-secondary/70" />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-3 p-1 rounded-full
                     hover:bg-luxury-secondary/10 transition-colors"
          >
            <X className="h-4 w-4 text-luxury-secondary/70" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl 
                     border border-luxury-sand overflow-hidden"
          >
            <div className="py-2 max-h-[70vh] overflow-y-auto">
              {results.map((product) => (
                <motion.button
                  key={product.id}
                  whileHover={{ backgroundColor: 'rgba(245, 240, 230, 0.5)' }}
                  onClick={() => {
                    setQuery(product.name);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left flex items-center space-x-4
                           hover:bg-luxury-cream/50 transition-colors duration-200"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-display text-luxury-primary font-medium">
                      {product.name}
                    </h4>
                    <p className="text-sm text-luxury-secondary/70 font-sans">
                      {product.category}
                    </p>
                    <p className="text-sm font-medium text-luxury-accent mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};