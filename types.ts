export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes?: string[];
  quantity?: number;
}

export type Category = 'Todos' | 'Roupas' | 'Calçados' | 'Bolsas' | 'Relógios' | 'Acessórios';

export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
}