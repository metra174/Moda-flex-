import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import OrderModal from './components/OrderModal';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';
import { Product } from './types';

const App: React.FC = () => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Product State (Dynamic)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Toggle Theme Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleOrderClick = (product: Product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleAddProduct = (newProduct: Product) => {
    // Add the new product to the beginning of the list
    setProducts(prev => [newProduct, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-darkBg transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="flex-grow">
        <Hero />
        <ProductGrid products={products} onOrder={handleOrderClick} />
      </main>

      <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />

      <OrderModal 
        product={selectedProduct} 
        isOpen={isOrderModalOpen} 
        onClose={handleCloseOrderModal} 
      />

      <AdminModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default App;