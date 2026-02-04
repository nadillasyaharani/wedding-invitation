
import React, { useState } from 'react';
import { Copy, Check, Gift } from 'lucide-react';

const WeddingGift: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const bankAccounts = [
    {
      bank: "Bank BRI ",
      number: "042601018068503 ",
      name: "Sandika Dewi Rosalini"
    },
    {
      bank: "Bank BSI",
      number: "7210331907",
      name: "Bilal Abdul Qowy"
    }

  ];

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedAccount(num);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div className="max-w-xl mx-auto text-center space-y-12">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-[#3D5A80]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Gift className="text-[#3D5A80]" size={32} />
        </div>
        <h3 className="font-serif text-4xl text-[#3D5A80] italic">Wedding Gift</h3>
        <p className="text-[#4A6982] px-6 max-w-md mx-auto leading-relaxed">
          Doa dan restu Anda merupakan anugerah yang sangat berarti bagi kami. Semoga doa-doa kebaikan juga senantiasa menyertai Anda.
          Namun, apabila berkenan memberikan tanda kasih, Anda dapat menyampaikannya melalui:
        </p>
      </div>

      <div className="grid gap-6">
        {bankAccounts.map((acc, idx) => (
          <div
            key={idx}
            className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-[#98C1D9]/30 shadow-xl relative overflow-hidden group hover:bg-white transition-all duration-500"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <span className="font-bold text-[#3D5A80] text-xl tracking-widest uppercase">{acc.bank}</span>
              <div className="space-y-1">
                <p className="text-2xl font-serif text-[#3D5A80] tracking-wider font-bold">{acc.number}</p>
                <p className="text-sm text-[#4A6982] font-semibold">a/n {acc.name}</p>
              </div>

              <button
                onClick={() => handleCopy(acc.number)}
                className={`mt-4 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md ${copiedAccount === acc.number
                    ? 'bg-green-500 text-white'
                    : 'bg-[#3D5A80] text-white hover:bg-[#293241]'
                  }`}
              >
                {copiedAccount === acc.number ? (
                  <>
                    <Check size={16} /> Berhasil Disalin
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Salin Nomor Rekening
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-10">
        <p className="text-[#4A6982] text-sm italic opacity-60">Terima kasih atas segala doa dan kebaikan Anda.</p>
      </div>
    </div>
  );
};

export default WeddingGift;
