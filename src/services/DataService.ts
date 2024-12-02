import { User, Product, Purchase } from '../types';
import { parseUsers, parseProducts, parsePurchases } from '../utils/csvParser';
import { users, products, purchaseHistory } from '../data';

class DataService {
  private static instance: DataService | null = null;
  private users: User[] = [];
  private products: Product[] = [];
  private purchases: Purchase[] = [];
  private initialized: boolean = false;

  private constructor() {
    // Initialize with static data first
    this.users = users;
    this.products = products;
    this.purchases = purchaseHistory;
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Try to load data from CSV files
      const usersText = await fetch('/src/data/users.csv').then(res => res.text());
      const productsText = await fetch('/src/data/products.csv').then(res => res.text());
      const purchasesText = await fetch('/src/data/purchase_history.csv').then(res => res.text());

      this.users = parseUsers(usersText);
      this.products = parseProducts(productsText);
      this.purchases = parsePurchases(purchasesText);
      this.initialized = true;
    } catch (error) {
      console.warn('Using fallback static data:', error);
      // Already initialized with static data in constructor
      this.initialized = true;
    }
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public getPurchases(): Purchase[] {
    return this.purchases;
  }

  public getUserPurchaseHistory(userId: number): Purchase[] {
    return this.purchases.filter(purchase => purchase.userId === userId);
  }

  public getPersonalizedProducts(userId: number | null): Product[] {
    if (!userId) return [...this.products].sort((a, b) => a.name.localeCompare(b.name));

    const userPurchases = this.getUserPurchaseHistory(userId);
    const purchasedCategories = new Set(
      userPurchases.map(purchase => {
        const product = this.products.find(p => p.id === purchase.productId);
        return product?.category;
      })
    );

    const categorizedProducts = this.products.reduce<{
      unpurchased: Product[];
      purchased: Product[];
    }>(
      (acc, product) => {
        if (purchasedCategories.has(product.category)) {
          acc.purchased.push(product);
        } else {
          acc.unpurchased.push(product);
        }
        return acc;
      },
      { unpurchased: [], purchased: [] }
    );

    return [
      ...categorizedProducts.unpurchased.sort((a, b) => a.name.localeCompare(b.name)),
      ...categorizedProducts.purchased.sort((a, b) => a.name.localeCompare(b.name))
    ];
  }

  public validateCredentials(username: string, password: string): User | null {
    return this.users.find(
      user => user.username === username && user.password === password
    ) || null;
  }
}

const dataService = DataService.getInstance();
export default dataService;