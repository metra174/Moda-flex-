import React, { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { Product, OrderFormData } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface OrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ product, isOpen, onClose }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    email: '',
    phone: '',
  });

  if (!isOpen || !product) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the WhatsApp message
    const message = `Olá ModaFlex! Meu nome é *${formData.name}*.
    
Gostaria de encomendar o produto:
🛍️ *${product.name}*
💰 Preço: ${product.price} KZ
    
📧 Email: ${formData.email}
📞 Contato: ${formData.phone}
    
Aguardo confirmação!`;

    // Encode and redirect
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Close modal after slight delay or immediately
    onClose();
    setFormData({ name: '', email: '', phone: '' }); // Reset form
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-darkCard rounded-2xl shadow-2xl transform transition-all scale-100">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Finalizar Encomenda
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Product Summary */}
        <div className="p-6 bg-gray-50 dark:bg-black/20 flex items-center gap-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
          />
          <div>
             <p className="text-sm text-primary font-medium">{product.category}</p>
             <p className="font-bold text-gray-900 dark:text-white">{product.name}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Telefone / WhatsApp
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="+244 9..."
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkBg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-4 rounded-lg font-bold shadow-lg transform transition hover:-translate-y-1"
          >
            <MessageCircle className="w-5 h-5" />
            Confirmar no WhatsApp
          </button>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
            Ao clicar, você será redirecionado para o WhatsApp da loja.
          </p>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;