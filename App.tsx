
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, VolumeX, Navigation, ChevronDown, Calendar } from 'lucide-react';
import Envelope from './components/Envelope';
import Countdown from './components/Countdown';
import WeddingGift from './components/WeddingGift';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';

// --- STYLISTIC COMPONENTS ---

const WatercolorWash: React.FC<{
  className?: string;
  color?: string;
  size?: string;
  opacity?: number;
  delay?: number;
}> = ({
  className = "",
  color = "#98C1D9",
  size = "500px",
  opacity = 0.12,
  delay = 0
}) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 4, delay, ease: "easeOut" }}
        className={`absolute pointer-events-none rounded-full blur-[80px] mix-blend-multiply ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          filter: 'url(#watercolor-wiggle)'
        }}
      />
    );
  };

const InkSpreadTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <motion.div
    initial={{ filter: 'blur(6px)', opacity: 0 }}
    whileInView={{ filter: 'blur(0.2px)', opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 2, ease: "easeOut" }}
    className={`ink-bleed ${className}`}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const brideImg = 'components/public/img/Bride.jpg';
  const groomImg = 'components/public/img/Groom.jpg';

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log(e));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(e => console.log(e));
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="relative min-h-screen">
      <style>{`
        :root {
          --cream: #FDFBF7;
          --blue-pale: #E0E7FF;
          --blue-primary: #3D5A80;
          --blue-secondary: #98C1D9;
          --blue-dark: #293241;
        }

        body {
          font-family: 'Montserrat', sans-serif;
          background-color: var(--cream);
          color: var(--blue-dark);
          margin: 0;
          overflow-x: hidden;

          /* Solusi 1: Untuk Firefox */
          scrollbar-width: none; 
          /* Solusi 2: Untuk IE and Edge */
          -ms-overflow-style: none; 

        }
          body::-webkit-scrollbar {
          display: none; 
        }
        .watercolor-canvas {
          position: fixed;
          inset: 0;
          z-index: -10;
          min-height: 100vh;
          background: 
            radial-gradient(circle at 15% 15%, var(--blue-pale) 0%, transparent 40%),
            radial-gradient(circle at 85% 85%, #DBEAFE 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, var(--cream) 0%, transparent 100%);
          background-attachment: fixed;
          filter: url(#wet-paper-texture);
        }

        @media (max-width: 768px) {
          .watercolor-canvas {
            background: url('/img/wallpaper.jpg') no-repeat center center;
            background-size: cover;
            filter: none !important;
          }
          .watercolor-wash-hide-mobile {
            display: none !important;
          }
          .ink-bleed {
            filter: none !important;
          }
        }

        .paper-shader { position: relative; }
        .ink-bleed { filter: url(#ink-spread); text-shadow: 0 0 10px rgba(61, 90, 128, 0.15); }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-cursive { font-family: 'Great Vibes', cursive; }

        .watercolor-frame {
          mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' d='M42,-64C54.1,-58.3,63.3,-46.1,68.1,-32.8C72.9,-19.5,73.3,-5.1,70.9,8.7C68.5,22.5,63.3,35.6,54.1,46.1C44.9,56.6,31.7,64.5,17.2,68.9C2.7,73.3,-13.2,74.2,-27.6,69.5C-42,64.8,-54.9,54.5,-63.4,41.4C-71.9,28.3,-76,12.4,-75.4,-3.2C-74.8,-18.8,-69.5,-34.1,-59.4,-45.8C-49.3,-57.5,-34.4,-65.6,-19.7,-68.9C-5,-72.2,9.4,-70.7,23.3,-67.2C37.2,-63.7,42,-64,42,-64Z' transform='translate(100 100)' /%3E%3C/svg%3E");
          mask-size: 100% 100%;
          mask-repeat: no-repeat;
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' d='M42,-64C54.1,-58.3,63.3,-46.1,68.1,-32.8C72.9,-19.5,73.3,-5.1,70.9,8.7C68.5,22.5,63.3,35.6,54.1,46.1C44.9,56.6,31.7,64.5,17.2,68.9C2.7,73.3,-13.2,74.2,-27.6,69.5C-42,64.8,-54.9,54.5,-63.4,41.4C-71.9,28.3,-76,12.4,-75.4,-3.2C-74.8,-18.8,-69.5,-34.1,-59.4,-45.8C-49.3,-57.5,-34.4,-65.6,-19.7,-68.9C-5,-72.2,9.4,-70.7,23.3,-67.2C37.2,-63.7,42,-64,42,-64Z' transform='translate(100 100)' /%3E%3C/svg%3E");
          -webkit-mask-size: 100% 100%;
          -webkit-mask-repeat: no-repeat;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--cream); }
        ::-webkit-scrollbar-thumb { 
          background: var(--blue-secondary); 
          border-radius: 20px;
          border: 2px solid var(--cream);
        }
      `}</style>

      <div className="watercolor-canvas" />

      <AnimatePresence>
        {!isOpened && <Envelope onOpen={handleOpenInvitation} />}
      </AnimatePresence>

      <audio ref={audioRef} loop src="components/public/music/song.mp3" />

      {isOpened && (
        <>
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden watercolor-wash-hide-mobile">
            <WatercolorWash className="-top-40 -left-40" size="800px" color="#98C1D9" opacity={0.15} />
            <WatercolorWash className="top-1/3 -right-40" size="600px" color="#E0E7FF" opacity={0.2} delay={1} />
            <WatercolorWash className="bottom-0 left-1/4" size="900px" color="#F2F0E9" opacity={0.3} delay={2} />
            <WatercolorWash className="bottom-20 right-1/4" size="500px" color="#3D5A80" opacity={0.05} />
          </div>

          <button
            onClick={toggleMusic}
            className="fixed bottom-8 right-8 z-[100] p-4 bg-white/40 backdrop-blur-2xl rounded-full shadow-2xl text-[#3D5A80] border border-white/50 hover:scale-110 active:scale-95 transition-all"
          >
            {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            className="relative z-10 paper-shader"
          >
            {/* HERO */}
            <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center overflow-hidden">
              <div className="relative z-10 space-y-12">
                <span className="uppercase tracking-[0.8em] text-[#3D5A80] text-[10px] font-bold opacity-60">The Wedding Celebration</span>

                <InkSpreadTitle>
                  <h1 className="font-cursive text-7xl md:text-[11rem] text-[#3D5A80] leading-none py-6">
                    Bilal <br /> <span className="text-4xl md:text-6xl font-serif block italic opacity-30 my-4">&</span> Sandika
                  </h1>
                </InkSpreadTitle>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1.5 }}
                  className="space-y-6"
                >
                  <p className="font-serif italic text-2xl text-[#4A6982]">Minggu, 15 Februari 2026</p>
                  <Countdown targetDate="2026-02-15T08:00:00" />
                </motion.div>
              </div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute bottom-12 opacity-30 text-[#3D5A80]"
              >
                <ChevronDown size={32} />
              </motion.div>
            </section>

            {/* QUOTE */}
            <section className="py-24 sm:py-48 px-6 relative">
              <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
                <Heart className="mx-auto text-[#98C1D9] opacity-40" size={32} />
                <InkSpreadTitle>
                  <p className="text-[#3D5A80] italic font-serif text-3xl md:text-5xl leading-relaxed px-6">
                    Di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.
                  </p>
                  <p className="text-[#3D5A80] mt-5 italic font-serif text-3xl md:text-3xl leading-relaxed px-6 opacity-60">
                    "QS. Ar-Rum ayat 21"
                  </p>
                </InkSpreadTitle>
                <div className="w-24 h-px bg-[#3D5A80]/20 mx-auto" />
              </div>
            </section>

            {/* PROFILE */}
            <section className="py-24 sm:py-48 px-6 relative overflow-hidden bg-white/10 backdrop-blur-[1px]">
              <div className="watercolor-wash-hide-mobile">
                <WatercolorWash className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="1000px" color="#FAF9F6" opacity={0.5} />
              </div>
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-32 relative">
                <motion.div
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 50 }}
                  viewport={{ once: true }}
                  className="text-center space-y-12 group"
                >
                  <div className="relative inline-block">
                    <div className="watercolor-wash-hide-mobile">
                      <WatercolorWash className="-top-12 -right-12" size="250px" color="#98C1D9" opacity={0.3} />
                    </div>
                    <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto overflow-hidden shadow-2xl relative z-10 watercolor-frame bg-white/80 p-2 backdrop-blur-sm">
                      <img src={brideImg} className="w-full h-full object-cover transition-all duration-1000 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110" alt="Bride" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <InkSpreadTitle>
                      <h3 className="font-serif text-3xl sm:text-4xl text-[#3D5A80] font-bold">Sandika Dewi Rosalini</h3>
                    </InkSpreadTitle>
                    <p className="text-[#4A6982] font-semibold text-lg uppercase tracking-widest leading-loose">Putri dari <br />Bapak Soendoko <br /> & <br />Ibu Rosnani</p>
                  </div>
                </motion.div>

                <motion.div
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 50 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center space-y-12 group"
                >
                  <div className="relative inline-block">
                    <div className="watercolor-wash-hide-mobile">
                      <WatercolorWash className="-top-12 -left-12" size="250px" color="#3D5A80" opacity={0.2} />
                    </div>
                    <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto overflow-hidden shadow-2xl relative z-10 watercolor-frame bg-white/80 p-2 backdrop-blur-sm">
                      <img src={groomImg} className="w-full h-full object-cover transition-all duration-1000 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110" alt="Groom" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <InkSpreadTitle>
                      <h3 className="font-serif text-3xl sm:text-4xl text-[#3D5A80] font-bold">Bilal Abdul Qowy</h3>
                    </InkSpreadTitle>
                    <p className="text-[#4A6982] font-semibold text-lg uppercase tracking-widest leading-loose">Putra dari <br /> Bapak Hanan Munthaha <br /> & <br /> Ibu Hambar Pangesti</p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* DETAILS */}
            <section className="py-24 sm:py-48 px-6 relative bg-[#FAF9F6]/20">
              <div className="watercolor-wash-hide-mobile">
                <WatercolorWash className="top-0 right-0" size="600px" color="#E0E7FF" opacity={0.15} />
              </div>
              <div className="max-w-5xl mx-auto text-center space-y-24 relative z-10">
                <div className="space-y-6">
                  <InkSpreadTitle>
                    <h2 className="font-serif text-5xl sm:text-7xl text-[#3D5A80] font-bold">Waktu & Tempat</h2>
                  </InkSpreadTitle>
                  <div className="flex justify-center items-center gap-4">
                    <div className="h-px w-12 bg-[#3D5A80]/30" />
                    <Heart size={16} className="text-[#98C1D9]" />
                    <div className="h-px w-12 bg-[#3D5A80]/30" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-white/40 p-10 sm:p-16 rounded-[3rem] sm:rounded-[4rem] border border-white/60 shadow-xl backdrop-blur-md group hover:bg-white/70 transition-all duration-700">
                    <Calendar className="mx-auto text-[#3D5A80] opacity-30 mb-8" size={60} />
                    <h4 className="font-serif text-3xl sm:text-4xl text-[#3D5A80] font-bold mb-6">Akad Nikah</h4>
                    <div className="space-y-2">
                      <p className="text-[#3D5A80] text-2xl sm:text-3xl font-serif">08:00 - 10:00 WIB</p>
                      <p className="text-[#4A6982] font-medium text-lg leading-relaxed">Masjid Islam Al Azhar 2<br />Pejaten, Jakarta Selatan</p>
                    </div>
                  </div>

                  <div className="bg-white/40 p-10 sm:p-16 rounded-[3rem] sm:rounded-[4rem] border border-white/60 shadow-xl backdrop-blur-md group hover:bg-white/70 transition-all duration-700">
                    <Heart className="mx-auto text-[#98C1D9] opacity-40 mb-8" size={60} />
                    <h4 className="font-serif text-3xl sm:text-4xl text-[#3D5A80] font-bold mb-6">Resepsi</h4>
                    <div className="space-y-2">
                      <p className="text-[#3D5A80] text-2xl sm:text-3xl font-serif">10:00 - Selesai</p>
                      <p className="text-[#4A6982] font-medium text-lg leading-relaxed">Masjid Islam Al Azhar 2<br />Pejaten, Jakarta Selatan</p>
                    </div>
                  </div>
                </div>

                <div className="mt-20 space-y-12">
                  <div className="w-full h-[400px] sm:h-[600px] rounded-[3rem] sm:rounded-[4rem] overflow-hidden shadow-2xl border-[8px] sm:border-[12px] border-white group relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9540179913383!2d106.83267742695308!3d-6.269777799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f367827983c7%3A0xc33c73a674ff7867!2sSMA%20Islam%20Al%20Azhar%202%20Pejaten!5e0!3m2!1sen!2sid!4v1770165785275!5m2!1sen!2sid"
                      width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                      className="group-hover:scale-105 transition-transform duration-[4000ms]"
                    />
                  </div>
                  <button
                    onClick={() => window.open('https://share.google/hh0mvFwUvipQdulhU')}
                    className="bg-[#3D5A80] text-white px-10 sm:px-16 py-5 sm:py-7 rounded-full flex items-center gap-4 mx-auto shadow-2xl hover:bg-[#293241] transition-all font-bold group text-lg sm:text-xl"
                  >
                    <Navigation size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Penunjuk Lokasi
                  </button>
                </div>
              </div>
            </section>

            {/* GALLERY */}
            <section className="pt-24 sm:pt-48 pb-12 sm:pb-20 relative">
              <div className="watercolor-wash-hide-mobile">
                <WatercolorWash className="top-1/4 left-0" size="450px" color="#98C1D9" opacity={0.06} />
              </div>
              <div className="text-center mb-16 sm:mb-24 space-y-6">
                <InkSpreadTitle>
                  <h2 className="font-serif text-5xl sm:text-7xl text-[#3D5A80] font-bold">Galeri Cerita</h2>
                </InkSpreadTitle>
                <div className="w-32 h-px bg-[#3D5A80]/20 mx-auto" />
              </div>
              <Gallery />
            </section>

            {/* WEDDING GIFT SECTION - Tighter top spacing */}
            <section className="pt-12 sm:pt-20 pb-24 sm:pb-32 px-6 relative overflow-hidden">
              <div className="watercolor-wash-hide-mobile">
                <WatercolorWash className="-bottom-40 -left-40" size="800px" color="#3D5A80" opacity={0.08} />
              </div>
              <div className="max-w-4xl mx-auto space-y-24 sm:space-y-32 relative z-10">
                <WeddingGift />
                <div className="space-y-16">
                  <div className="text-center space-y-6">
                    <InkSpreadTitle>
                      <h2 className="font-serif text-5xl sm:text-6xl text-[#3D5A80] font-bold">Ucapan Doa</h2>
                    </InkSpreadTitle>
                    <div className="h-px w-20 bg-[#3D5A80]/30 mx-auto" />
                  </div>
                  <Guestbook />
                </div>
              </div>
            </section>

            {/* FOOTER - Increased bottom padding and ensured solid background coverage */}
            <footer className="pt-24 sm:pt-32 pb-48 sm:pb-64 bg-[#293241] text-white text-center relative overflow-hidden m-0">
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

              <div className="relative z-10 space-y-10 sm:space-y-16">
                <InkSpreadTitle className="text-[#98C1D9]">
                  <h2 className="font-cursive text-7xl sm:text-9xl">Terima Kasih</h2>
                </InkSpreadTitle>
                <div className="w-32 h-px bg-[#98C1D9]/10 mx-auto" />
                <p className="max-w-2xl mx-auto px-10 text-[#98C1D9] italic text-2xl sm:text-3xl leading-relaxed font-serif opacity-70">
                  "Pernikahan adalah ibadah jangka panjang, di mana setiap tantangan dan ujian adalah cara Allah mendekatkan kita pada-Nya dan menguatkan cinta kita."
                </p>

                <div className="pt-24 sm:pt-32 flex flex-col items-center gap-10">
                  <span className="text-[10px] uppercase tracking-[1em] text-[#98C1D9]/30 font-bold">Premium Digital Invitation</span>
                  <div className="space-y-4">
                    <span className="font-serif text-4xl sm:text-6xl tracking-[0.2em] uppercase block">Bilal & Sandika</span>
                  </div>
                  <p className="text-[10px] text-[#98C1D9]/20 tracking-[0.5em] mt-16 font-bold italic uppercase underline underline-offset-[16px] decoration-[#98C1D9]/10">Hand-crafted with Elegance & Love</p>
                </div>
              </div>
            </footer>
          </motion.main>
        </>
      )}
    </div>
  );
};

export default App;
