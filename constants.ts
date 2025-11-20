import { Product, Category } from './types';

export const WHATSAPP_NUMBER = "244932846639";

export const ADMIN_CREDENTIALS = {
  username: 'Edivina17',
  password: '932ed$#'
};

export const CATEGORIES: Category[] = ['Todos', 'Roupas', 'Calçados', 'Bolsas', 'Relógios', 'Acessórios'];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Camiseta Casual Pink',
    price: 4500,
    category: 'Roupas',
    image: 'https://picsum.photos/id/100/400/400',
    description: 'Camiseta 100% algodão com corte moderno.',
  },
  {
    id: 2,
    name: 'Tênis Urban Runner',
    price: 12000,
    category: 'Calçados',
    image: 'https://picsum.photos/id/103/400/400',
    description: 'Conforto e estilo para o seu dia a dia.',
  },
  {
    id: 3,
    name: 'Bolsa de Couro Sintético',
    price: 8500,
    category: 'Bolsas',
    image: 'https://picsum.photos/id/22/400/400',
    description: 'Espaçosa e elegante, ideal para trabalho.',
  },
  {
    id: 4,
    name: 'Relógio Minimalista',
    price: 15000,
    category: 'Relógios',
    image: 'https://picsum.photos/id/175/400/400',
    description: 'Design clássico com pulseira ajustável.',
  },
  {
    id: 5,
    name: 'Óculos de Sol Retro',
    price: 3000,
    category: 'Acessórios',
    image: 'https://picsum.photos/id/64/400/400',
    description: 'Proteção UV400 com armação leve.',
  },
  {
    id: 6,
    name: 'Jaqueta Jeans',
    price: 9000,
    category: 'Roupas',
    image: 'https://picsum.photos/id/129/400/400',
    description: 'Estilo atemporal que combina com tudo.',
  },
];

export const CURRENCY_FORMAT = new Intl.NumberFormat('pt-AO', {
  style: 'currency',
  currency: 'AOA',
});