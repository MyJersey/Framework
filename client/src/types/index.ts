export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  skinType: string;
  image: string;
  description: string;
  isNew: boolean;
  isBestseller: boolean;
  ingredients: string[];
  howToUse: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Category {
  name: string;
}

export interface RegisteredUser {
  firstName: string;
  familyName: string;
  email: string;
}
