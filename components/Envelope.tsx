
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
    // Delay the main App transition until the card has slid up
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF9F6] overflow-hidden"
    >
      {/* Background Watercolor Pools */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#98C1D9] rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#E0E7FF] rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-50" />
      </div>

      <div className="relative w-full max-w-md aspect-[4/3] flex flex-col items-center justify-center scale-90 sm:scale-100">

        {/* ENVELOPE CONTAINER */}
        <div className="relative w-80 h-56 sm:w-96 sm:h-64 cursor-pointer group" onClick={!isOpen ? handleOpenClick : undefined}>

          {/* 1. BACK OF ENVELOPE */}
          <div className="absolute inset-0 bg-[#293241] rounded-sm shadow-2xl" />

          {/* 2. THE INVITATION CARD (Inside) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isOpen ? { y: -160, zIndex: 40 } : { y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "backOut" }}
            className="absolute inset-x-6 top-6 bottom-6 bg-white shadow-2xl rounded-sm p-8 flex flex-col items-center justify-center text-center z-10 border border-gray-50"
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#3D5A80] font-bold mb-3 relative z-10">Save The Date</span>
            <h2 className="font-serif text-3xl text-[#3D5A80] mb-3 relative z-10 ink-bleed">Bilal & Sandika</h2>
            <div className="w-12 h-px bg-[#98C1D9] mb-5 relative z-10" />
            <p className="text-[11px] text-[#4A6982] font-semibold italic relative z-10">The celebration begins soon</p>
          </motion.div>

          {/* 3. FRONT COVER (V-Shape) */}
          <div
            className="absolute inset-0 z-30"
            style={{
              clipPath: 'polygon(0 0, 0% 100%, 100% 100%, 100% 0, 50% 55%)',
              backgroundColor: '#3D5A80',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)'
            }}
          />

          {/* 4. FLAP (Top Part) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              transformOrigin: 'top',
              perspective: '1200px',
              zIndex: isOpen ? 5 : 50
            }}
            className="absolute inset-x-0 top-0 h-1/2"
          >
            <div
              className="w-full h-full bg-[#34445c] shadow-lg"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* WAX SEAL */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  exit={{ opacity: 0, scale: 0.3, rotate: 45 }}
                  className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-[#98C1D9] rounded-full shadow-2xl flex items-center justify-center border-2 border-[#3D5A80] hover:scale-110 transition-transform"
                >
                  <Heart size={24} fill="#3D5A80" className="text-[#3D5A80]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* OPEN BUTTON (Instruction) */}
          {!isOpen && (
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#3D5A80] text-white px-10 py-4 rounded-full flex items-center gap-3 shadow-[0_20px_40px_rgba(41,50,65,0.3)] font-bold group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <MailOpen size={20} className="group-hover:rotate-12 transition-transform" />
                Buka Undangan
              </motion.button>
            </div>
          )}
        </div>
        <div className="mt-10 p-10 px-5">
          <div className="mt-8   space-y-1">
            <p className="mt-10 text-[10px] text-[#3D5A80]/40 uppercase tracking-[0.4em] font-bold text-center">Special Invitation For You</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Envelope;
