import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <img 
          src="https://picsum.photos/id/325/1920/600" 
          alt="ModaFlex Banner" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          Estilo que define <span className="text-primary">você</span>.
        </h1>
        <p className="mt-4 text-xl text-gray-300 max-w-2xl">
          Explore nossa nova coleção de roupas, calçados e acessórios. 
          Qualidade premium com entrega rápida.
        </p>
        <div className="mt-8">
          <a 
            href="#products"
            className="inline-block bg-primary hover:bg-primaryDark text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:-translate-y-1"
          >
            Ver Coleção
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;