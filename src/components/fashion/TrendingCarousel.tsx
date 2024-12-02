import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import dataService from '../../services/DataService';

export const TrendingCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trendingItems, setTrendingItems] = useState<Product[]>([]);

  useEffect(() => {
    const products = dataService.getProducts();
    // Get fashion items and sort by price (assuming higher price = trending)
    const fashionItems = products
      .filter(product => ['Tops', 'Bottoms', 'Outerwear'].includes(product.category))
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
    setTrendingItems(fashionItems);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingItems.length) % trendingItems.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [trendingItems.length]);

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative h-96">
        {trendingItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">{item.name}</h3>
              <p className="text-gray-200">{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {trendingItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};