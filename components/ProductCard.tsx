import React from 'react';
import { PerfumeIcon } from './PerfumeIcon';

export interface Badge {
  text: string;
  type: 'trending' | 'hq' | 'premium';
}

interface ProductCardProps {
  name: string;
  categoryName?: string; // Optional for display in card
  badges?: Badge[];
  onClick: () => void;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, categoryName, badges = [], onClick, onAddToCart }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-[20px] p-6 flex flex-col items-center justify-between gap-4 transition-all duration-500 hover:shadow-soft border border-brand-border/40 hover:border-brand-gold/30 cursor-pointer overflow-hidden animate-slide-up h-full min-h-[180px]"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-20">
        {badges.map((badge, idx) => (
          <span 
            key={idx} 
            className={`
              px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm backdrop-blur-sm flex items-center gap-1
              ${badge.type === 'trending' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' : ''}
              ${badge.type === 'hq' ? 'bg-brand-charcoal text-brand-gold border border-brand-gold/20' : ''}
              ${badge.type === 'premium' ? 'bg-slate-900 text-cyan-50 border border-cyan-500/30' : ''}
            `}
          >
            {badge.text}
          </span>
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-brand-beige rounded-bl-[100px] -z-0 opacity-50 group-hover:bg-brand-goldLight/20 transition-colors duration-500" />

      <div className="relative z-10 flex flex-col items-center w-full mt-2">
        <div className="w-14 h-14 mb-3 rounded-full bg-brand-ivory flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-500 shadow-sm">
          <PerfumeIcon className="w-8 h-8" />
        </div>
        
        <h3 className="text-center text-brand-charcoal font-bold text-base md:text-lg leading-snug group-hover:text-brand-gold transition-colors duration-300">
          {name}
        </h3>
        {categoryName && (
           <span className="text-[10px] text-brand-grayLight uppercase tracking-widest mt-1 opacity-80">{categoryName}</span>
        )}
      </div>

      <div className="w-full mt-2 relative z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="w-full py-2.5 rounded-xl border border-brand-gold/20 text-brand-charcoal text-sm font-semibold hover:bg-brand-gold hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>أضف للسلة</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};