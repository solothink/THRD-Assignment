export interface User {
  id: number;
  username: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

export interface Purchase {
  userId: number;
  productId: number;
  purchaseDate: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  cart: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}