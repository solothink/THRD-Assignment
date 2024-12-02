import React, { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import dataService from '../services/DataService';
import { formatPrice } from '../utils/format';
import { Product } from '../types';

export const ProductList: React.FC = () => {
  const { user, cart, addToCart } = useAuth();

  const { unpurchasedProducts, purchasedProducts } = useMemo(() => {
    if (!user) {
      return { unpurchasedProducts: [], purchasedProducts: [] };
    }

    const userPurchases = dataService.getUserPurchaseHistory(user.id);
    const purchasedCategories = new Set(
      userPurchases.map(purchase => {
        const product = dataService.getProducts().find(p => p.id === purchase.productId);
        return product?.category;
      })
    );

    const allProducts = dataService.getProducts();
    const categorizedProducts = allProducts.reduce<{
      unpurchasedProducts: Product[];
      purchasedProducts: Product[];
    }>(
      (acc, product) => {
        if (purchasedCategories.has(product.category)) {
          acc.purchasedProducts.push(product);
        } else {
          acc.unpurchasedProducts.push(product);
        }
        return acc;
      },
      { unpurchasedProducts: [], purchasedProducts: [] }
    );

    // Sort both arrays alphabetically by name
    categorizedProducts.unpurchasedProducts.sort((a, b) => a.name.localeCompare(b.name));
    categorizedProducts.purchasedProducts.sort((a, b) => a.name.localeCompare(b.name));

    return categorizedProducts;
  }, [user]);

  const getCartQuantity = (productId: number): number => {
    const cartItem = cart.find(item => item.productId === productId);
    return cartItem?.quantity || 0;
  };

  if (!user) return null;

  const renderProductSection = (products: Product[], title: string) => (
    <div className="space-y-6">
      <h3 className="text-xl font-display text-luxury-primary">{title}</h3>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const quantity = getCartQuantity(product.id);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-w-4 aspect-h-5 w-full overflow-hidden rounded-t-lg">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-lg text-luxury-primary group-hover:text-luxury-accent transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-luxury-secondary/70 font-sans">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-lg font-medium text-luxury-accent">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(product.id)}
                  className={`mt-4 w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-colors ${
                    quantity > 0
                      ? 'bg-luxury-accent text-white'
                      : 'bg-luxury-cream text-luxury-primary hover:bg-luxury-sand'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="font-sans font-medium">
                    {quantity > 0 ? `In Cart (${quantity})` : 'Add to Cart'}
                  </span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      {unpurchasedProducts.length > 0 && (
        renderProductSection(unpurchasedProducts, "Discover New Categories")
      )}
      {purchasedProducts.length > 0 && (
        renderProductSection(purchasedProducts, "From Your Favorite Categories")
      )}
    </div>
  );
};