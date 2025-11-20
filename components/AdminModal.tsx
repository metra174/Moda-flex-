import React, { useState } from 'react';
import { X, Lock, User, LayoutDashboard, Plus, LogOut, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { ADMIN_CREDENTIALS, CATEGORIES } from '../constants';
import { Product, Category } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct?: (product: Product) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // New Product Form State
  const [newProduct, setNewProduct] = useState<{
    name: string;
    price: string;
    category: Category;
    image: string;
    sizes: string;
    quantity: string;
    description: string;
  }>({
    name: '',
    price: '',
    category: 'Roupas',
    image: '',
    sizes: '',
    quantity: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!onAddProduct) return;

    const priceNumber = parseFloat(newProduct.price);
    const quantityNumber = parseInt(newProduct.quantity) || 0;
    
    // Process sizes (comma separated to array)
    const sizeArray = newProduct.sizes.split(',').map(s => s.trim()).filter(s => s !== '');

    const productToAdd: Product = {
      id: Date.now(), // Generate a unique ID
      name: newProduct.name,
      price: isNaN(priceNumber) ? 0 : priceNumber,
      category: newProduct.category,
      image: newProduct.image || 'https://picsum.photos/400/400', // Default placeholder if empty
      description: newProduct.description || 'Novo produto adicionado.',
      sizes: sizeArray.length > 0 ? sizeArray : undefined,
      quantity: quantityNumber
    };

    onAddProduct(productToAdd);
    
    // Show success feedback
    setSuccessMessage('Produto adicionado com sucesso!');
    
    // Reset form
    setNewProduct({
      name: '',
      price: '',
      category: 'Roupas',
      image: '',
      sizes: '',
      quantity: '',
      description: ''
    });

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-darkCard rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-black/40 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {isLoggedIn ? 'Gerenciar Loja' : 'Acesso Restrito'}
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Edivina Company</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {!isLoggedIn ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-5 max-w-md mx-auto py-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-3">
                  <Lock className="w-8 h-8" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Entre com suas credenciais de administrador.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Usuário
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="Digite o usuário"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="Digite a senha"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primaryDark text-white py-2.5 rounded-lg font-bold shadow-md transition-colors"
              >
                Entrar
              </button>
            </form>
          ) : (
            /* Add Product Dashboard */
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5" />
                  Adicionar Novo Produto
                </h4>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 border border-red-200 dark:border-red-900 px-3 py-1 rounded-full transition"
                >
                  <LogOut className="w-3 h-3" /> Sair
                </button>
              </div>

              {successMessage && (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-2 animate-fade-in">
                  <CheckCircle className="w-5 h-5" />
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmitProduct} className="bg-gray-50 dark:bg-black/20 p-5 rounded-xl border border-gray-100 dark:border-gray-700 space-y-4">
                
                {/* Row 1: Name & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Nome do Produto</label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: Vestido Florido"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Coleção (Categoria)</label>
                    <select
                      name="category"
                      value={newProduct.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                    >
                      {CATEGORIES.filter(c => c !== 'Todos').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: Price & Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Preço (KZ)</label>
                    <input
                      type="number"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: 5000"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Quantidade (Estoque)</label>
                    <input
                      type="number"
                      name="quantity"
                      value={newProduct.quantity}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: 10"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                </div>

                {/* Row 3: Image URL */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> Link da Imagem (URL)
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={newProduct.image}
                    onChange={handleInputChange}
                    placeholder="Cole o link da imagem aqui..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Deixe em branco para usar uma imagem padrão.</p>
                </div>

                {/* Row 4: Sizes */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Tamanhos (Separe por vírgula)</label>
                  <input
                    type="text"
                    name="sizes"
                    value={newProduct.sizes}
                    onChange={handleInputChange}
                    placeholder="Ex: S, M, L, XL ou 36, 38, 40"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                {/* Row 5: Description */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase">Descrição</label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Breve descrição do produto..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-1 focus:ring-primary outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primaryDark text-white py-3 rounded-lg font-bold shadow-lg transform active:scale-95 transition-all flex justify-center items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar à Loja
                </button>

              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default AdminModal;