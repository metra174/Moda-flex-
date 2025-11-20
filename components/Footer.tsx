import React from 'react';
import { Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <div className="flex flex-col justify-center md:justify-start">
              <span className="text-xl font-bold text-gray-900 dark:text-white leading-none">
                Moda<span className="text-primary">Flex</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">
                Edivina Company
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          <div className="md:text-right">
             <button 
               onClick={onOpenAdmin}
               className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
             >
               <ShieldCheck className="w-3 h-3" />
               Área Administrativa
             </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;