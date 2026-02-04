
import React from 'react';
import { motion } from 'framer-motion';


const localImages = [
  { src: "img/gallery1.webp", position: "object-top" },
  { src: "img/gallery2.webp", position: "object-left pr-9 mr-15 mt-10 " }, // Fokus tengah default
  { src: "img/gallery3.webp", position: "object-center pl-3 " }, // Potong bagian atas
  { src: "img/gallery41.webp", position: "object-center pr-8" },
  { src: "img/gallery5.webp", position: "object-[50%_20%]" }, // Posisi kustom 20% dari atas
  { src: "img/gallery6.webp", position: "object-center pl-8" },
];
;

const Gallery: React.FC = () => {
  return (
    <div className="grid grid-cols-2 object-contain md:grid-cols-3 gap-6 p-4 max-w-6xl mx-auto">
      {localImages.map((item, index) => ( // Ubah 'src' menjadi 'item'
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className={`relative group overflow-hidden w-full aspect-square rounded-full `}
        >
          {/* Organic frame applied to each gallery item */}
          <div className="w-full h-full watercolor-frame bg-white p-1 shadow-md">
            <img
              src={item.src} // Gunakan item.src
              alt={`Our Love Story ${index + 1}`}
              // Gunakan item.position secara dinamis di sini:
              className={`w-full h-full object-cover ${item.position} transition-transform transition-filter duration-1000 ease-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0`}

              loading="lazy"
            
            />
          </div>
          <div className="absolute inset-0 watercolor-frame bg-[#3D5A80]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px] pointer-events-none">
            <span className="text-white font-serif italic text-xl tracking-widest px-4 border-b border-white/40 pb-2">Our Story</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Gallery;
