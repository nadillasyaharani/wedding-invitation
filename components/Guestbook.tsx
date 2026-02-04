
import React, { useState, useEffect } from 'react';
import { Wish } from '../types';
import { MessageCircle, User, Loader2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setIsUsingFallback(true);
      loadLocalWishes();
      setLoading(false);
      return;
    }

    fetchWishes();

    const channel = supabase
      .channel('wishes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          const newWish = {
            ...payload.new,
            timestamp: new Date(payload.new.timestamp)
          } as Wish;
          
          setWishes((prev) => {
            if (prev.find(w => w.id === newWish.id)) return prev;
            return [newWish, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadLocalWishes = () => {
    const localWishes = localStorage.getItem('guestbook_fallback');
    if (localWishes) {
      try {
        setWishes(JSON.parse(localWishes).map((w: any) => ({...w, timestamp: new Date(w.timestamp)})));
      } catch (e) {
        console.error("Error parsing local wishes", e);
      }
    }
  };

  const fetchWishes = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;

      if (data) {
        const formatted = data.map(item => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })) as Wish[];
        setWishes(formatted);
      }
    } catch (err) {
      console.error('Error fetching wishes:', err);
      setIsUsingFallback(true);
      loadLocalWishes();
    } finally {
      setLoading(false);
    }
  };

  const addWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newMessage) return;

    setSubmitting(true);
    
    const tempWish: Wish = {
      id: Date.now().toString(),
      name: newName,
      message: newMessage,
      attendance: attendance,
      timestamp: new Date()
    };

    if (!supabase || isUsingFallback) {
      const updatedWishes = [tempWish, ...wishes];
      setWishes(updatedWishes);
      localStorage.setItem('guestbook_fallback', JSON.stringify(updatedWishes));
      setNewName('');
      setNewMessage('');
      setSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('wishes')
        .insert([
          { 
            name: newName, 
            message: newMessage,
            attendance: attendance,
            timestamp: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        const insertedWish = {
          ...data[0],
          timestamp: new Date(data[0].timestamp)
        } as Wish;
        
        setWishes(prev => {
          if (prev.find(w => w.id === insertedWish.id)) return prev;
          return [insertedWish, ...prev];
        });
      }

      setNewName('');
      setNewMessage('');
    } catch (err: any) {
      console.error('Error adding wish:', err);
      const updatedWishes = [tempWish, ...wishes];
      setWishes(updatedWishes);
      localStorage.setItem('guestbook_fallback', JSON.stringify(updatedWishes));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-8">
      {(!supabase || isUsingFallback) && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-amber-800 text-sm">
          <AlertCircle size={18} />
          <span>Mode Offline: Pesan disimpan di perangkat Anda.</span>
        </div>
      )}

      <div className="bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#98C1D9]/20 shadow-xl">
        <h3 className="font-serif text-3xl text-[#3D5A80] mb-6 flex items-center justify-center sm:justify-start gap-3 text-center">
          <MessageCircle size={28} /> Kirim Ucapan & Doa
        </h3>
        <form onSubmit={addWish} className="space-y-4">
          <input 
            type="text" 
            placeholder="Nama Anda"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            disabled={submitting}
            className="w-full px-4 py-3 rounded-xl border border-[#98C1D9]/30 focus:border-[#3D5A80] bg-white/80 outline-none transition-all disabled:opacity-50"
          />
          
          <div className="grid grid-cols-2 gap-3 mb-2">
            <button
              type="button"
              onClick={() => setAttendance('hadir')}
              className={`py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all border ${
                attendance === 'hadir' 
                ? 'bg-[#3D5A80] text-white border-[#3D5A80]' 
                : 'bg-white/50 text-[#3D5A80] border-[#98C1D9]/30'
              }`}
            >
              <CheckCircle size={16} /> Hadir
            </button>
            <button
              type="button"
              onClick={() => setAttendance('tidak_hadir')}
              className={`py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all border ${
                attendance === 'tidak_hadir' 
                ? 'bg-[#3D5A80] text-white border-[#3D5A80]' 
                : 'bg-white/50 text-[#3D5A80] border-[#98C1D9]/30'
              }`}
            >
              <XCircle size={16} /> Berhalangan
            </button>
          </div>

          <textarea 
            placeholder="Tulis pesan & doa Anda..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={submitting}
            className="w-full px-4 py-3 rounded-xl border border-[#98C1D9]/30 focus:border-[#3D5A80] bg-white/80 outline-none transition-all min-h-[100px] disabled:opacity-50"
          />
          <div className="flex justify-center sm:justify-start pt-2">
            <button 
              type="submit"
              disabled={submitting}
              className="bg-[#3D5A80] text-white px-10 py-4 rounded-xl hover:bg-[#293241] transition-all shadow-md font-bold flex items-center gap-2 disabled:bg-slate-400 w-full sm:w-auto justify-center"
            >
              {submitting ? <Loader2 className="animate-spin" size={20} /> : 'Kirim Ucapan'}
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex justify-center p-10">
            <Loader2 className="animate-spin text-[#3D5A80]" size={32} />
          </div>
        ) : wishes.length > 0 ? (
          wishes.map((wish) => (
            <div key={wish.id} className="bg-white/80 p-5 rounded-2xl border border-[#98C1D9]/20 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#98C1D9]/20 flex items-center justify-center flex-shrink-0 border border-[#98C1D9]/30">
                <User size={20} className="text-[#3D5A80]" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-[#3D5A80]">{wish.name}</h4>
                  {wish.attendance && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                      wish.attendance === 'hadir' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {wish.attendance === 'hadir' ? '✓ Hadir' : '✕ Berhalangan'}
                    </span>
                  )}
                </div>
                <p className="text-[#4A6982] mt-1 text-sm leading-relaxed italic">"{wish.message}"</p>
                <span className="text-[9px] text-[#98C1D9] font-bold mt-2 block uppercase tracking-widest">
                  {wish.timestamp instanceof Date && !isNaN(wish.timestamp.getTime()) 
                    ? wish.timestamp.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                    : 'Baru saja'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#98C1D9] italic py-10">Belum ada ucapan. Jadilah yang pertama!</p>
        )}
      </div>
    </div>
  );
};

export default Guestbook;
