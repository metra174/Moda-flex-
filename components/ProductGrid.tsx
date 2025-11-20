import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES, CURRENCY_FORMAT } from '../constants';
import { ShoppingCart } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onOrder: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <section id="products" className="py-12 bg-gray-50 dark:bg-darkBg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Nossos Produtos
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                ${selectedCategory === cat 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white dark:bg-darkCard text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length === 0 ? (
             <div className="col-span-full text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">Nenhum produto encontrado nesta categoria.</p>
             </div>
          ) : (
            filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-darkCard rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Container */}
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 relative h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`h-full w-full object-cover object-center transition-transform duration-500 ${
                    hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                  }`}
                  loading="lazy"
                />
                
                {/* Overlay Button (Desktop) */}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                   hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                   <button
                      onClick={() => onOrder(product)}
                      className="hidden md:flex items-center bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primaryDark transform hover:scale-105 transition"
                   >
                     <ShoppingCart className="w-4 h-4 mr-2" />
                     Encomendar
                   </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-xs text-primary font-bold uppercase tracking-wide mb-1">{product.category}</p>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                        {product.name}
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
                            {CURRENCY_FORMAT.format(product.price)}
                        </p>
                    </div>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
                  {product.description}
                </p>

                {/* Sizes & Stock info (if available) */}
                {(product.sizes || product.quantity) && (
                    <div className="flex flex-wrap items-center gap-2 mb-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="flex gap-1">
                                {product.sizes.map(size => (
                                    <span key={size} className="text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                                        {size}
                                    </span>
                                ))}
                            </div>
                        )}
                        {product.quantity !== undefined && (
                             <span className="text-[10px] text-gray-400 ml-auto">
                                Restam: {product.quantity}
                             </span>
                        )}
                    </div>
                )}
                
                {/* Mobile Button (Always visible on mobile) */}
                <button
                  onClick={() => onOrder(product)}
                  className="w-full md:hidden flex items-center justify-center bg-primary text-white py-3 rounded-lg font-semibold active:bg-primaryDark mt-auto"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Encomendar Agora
                </button>
              </div>
            </div>
          )))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;