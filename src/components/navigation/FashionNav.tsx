import React from 'react';
import { Sparkles, Crown, Heart, Star, Gem, Shirt } from 'lucide-react';
import { motion } from 'framer-motion';

export const FashionNav: React.FC = () => {
  const collections = [
    { name: 'New Season', icon: Sparkles, color: 'text-luxury-accent' },
    { name: 'Luxury Edit', icon: Crown, color: 'text-luxury-copper' },
    { name: 'Most Loved', icon: Heart, color: 'text-rose-400' },
    { name: 'Trending Now', icon: Star, color: 'text-luxury-accent' },
    { name: 'Premium', icon: Gem, color: 'text-luxury-copper' },
    { name: 'Essentials', icon: Shirt, color: 'text-luxury-secondary' },
  ];

  return (
    <div className="relative bg-luxury-pearl border-y border-luxury-sand/30">
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-cream/50 to-luxury-pearl/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between py-6">
          {collections.map((collection, index) => (
            <motion.a
              key={collection.name}
              href="#"
              className="group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center space-y-3">
                <motion.div
                  className={`p-4 rounded-full bg-white shadow-lg group-hover:shadow-xl 
                           transition-all duration-300 ${collection.color}`}
                  whileHover={{ y: -2 }}
                >
                  <collection.icon className="h-6 w-6" />
                </motion.div>
                <span className="text-sm font-sans font-medium text-luxury-primary
                             group-hover:text-luxury-accent transition-colors duration-200">
                  {collection.name}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};