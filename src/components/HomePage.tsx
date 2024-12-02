import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ProductList } from './ProductList';
import { TrendingCarousel } from './fashion/TrendingCarousel';
import { NewArrivals } from './fashion/NewArrivals';
import { FashionBlog } from './fashion/FashionBlog';
import { InstagramGallery } from './fashion/InstagramGallery';
import { NewsletterSignup } from './newsletter/NewsletterSignup';
import { Tag, Truck, CreditCard, Clock } from 'lucide-react';
import dataService from '../services/DataService';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const products = dataService.getProducts();

  if (!user) {
    return null; // Don't render anything if user is not authenticated
  }

  return (
    <div className="min-h-screen bg-luxury-pearl">
      {/* Hero Section */}
      <div className="relative">
        <TrendingCarousel />
      </div>

      {/* Features */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-luxury-cream mx-auto">
                <Tag className="h-6 w-6 text-luxury-accent" />
              </div>
              <h3 className="mt-6 text-sm font-medium text-luxury-primary">Best Prices</h3>
              <p className="mt-2 text-sm text-luxury-secondary/70">Competitive prices on all products</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-luxury-cream mx-auto">
                <Truck className="h-6 w-6 text-luxury-accent" />
              </div>
              <h3 className="mt-6 text-sm font-medium text-luxury-primary">Free Shipping</h3>
              <p className="mt-2 text-sm text-luxury-secondary/70">On orders over ₹999</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-luxury-cream mx-auto">
                <CreditCard className="h-6 w-6 text-luxury-accent" />
              </div>
              <h3 className="mt-6 text-sm font-medium text-luxury-primary">Secure Payment</h3>
              <p className="mt-2 text-sm text-luxury-secondary/70">100% secure payment</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-luxury-cream mx-auto">
                <Clock className="h-6 w-6 text-luxury-accent" />
              </div>
              <h3 className="mt-6 text-sm font-medium text-luxury-primary">24/7 Support</h3>
              <p className="mt-2 text-sm text-luxury-secondary/70">Dedicated support team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-display text-luxury-primary mb-8">
          Personalized Recommendations
        </h2>
        <ProductList />
      </div>

      {/* Fashion Blog Section */}
      <FashionBlog />

      {/* Instagram Gallery */}
      <InstagramGallery />

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  );
};