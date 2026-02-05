
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const Item = ({ label, value }: { label: string, value: number }) => (
    <div className="flex flex-col items-center px-3 py-3 sm:px-6 sm:py-6 rounded-2xl sm:rounded-3xl min-w-[65px] sm:min-w-[110px] flex-1 overflow-hidden border border-white/40 bg-gradient-to-b from-white/50 to-white/15 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.08)] ring-1 ring-[#98C1D9]/10 ">
      <span className="text-xl sm:text-5xl font-serif text-[#3D5A80] font-bold drop-shadow-sm leading-none">{value}</span>
      <div className="w-4 sm:w-8 h-[1px] bg-[#3D5A80]/20 my-1 sm:my-2" />
      <span className="text-[7px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#4A6982] font-bold truncate w-full text-center">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-nowrap gap-2 sm:gap-8 justify-center mt-12 mb-8 w-full max-w-full px-1 overflow-hidden">
      <Item label="Hari" value={timeLeft.days} />
      <Item label="Jam" value={timeLeft.hours} />
      <Item label="Menit" value={timeLeft.minutes} />
      <Item label="Detik" value={timeLeft.seconds} />
    </div>
  );
};

export default Countdown;
