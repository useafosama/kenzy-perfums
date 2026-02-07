import React, { useMemo } from 'react';
import { Price } from '../types';
import { PerfumeIcon } from './PerfumeIcon';
import { getPerfumeDetails, WHATSAPP_NUMBER } from '../constants';

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  categoryName: string;
  prices: Price[];
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  productName,
  categoryName,
  prices 
}) => {
  const details = useMemo(() => getPerfumeDetails(productName), [productName]);

  if (!isOpen) return null;

  const handleOrder = () => {
    const text = `مرحباً، أريد طلب عطر: ${productName}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const getScentLabel = (type: string) => {
    const map: Record<string, string> = {
      fresh: 'منعش / Fresh',
      sweet: 'سكري / Sweet',
      woody: 'خشبي / Woody',
      oriental: 'شرقي / Oriental',
      floral: 'زهري / Floral',
      fruity: 'فواكه / Fruity'
    };
    return map[type] || type;
  };

  const getSuitableLabel = (type: string) => {
    const map: Record<string, string> = {
      work: 'العمل',
      dates: 'المناسبات',
      outings: 'الخروجات',
      night: 'سهرات',
      summer: 'الصيف'
    };
    return map[type] || type;
  };

  // Helper for Bars
  const LongevityBar = ({ level }: { level: string }) => {
    let width = '25%';
    let text = 'ضعيف';
    let color = 'bg-red-400';

    if (level === 'medium') { width = '50%'; text = 'متوسط'; color = 'bg-yellow-400'; }
    if (level === 'long') { width = '75%'; text = 'ثابت'; color = 'bg-green-400'; }
    if (level === 'eternal') { width = '100%'; text = 'ثابت جداً'; color = 'bg-purple-500'; }

    return (
      <div className="w-full">
        <div className="flex justify-between text-xs mb-1 font-bold text-brand-gray">
          <span>الثبات</span>
          <span>{text}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full ${color} transition-all duration-1000`} style={{ width }}></div>
        </div>
      </div>
    );
  };

  const ProjectionBar = ({ level }: { level: string }) => {
    let width = '33%';
    let text = 'هادي';
    let color = 'bg-blue-300';

    if (level === 'moderate') { width = '66%'; text = 'ملحوظ'; color = 'bg-blue-400'; }
    if (level === 'strong') { width = '100%'; text = 'فواح'; color = 'bg-blue-600'; }

    return (
      <div className="w-full">
        <div className="flex justify-between text-xs mb-1 font-bold text-brand-gray">
          <span>الفوحان</span>
          <span>{text}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full ${color} transition-all duration-1000`} style={{ width }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[80] flex justify-center items-center p-4">
      <div 
        className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        
        {/* Header Image Area */}
        <div className="bg-brand-beige h-32 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -bottom-8 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
             <PerfumeIcon className="w-12 h-12 text-brand-gold" />
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-all text-brand-charcoal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 pt-12 overflow-y-auto custom-scrollbar">
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-brand-charcoal mb-1">{productName}</h2>
            <span className="inline-block px-3 py-1 bg-brand-ivory border border-brand-border rounded-full text-xs text-brand-grayLight font-bold tracking-widest uppercase">
              {categoryName}
            </span>
            {details.reason && (
               <p className="mt-3 text-sm text-brand-gray leading-relaxed max-w-xs mx-auto">
                 "{details.reason}"
               </p>
            )}
          </div>

          <div className="space-y-6">
            
            {/* Attributes Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-brand-ivory p-3 rounded-xl border border-brand-border/50 text-center">
                <span className="block text-[10px] text-brand-grayLight uppercase font-bold mb-1">نوع الرائحة</span>
                <span className="font-bold text-brand-charcoal text-sm">{getScentLabel(details.scentType)}</span>
              </div>
              <div className="bg-brand-ivory p-3 rounded-xl border border-brand-border/50 text-center">
                <span className="block text-[10px] text-brand-grayLight uppercase font-bold mb-1">الموسم</span>
                <span className="font-bold text-brand-charcoal text-sm flex gap-1 justify-center">
                  {details.season.map(s => (s === 'summer' ? '☀️' : s === 'winter' ? '❄️' : '🌍')).join(' ')}
                  {details.season.includes('all') ? 'كل المواسم' : details.season.includes('summer') ? 'صيفي' : 'شتوي'}
                </span>
              </div>
            </div>

            {/* Tags for Suitable For */}
            <div>
              <span className="block text-xs font-bold text-brand-gray mb-2">مناسب لـ:</span>
              <div className="flex flex-wrap gap-2">
                {details.suitableFor.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white border border-brand-gold/30 text-brand-charcoal text-xs rounded-lg shadow-sm">
                    {getSuitableLabel(tag)}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Bars */}
            <div className="space-y-3 bg-white border border-brand-border rounded-xl p-4 shadow-sm">
              <LongevityBar level={details.longevity} />
              <ProjectionBar level={details.projection} />
            </div>

            {/* Pricing */}
            <div className="bg-brand-charcoal text-white rounded-2xl p-5 shadow-lg">
              <h3 className="text-center font-bold text-brand-gold mb-4 border-b border-white/10 pb-2">قائمة الأسعار</h3>
              <div className="space-y-2">
                {prices.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300 font-medium">{p.size} {p.label && `(${p.label})`}</span>
                    <span className="font-bold text-lg text-brand-gold">{p.price} <span className="text-xs text-white/60">ج.م</span></span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* Sticky Footer Button */}
        <div className="p-4 border-t border-brand-border bg-white sticky bottom-0">
          <button 
            onClick={handleOrder}
            className="w-full py-3.5 bg-brand-gold hover:bg-brand-charcoal text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
          >
            <span>اطلب الآن عبر واتساب</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};
