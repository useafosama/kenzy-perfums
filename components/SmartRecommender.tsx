import React, { useState } from 'react';
import { WHATSAPP_NUMBER, PERFUME_DB } from '../constants';
import { PerfumeIcon } from './PerfumeIcon';

interface SmartRecommenderProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'gender' | 'intensity' | 'season' | 'price' | 'results';

interface Preferences {
  gender: 'men' | 'women';
  intensity: 'light' | 'medium' | 'strong';
  season: 'summer' | 'winter' | 'all';
  price: 'economic' | 'medium' | 'luxury';
}

export const SmartRecommender: React.FC<SmartRecommenderProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('gender');
  const [prefs, setPrefs] = useState<Preferences>({
    gender: 'men',
    intensity: 'medium',
    season: 'all',
    price: 'medium'
  });
  const [recommendations, setRecommendations] = useState<Array<{name: string, reason: string}>>([]);

  if (!isOpen) return null;

  const handleSelection = (key: keyof Preferences, value: any) => {
    const newPrefs = { ...prefs, [key]: value };
    setPrefs(newPrefs);

    // Advance Step
    if (key === 'gender') setStep('intensity');
    else if (key === 'intensity') setStep('season');
    else if (key === 'season') setStep('price');
    else if (key === 'price') {
      calculateRecommendations(newPrefs);
      setStep('results');
    }
  };

  const calculateRecommendations = (finalPrefs: Preferences) => {
    // Scoring Algorithm
    const scores = Object.entries(PERFUME_DB).map(([name, data]) => {
      let score = 0;
      
      // Gender (Critical)
      if (data.gender.includes(finalPrefs.gender) || (data.gender.includes('men') && data.gender.includes('women'))) {
        score += 10;
      } else {
        score -= 100; // Filter out wrong gender
      }

      // Intensity
      if (data.intensity.includes(finalPrefs.intensity)) score += 5;

      // Season
      if (data.season.includes(finalPrefs.season)) score += 5;

      // Price
      if (data.price.includes(finalPrefs.price)) score += 3;

      return { name, reason: data.reason, score };
    });

    // Sort by score and take top 3
    const top3 = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => ({ name: item.name, reason: item.reason }));
      
    setRecommendations(top3);
  };

  const resetWizard = () => {
    setStep('gender');
    setRecommendations([]);
  };

  const handleOrder = (perfumeName: string) => {
    const text = `مرحباً، الـ AI رشحلي عطر "${perfumeName}"، ممكن تفاصيل الأسعار والطلب؟`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[70] flex justify-center items-center p-4">
      <div className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-md animate-fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col min-h-[400px] animate-slide-up border border-brand-gold/20">
        
        {/* Header */}
        <div className="bg-brand-ivory p-6 border-b border-brand-border flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
              <span className="text-2xl">✨</span>
              مرشد العطور الذكي
            </h2>
            {step !== 'results' && (
               <p className="text-brand-gray text-xs mt-1">جاوب وهنختارلك الأنسب</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 text-brand-gray hover:text-brand-charcoal bg-white rounded-full border border-brand-border hover:border-brand-gold transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          
          {step === 'gender' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-center text-xl font-bold text-brand-charcoal mb-4">لمن العطر؟</h3>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleSelection('gender', 'men')} className="p-6 rounded-2xl border-2 border-brand-border hover:border-brand-gold hover:bg-brand-ivory transition-all group text-center">
                  <div className="text-4xl mb-3">👨</div>
                  <div className="font-bold text-brand-charcoal group-hover:text-brand-gold">رجالي</div>
                </button>
                <button onClick={() => handleSelection('gender', 'women')} className="p-6 rounded-2xl border-2 border-brand-border hover:border-brand-gold hover:bg-brand-ivory transition-all group text-center">
                  <div className="text-4xl mb-3">👩</div>
                  <div className="font-bold text-brand-charcoal group-hover:text-brand-gold">حريمي</div>
                </button>
              </div>
            </div>
          )}

          {step === 'intensity' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-center text-xl font-bold text-brand-charcoal mb-4">كيف تفضل قوة العطر؟</h3>
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => handleSelection('intensity', 'light')} className="p-4 rounded-xl border border-brand-border hover:border-brand-gold hover:bg-brand-ivory text-right px-6 transition-all flex justify-between items-center group">
                  <span className="font-bold text-brand-charcoal group-hover:text-brand-gold">هادي وناعم</span>
                  <span className="text-2xl">🍃</span>
                </button>
                <button onClick={() => handleSelection('intensity', 'medium')} className="p-4 rounded-xl border border-brand-border hover:border-brand-gold hover:bg-brand-ivory text-right px-6 transition-all flex justify-between items-center group">
                  <span className="font-bold text-brand-charcoal group-hover:text-brand-gold">متوسط وموزون</span>
                  <span className="text-2xl">⚖️</span>
                </button>
                <button onClick={() => handleSelection('intensity', 'strong')} className="p-4 rounded-xl border border-brand-border hover:border-brand-gold hover:bg-brand-ivory text-right px-6 transition-all flex justify-between items-center group">
                  <span className="font-bold text-brand-charcoal group-hover:text-brand-gold">فواح وقوي</span>
                  <span className="text-2xl">🔥</span>
                </button>
              </div>
            </div>
          )}

          {step === 'season' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-center text-xl font-bold text-brand-charcoal mb-4">متى ستستخدم العطر؟</h3>
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => handleSelection('season', 'summer')} className="p-4 rounded-xl border border-brand-border hover:border-brand-gold hover:bg-brand-ivory text-right px-6 transition-all flex justify-between items-center group">
                  <span className="font-bold text-brand-charcoal group-hover:text-brand-gold">صيفي ومنعش</span>
                  <span className="text-2xl">☀️</span>
                </button>
                <button onClick={() => handleSelection('season', 'winter')} className="p-4 rounded-xl border border-brand-border hover:border-brand-gold hover:bg-brand-ivory text-right px-6 transition-all flex justify-between items-center group">
                  <span className="font-bold text-brand-charcoal group-hover:text-brand-gold">شتوي ودافئ</span>
                  <span className="text-2xl">❄️</span>
                </button>
                <button onClick={() => handleSelection('season', 'all')} className="p-4 rounded-xl border border-brand-border hover:border-brand-gold hover:bg-brand-ivory text-right px-6 transition-all flex justify-between items-center group">
                  <span className="font-bold text-brand-charcoal group-hover:text-brand-gold">جوكر (كل المواسم)</span>
                  <span className="text-2xl">🌍</span>
                </button>
              </div>
            </div>
          )}

          {step === 'price' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-center text-xl font-bold text-brand-charcoal mb-4">الميزانية المناسبة؟</h3>
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => handleSelection('price', 'economic')} className="p-4 rounded-xl border border-brand-border hover:border-brand-gold hover:bg-brand-ivory text-right px-6 transition-all flex justify-between items-center group">
                  <span className="font-bold text-brand-charcoal group-hover:text-brand-gold">اقتصادي (Standard)</span>
                  <span className="text-2xl">💰</span>
                </button>
                <button onClick={() => handleSelection('price', 'medium')} className="p-4 rounded-xl border border-brand-border hover:border-brand-gold hover:bg-brand-ivory text-right px-6 transition-all flex justify-between items-center group">
                  <span className="font-bold text-brand-charcoal group-hover:text-brand-gold">متوسط (High Quality)</span>
                  <span className="text-2xl">💎</span>
                </button>
                <button onClick={() => handleSelection('price', 'luxury')} className="p-4 rounded-xl border border-brand-border hover:border-brand-gold hover:bg-brand-ivory text-right px-6 transition-all flex justify-between items-center group">
                  <span className="font-bold text-brand-charcoal group-hover:text-brand-gold">فاخر (Premium/Oud)</span>
                  <span className="text-2xl">👑</span>
                </button>
              </div>
            </div>
          )}

          {step === 'results' && (
            <div className="space-y-4 animate-slide-up">
              <div className="text-center mb-2">
                 <h3 className="text-xl font-bold text-brand-gold">✨ أفضل الترشيحات لك ✨</h3>
              </div>
              
              <div className="space-y-3">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-brand-ivory rounded-xl p-4 border border-brand-border flex items-start gap-3 hover:border-brand-gold/30 transition-all">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <PerfumeIcon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-brand-charcoal">{rec.name}</h4>
                      <p className="text-xs text-brand-gray mt-1 leading-relaxed">{rec.reason}</p>
                    </div>
                    <button 
                      onClick={() => handleOrder(rec.name)}
                      className="bg-brand-gold text-white p-2 rounded-full hover:bg-brand-charcoal transition-colors shadow-md self-center"
                      title="اطلب عبر واتساب"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 text-center">
                <button 
                  onClick={resetWizard}
                  className="text-brand-grayLight text-sm hover:text-brand-gold underline decoration-1"
                >
                  إعادة الاختيار
                </button>
              </div>
            </div>
          )}

        </div>
        
        {/* Progress Bar */}
        {step !== 'results' && (
           <div className="bg-gray-100 h-1.5 w-full">
              <div 
                className="bg-brand-gold h-full transition-all duration-300" 
                style={{ width: step === 'gender' ? '25%' : step === 'intensity' ? '50%' : step === 'season' ? '75%' : '90%' }} 
              />
           </div>
        )}
      </div>
    </div>
  );
};