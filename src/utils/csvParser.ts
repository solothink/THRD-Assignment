import { User, Product, Purchase } from '../types';

export const parseCSV = (csvContent: string): string[][] => {
  return csvContent
    .trim()
    .split('\n')
    .map(line => line.split(',').map(cell => cell.trim()));
};

export const parseUsers = (csvContent: string): User[] => {
  const rows = parseCSV(csvContent);
  const headers = rows[0];
  return rows.slice(1).map(row => ({
    id: parseInt(row[0]),
    username: row[1],
    password: row[2]
  }));
};

export const parseProducts = (csvContent: string): Product[] => {
  const rows = parseCSV(csvContent);
  const headers = rows[0];
  return rows.slice(1).map(row => ({
    id: parseInt(row[0]),
    name: row[1],
    category: row[2],
    price: parseInt(row[3]),
    imageUrl: row[4]
  }));
};

export const parsePurchases = (csvContent: string): Purchase[] => {
  const rows = parseCSV(csvContent);
  const headers = rows[0];
  return rows.slice(1).map(row => ({
    userId: parseInt(row[0]),
    productId: parseInt(row[1]),
    purchaseDate: row[2]
  }));
};