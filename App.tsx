import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, WHATSAPP_NUMBER } from './constants';
import { ProductCard, Badge } from './components/ProductCard';
import { PricingTable } from './components/PricingTable';
import { PerfumeIcon } from './components/PerfumeIcon';
import { CartDrawer } from './components/CartDrawer';
import { SmartRecommender } from './components/SmartRecommender';
import { ProductDetailsModal } from './components/ProductDetailsModal';

export function App() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false);
  
  // State for selected product details
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Derive badge lists from initial data
  const { bestSellersSet, hqSet, premiumSet } = useMemo(() => {
    const bestSellers = new Set(CATEGORIES.find(c => c.id === 'best-sellers')?.items || []);
    
    const hq = new Set([
      ...(CATEGORIES.find(c => c.id === 'men-hq')?.items || []),
      ...(CATEGORIES.find(c => c.id === 'women-hq')?.items || [])
    ]);

    const premium = new Set(CATEGORIES.find(c => c.id === 'oud')?.items || []);

    return { bestSellersSet: bestSellers, hqSet: hq, premiumSet: premium };
  }, []);

  const getBadges = (itemName: string): Badge[] => {
    const badges: Badge[] = [];
    if (bestSellersSet.has(itemName)) {
      badges.push({ text: 'الأكثر طلباً 🔥', type: 'trending' });
    }
    if (hqSet.has(itemName)) {
      badges.push({ text: '⭐⭐⭐⭐⭐', type: 'hq' });
    }
    if (premiumSet.has(itemName)) {
      badges.push({ text: '💎 فاخر', type: 'premium' });
    }
    return badges;
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter items based on search and active category
  const activeCategoryData = CATEGORIES.find(c => c.id === activeCategory);
  
  const displayItems = useMemo(() => {
    if (!searchQuery) return activeCategoryData?.items || [];
    return activeCategoryData?.items.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  }, [activeCategoryData, searchQuery]);

  const handleWhatsAppOrder = (itemName?: string) => {
    const text = itemName 
      ? `مرحباً، أريد طلب عطر: ${itemName}`
      : `مرحبا، اريد الاستفسار عن العطور لديكم`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const addToCart = (item: string) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleProductClick = (item: string) => {
    setSelectedProduct(item);
  };

  return (
    <div className="min-h-screen font-sans text-brand-charcoal selection:bg-brand-gold/30 selection:text-brand-charcoal">
      
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          <div className="flex items-center gap-3">
             <div className="relative">
                <div className="absolute inset-0 bg-brand-gold blur opacity-20 rounded-full"></div>
                <div className="w-10 h-10 bg-brand-charcoal rounded-full flex items-center justify-center text-white relative z-10 shadow-lg border-2 border-brand-gold/50">
                   <PerfumeIcon className="w-5 h-5 text-brand-gold fill-current" />
                </div>
             </div>
             <div className={`flex flex-col transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-100 md:opacity-100'}`}>
                <h1 className="text-xl font-bold text-brand-charcoal tracking-wide leading-none">كـنـزي</h1>
                <span className="text-[10px] text-brand-gold font-bold tracking-[0.2em] uppercase">للعطور</span>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-white/80 hover:bg-brand-ivory rounded-full transition-all border border-brand-border/50 shadow-sm group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-charcoal group-hover:text-brand-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-charcoal text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-fade-in shadow-md">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemoveItem={removeFromCart} 
      />

      {/* Smart Recommender Wizard */}
      <SmartRecommender 
        isOpen={isRecommenderOpen} 
        onClose={() => setIsRecommenderOpen(false)} 
      />

      {/* Product Details Modal */}
      {selectedProduct && activeCategoryData && (
        <ProductDetailsModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          productName={selectedProduct}
          categoryName={activeCategoryData.name}
          prices={activeCategoryData.prices}
        />
      )}

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-brand-beige">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-goldLight/20 to-transparent"></div>
           <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"></div>
           {/* You can replace this URL with a high-key, bright perfume image */}
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto animate-fade-in pt-12">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold tracking-widest mb-4 border border-brand-gold/20">
            أصالة • فخامة • تميز
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-charcoal mb-6 leading-tight">
            عطرك هو <span className="text-brand-gold relative inline-block">
              بصمتك
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-gold/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-brand-gray text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light">
            اكتشف تشكيلة مختارة من أرقى العطور العالمية والشرقية، مصممة لتناسب ذوقك الرفيع وتدوم طويلاً.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group shadow-float rounded-full">
            <input
              type="text"
              placeholder="ابحثي عن عطرك المفضل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-transparent focus:border-brand-gold/30 text-brand-charcoal h-14 pr-6 pl-14 rounded-full focus:outline-none transition-all placeholder-brand-gray/50 text-base shadow-sm"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold bg-brand-ivory p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-[70px] z-40 bg-white/90 backdrop-blur-md border-b border-brand-border/50 py-4 shadow-sm">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex justify-start md:justify-center gap-3 min-w-max px-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap border ${
                  activeCategory === cat.id
                    ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-lg transform scale-105'
                    : 'bg-white text-brand-gray border-brand-border hover:border-brand-gold hover:text-brand-gold'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <main className="container mx-auto px-4 py-12 min-h-[600px] bg-brand-ivory rounded-t-[40px] -mt-6 relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
        {activeCategoryData && (
          <div className="animate-fade-in max-w-7xl mx-auto">
            
            {/* Pricing Table */}
            {activeCategoryData.prices.length > 0 && displayItems.length > 0 && (
               <PricingTable prices={activeCategoryData.prices} categoryName={activeCategoryData.name} />
            )}

            {/* Section Title */}
            <div className="flex items-center gap-4 mb-8 mt-12">
               <h2 className="text-2xl font-bold text-brand-charcoal">
                 قائمة العطور
               </h2>
               <div className="h-px bg-brand-border flex-1"></div>
               <span className="text-brand-grayLight text-sm font-medium bg-white px-3 py-1 rounded-full border border-brand-border">
                 {displayItems.length} عطر
               </span>
            </div>

            {/* Empty State */}
            {displayItems.length === 0 && (
              <div className="text-center py-24 opacity-60">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl text-brand-gray">لا توجد نتائج مطابقة لبحثك</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-brand-gold font-bold underline"
                >
                  عرض جميع العطور
                </button>
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
              {displayItems.map((item, index) => (
                <ProductCard 
                  key={`${activeCategory}-${index}`} 
                  name={item} 
                  categoryName={activeCategoryData.name}
                  badges={getBadges(item)}
                  onClick={() => handleProductClick(item)}
                  onAddToCart={() => addToCart(item)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-brand-border pt-16 pb-24">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-brand-charcoal text-white rounded-full flex items-center justify-center mb-2">
              <PerfumeIcon className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-brand-charcoal">كنزي</h2>
            <span className="text-xs text-brand-gold tracking-[0.3em] uppercase font-bold">للعطور الفاخرة</span>
          </div>
          
          <div className="w-24 h-1 bg-brand-gold/30 mx-auto rounded-full mb-8"></div>
          
          <p className="text-brand-gray text-sm mb-8 max-w-md mx-auto leading-relaxed">
            نقدم لكم أفضل العطور المستوحاة من الماركات العالمية بجودة عالية وثبات يدوم طويلاً.
          </p>
          
          <p className="text-brand-grayLight text-sm">
            جميع الحقوق محفوظة © {new Date().getFullYear()} كنزي للعطور
          </p>

          <a 
             href="https://wa.me/201067890109?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A7%D8%B1%D9%8A%D8%AF%20%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D9%85%D9%88%D9%82%D8%B9%20%D9%85%D8%AB%D9%84%20%D9%85%D9%88%D9%82%D8%B9%20%D8%A7%D9%84%D8%B9%D8%B7%D9%88%D8%B1"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-block mt-4 text-xs text-brand-grayLight/60 hover:text-brand-gold transition-colors duration-300 border-b border-transparent hover:border-brand-gold/50 pb-0.5"
          >
             تصميم و برمجة بواسطة يوسف أسامه
          </a>
        </div>
      </footer>

      {/* Recommender Floating Button (Bottom Left) */}
      <button 
        onClick={() => setIsRecommenderOpen(true)}
        className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[49] bg-brand-charcoal text-white pl-4 pr-5 py-3 rounded-full shadow-float hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border border-brand-gold/30 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-10 transition-opacity"></div>
        <span className="text-2xl animate-pulse">✨</span>
        <div className="flex flex-col items-start">
           <span className="text-[10px] text-brand-gold font-bold leading-none mb-0.5">مش عارف تختار؟</span>
           <span className="text-sm font-bold leading-none">رشحلي عطر</span>
        </div>
      </button>

      {/* Floating WhatsApp Button (Bottom Right) */}
      <button 
        onClick={() => handleWhatsAppOrder()}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[49] bg-white text-brand-gold p-4 rounded-full shadow-float hover:scale-110 hover:shadow-lg transition-all duration-300 flex items-center justify-center border border-brand-gold/10 group"
        aria-label="Order via WhatsApp"
      >
        <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-10 rounded-full transition-opacity"></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </button>

    </div>
  );
}