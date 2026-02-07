import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: string[];
  onRemoveItem: (index: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem }) => {
  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    const itemsList = items.map(item => `- ${item}`).join('\n');
    const text = `مرحباً، أريد طلب المجموعة التالية:\n\n${itemsList}\n\nيرجى تأكيد الأسعار والأحجام المتاحة.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-center items-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-charcoal/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-slide-up">
        
        {/* Header */}
        <div className="bg-brand-ivory p-5 border-b border-brand-border flex justify-between items-center">
          <h2 className="text-brand-charcoal font-bold text-lg flex items-center gap-2">
            <span className="w-2 h-6 bg-brand-gold rounded-full"></span>
            سلة المشتريات ({items.length})
          </h2>
          <button onClick={onClose} className="p-2 text-brand-gray hover:text-brand-charcoal hover:bg-brand-border/30 rounded-full transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-white">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="w-16 h-16 bg-brand-ivory rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-brand-gray">السلة فارغة حالياً</p>
              <button 
                onClick={onClose}
                className="mt-2 text-brand-gold font-bold text-sm hover:underline"
              >
                تصفح العطور
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-brand-ivory p-4 rounded-xl border border-brand-border/30">
                <span className="text-brand-charcoal font-medium">{item}</span>
                <button 
                  onClick={() => onRemoveItem(index)}
                  className="text-red-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-brand-border bg-brand-ivory">
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className={`w-full py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all duration-300 shadow-lg ${
              items.length === 0 
                ? 'bg-brand-grayLight/20 text-brand-grayLight cursor-not-allowed shadow-none' 
                : 'bg-brand-charcoal text-white hover:bg-black hover:shadow-xl shadow-brand-charcoal/20'
            }`}
          >
            <span>إتمام الطلب عبر واتساب</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};