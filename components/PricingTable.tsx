import React from 'react';
import { Price } from '../types';

interface PricingTableProps {
  prices: Price[];
  categoryName: string;
}

export const PricingTable: React.FC<PricingTableProps> = ({ prices, categoryName }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10 animate-fade-in">
      <div className="bg-white rounded-[24px] shadow-card border border-brand-gold/10 overflow-hidden relative">
        
        {/* Decorative header line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-goldLight via-brand-gold to-brand-goldLight" />
        
        <div className="p-6 md:p-8 text-center">
          <h3 className="text-brand-charcoal font-bold text-xl mb-1">{categoryName}</h3>
          <p className="text-brand-grayLight text-sm mb-6">قائمة الأسعار والأحجام المتوفرة</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-4">
            {prices.map((price, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center p-3 rounded-2xl bg-brand-ivory border border-brand-border/50 transition-all hover:border-brand-gold/30 hover:shadow-sm"
              >
                <span className="text-brand-gray text-xs mb-1 font-medium">
                  {price.size} {price.label && `(${price.label})`}
                </span>
                <span className="text-brand-gold font-bold text-lg font-sans">
                  {price.price} <span className="text-xs text-brand-charcoal/60 font-normal">ج.م</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};