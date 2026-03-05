'use client'
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError('Access Denied: Invalid Credentials');
      setLoading(false);
    } else {
      router.push('/'); 
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 bg-[#0a0f14]">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center grayscale-[20%]"
        style={{ backgroundImage: "url('/VAPOR X.png')" }}
      />
      
      {/* Overlay Gradient to ensure readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#0a0f14]/80 to-[#0a0f14]" />

      <div className="relative z-20 w-full max-w-md bg-[#111820]/90 backdrop-blur-xl p-10 rounded-[2.5rem] border border-[#4fd1d9]/30 shadow-[0_0_50px_rgba(79,209,217,0.1)]">
        
        {/* Logo Header */}
        <div className="text-center mb-10">
          <img 
            src="/VAPOR X.png" 
            alt="Vapor X Logo" 
            className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-[#4fd1d9] shadow-[0_0_20px_rgba(79,209,217,0.4)]"
          />
          <h1 className="text-4xl font-black text-white tracking-tighter italic">
            VAPOR <span className="text-[#4fd1d9]">X</span>
          </h1>
          <p className="text-[#4fd1d9]/60 text-xs tracking-[0.4em] uppercase mt-2 font-bold">
            Staff Portal Est. 2025
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[#4fd1d9] text-[10px] uppercase tracking-widest ml-4 font-bold">Email Address</label>
            <input 
              type="email" 
              placeholder="manager@vaporx.com"
              className="w-full bg-black/50 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-[#4fd1d9] focus:ring-1 focus:ring-[#4fd1d9] transition-all placeholder:text-slate-600"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#4fd1d9] text-[10px] uppercase tracking-widest ml-4 font-bold">Security PIN</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-black/50 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-[#4fd1d9] focus:ring-1 focus:ring-[#4fd1d9] transition-all placeholder:text-slate-600"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-xl">
              <p className="text-red-500 text-xs text-center font-bold uppercase tracking-tighter">{error}</p>
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full bg-[#4fd1d9] hover:bg-white text-[#0a0f14] font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(79,209,217,0.3)] transition-all transform active:scale-95 uppercase tracking-widest"
          >
            {loading ? 'Verifying...' : 'Initialize Terminal'}
          </button>
        </form>

        <p className="text-center text-slate-500 text-[10px] mt-8 uppercase tracking-widest">
          Authorized Personnel Only
        </p>
      </div>
    </main>
  );
}