import { User, Product, Purchase } from './types';

export const users: User[] = [
  { id: 1, username: 'user1', password: 'password123' },
  { id: 2, username: 'user2', password: 'password123' },
  { id: 3, username: 'user3', password: 'password123' },
];

export const products: Product[] = [
  { id: 101, name: 'Classic White Shirt', category: 'Tops', price: 2399, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800' },
  { id: 102, name: 'Denim Jeans', category: 'Bottoms', price: 3999, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800' },
  { id: 103, name: 'Leather Jacket', category: 'Outerwear', price: 7299, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800' },
  { id: 104, name: 'Black T-Shirt', category: 'Tops', price: 1599, imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800' },
  { id: 105, name: 'Chinos', category: 'Bottoms', price: 3199, imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800' },
  { id: 106, name: 'Hoodie', category: 'Outerwear', price: 4799, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800' },
  { id: 107, name: 'Striped Shirt', category: 'Tops', price: 2799, imageUrl: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=800' },
  { id: 108, name: 'Shorts', category: 'Bottoms', price: 1999, imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800' },
  { id: 109, name: 'Blazer', category: 'Outerwear', price: 7999, imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800' },
  { id: 110, name: 'Graphic Tee', category: 'Tops', price: 1999, imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800' },
];

export const purchaseHistory: Purchase[] = [
  { userId: 1, productId: 101, purchaseDate: '2023-01-15' },
  { userId: 1, productId: 104, purchaseDate: '2023-02-20' },
  { userId: 1, productId: 105, purchaseDate: '2023-03-05' },
  { userId: 2, productId: 102, purchaseDate: '2023-01-25' },
  { userId: 2, productId: 106, purchaseDate: '2023-04-18' },
  { userId: 3, productId: 103, purchaseDate: '2023-02-10' },
  { userId: 3, productId: 107, purchaseDate: '2023-03-22' },
  { userId: 3, productId: 108, purchaseDate: '2023-05-30' },
];