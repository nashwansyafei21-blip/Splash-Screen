/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Plane, ArrowLeft, MapPin, Quote } from 'lucide-react';

type ViewState = 'splash' | 'food' | 'travel';

const THEME = {
  bg: 'bg-[#F7F6F2]',
  card: 'bg-white',
  primary: 'text-[#5A5A40]',
  secondary: 'text-[#8C8C8C]',
  accent: 'bg-[#5A5A40]',
  accentText: 'text-white',
  highlight: 'bg-[#F1F0EA]',
  border: 'border-[#E9E7E0]',
};

export default function App() {
  const [view, setView] = useState<ViewState>('splash');

  useEffect(() => {
    if (view === 'splash') {
      const timer = setTimeout(() => {
        setView('food');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  return (
    <div className={`min-h-screen ${THEME.bg} flex justify-center items-center font-sans p-4`}>
      {/* Mobile Frame Container */}
      <div className="w-full max-w-[400px] aspect-[9/19] bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col border-[8px] border-[#3D3D3D] rounded-[3rem]">
        <div className="absolute top-0 w-full h-8 flex justify-center items-center z-50">
          <div className="w-20 h-5 bg-[#3D3D3D] rounded-b-2xl shadow-inner"></div>
        </div>
        
        <AnimatePresence mode="wait">
          {view === 'splash' && <SplashView key="splash" />}
          {view === 'food' && <FoodView key="food" onNavigate={() => setView('travel')} />}
          {view === 'travel' && <TravelView key="travel" onBack={() => setView('food')} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SplashView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 bg-[#FDFCF9] flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-48 h-48 flex items-center justify-center mb-8 drop-shadow-xl"
      >
        <img 
          src="/input_file_1.png" 
          alt="UPNVJ Logo" 
          className="w-full h-full object-contain"
        />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-[#006400] font-black text-2xl tracking-tighter mb-1">UPN VETERAN</h2>
        <p className="text-[#006400]/60 font-bold tracking-[0.3em] text-sm uppercase">Jakarta</p>
      </motion.div>
    </motion.div>
  );
}

function FoodView({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="flex-1 flex flex-col p-6 overflow-y-auto mt-6"
    >
      <h1 className={`${THEME.primary} text-2xl font-black text-center mb-6 tracking-tight`}>
        Makanan Favorit Saya
      </h1>

      <div className="relative mb-6">
        <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white">
          <img 
            src="/input_file_2.jpeg" 
            alt="Dimsum" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-4 right-4 w-16 h-16 rounded-2xl border-4 border-white overflow-hidden shadow-xl transform rotate-3">
          <img 
            src="/input_file_3.jpeg" 
            alt="My Photo" 
            className="w-full h-full object-cover bg-gray-100"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div className={`${THEME.highlight} p-4 rounded-2xl border ${THEME.border} space-y-2`}>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Nama Makanan</span>
            <span className={`font-black ${THEME.primary}`}>Dimsum Ayam Udang</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Asal Makanan</span>
            <span className={`font-black ${THEME.primary}`}>Guangdong, Tiongkok</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Harga</span>
            <span className="font-black text-emerald-700">Rp 35.000,-</span>
          </div>
        </div>

        <div className="relative">
          <Quote className="absolute -top-2 -left-2 text-[#D4D1C5] opacity-50" size={24} />
          <p className="text-[#4A4A4A] text-sm leading-relaxed italic pl-4 pt-2">
            Saya sangat menyukai dimsum karena teksturnya yang kenyal dan rasa gurih yang meledak di setiap gigitannya. Keunikannya terletak pada teknik <span className="font-bold">steaming</span> yang menjaga nutrisi serta keragaman isiannya yang tidak terbatas.
          </p>
        </div>

        <button
          onClick={onNavigate}
          className={`w-full mt-auto ${THEME.accent} ${THEME.accentText} rounded-xl py-4 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:brightness-90 shadow-lg shadow-gray-200 transition-all active:scale-[0.98]`}
        >
          Destinasi Wisata Impian
          <Plane size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function TravelView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="flex-1 flex flex-col overflow-y-auto mt-6"
    >
      <div className="px-6 pb-4">
        <h1 className={`${THEME.primary} text-2xl font-black text-center mb-6 tracking-tight`}>
          Destinasi Wisata Impian
        </h1>
        
        <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-lg border-4 border-white mb-6">
          <img 
            src="/input_file_0.jpeg" 
            alt="Tokyo Skyline" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-[#8C8C8C] font-black">Nama Wisata</label>
              <div className={`${THEME.highlight} p-3 rounded-xl border ${THEME.border} font-bold ${THEME.primary}`}>
                Gunung Fuji & Tokyo Skyline
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-[#8C8C8C] font-black">Letak Lokasi</label>
              <div className="flex items-center gap-2 font-bold text-gray-700">
                <MapPin size={14} className="text-rose-500" />
                Honshu, Jepang
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-[#8C8C8C] font-black">Keunikan</label>
              <p className="text-sm text-[#4A4A4A] leading-relaxed bg-white/50 p-4 rounded-2xl border border-dashed border-[#D4D1C5]">
                Kontras antara puncak gunung bersalju yang tenang dengan hiruk-pikuk metropolis Tokyo yang futuristik. Keindahannya selalu berubah setiap musim, mulai dari Sakura di musim semi hingga salju tebal di musim dingin.
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className={`w-full border-2 border-[#5A5A40] text-[#5A5A40] rounded-xl py-4 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#5A5A40] hover:text-white transition-all active:scale-[0.98] mt-6 mb-8`}
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
        </div>
      </div>
    </motion.div>
  );
}

