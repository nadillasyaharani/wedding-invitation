
import React from 'react';
import { motion } from 'framer-motion';

interface StoryEvent {
  date: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

const stories: StoryEvent[] = [
  {
    date: "24 July 2025",
    title: "*Perkenalan Awal*",
    description: "Takdir mempertemukan Bilal dan Sandika pada 24 Juli 2025, dalam ruang kerja dan niat yang sederhana. Sebuah pertemuan singkat yang berlalu, hingga waktu kembali mempertemukan mereka pada 16 Oktober 2025, melalui satu pekerjaan dan satu kesempatan.",
    image: "/img/story1.webp",
    color: "#3D5A80" // Dark Blue
  },
  {
    date: "3 November 2025",
    title: "*Khitbah*",
    description: "Dari komunikasi yang awalnya profesional, tumbuh rasa yang menguatkan. Pada 3 November 2025, Bilal menyampaikan niatnya untuk melangkah lebih jauh, dengan restu orang tua sebagai landasan.",
    image: "/img/story2.webp",
    color: "#F4C430" // Yellow/Amber
  },
  {
    date: "15 Februari 2026",
    title: "*Akad & Resepsi*",
    description: "Dengan izin Allah dan doa keluarga, lamaran pun terucap pada 30 Januari 2026. Hingga akhirnya, pada 15 Februari 2026, mereka memilih untuk berjalan bersama dalam ikatan suci pernikahan—menyatukan dua hati, dalam satu tujuan.",
    image: "/img/story3.webp",
    color: "#D65A6F" // Red/Pink
  }
];

const StoryTimeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">


      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#3D5A80]/20 -translate-x-1/2 hidden md:block" />

        <div className="space-y-12 md:space-y-24">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
            >
              {/* Content Card */}
              <div className="flex-1 w-full">
                <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-xl border border-white/50 group hover:shadow-2xl transition-all duration-500">
                  {/* Header Date */}
                  <div
                    className="py-4 px-8 text-white font-bold text-center relative overflow-hidden"
                    style={{ backgroundColor: story.color }}
                  >
                    <span className="relative z-10 text-lg sm:text-xl tracking-wider">{story.date}</span>
                    <div className="absolute inset-0 bg-black/10 transform -skew-x-12 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="p-8 sm:p-10 space-y-6 text-center">
                    {/* Illustration Area */}
                    <div className="w-full aspect-square max-w-[280px] mx-auto overflow-hidden rounded-3xl bg-[#FAF9F6] border-4 border-white shadow-inner">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover scale-125 p-4"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}&backgroundColor=b6e3f4`;
                        }}
                      />
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-serif text-2xl text-[#3D5A80] font-bold italic">{story.title}</h4>
                      <p className="text-[#4A6982] leading-relaxed text-sm sm:text-base italic">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Dot (Mobile: hidden, Tablet+: visible) */}
              <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg border-4" style={{ borderColor: story.color }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: story.color }} />
              </div>

              {/* Spacer for alternating layout */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryTimeline;
