import React from 'react';
import { Smartphone, Shirt, Tv, Home, Gift, Plane } from 'lucide-react';

export const CategoryMenu: React.FC = () => {
  const categories = [
    { name: 'Mobiles', icon: Smartphone },
    { name: 'Fashion', icon: Shirt },
    { name: 'Electronics', icon: Tv },
    { name: 'Home & Furniture', icon: Home },
    { name: 'Beauty, Toys & More', icon: Gift },
    { name: 'Flight Bookings', icon: Plane },
  ];

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between space-x-8 py-4">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#"
              className="flex flex-col items-center group"
            >
              <category.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
              <span className="mt-1 text-sm text-gray-600 group-hover:text-indigo-600">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};