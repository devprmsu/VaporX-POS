'use client'
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message.toUpperCase());
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#020406] relative overflow-hidden">
      
      {/* Structural Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#4fd1d9] rounded-full blur-[150px] opacity-[0.08]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#7000ff] rounded-full blur-[150px] opacity-[0.08]" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[440px] p-12 mx-4 bg-[#0d1117] border border-white/10 rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        
        {/* Branding & Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#4fd1d9] to-[#7000ff] rounded-full blur-2xl opacity-20 transition duration-1000 group-hover:opacity-40"></div>
            <img 
              src="/logo.png" 
              alt="Vapor X Logo" 
              className="relative w-32 h-32 rounded-full object-cover border border-white/20 shadow-2xl"
            />
          </div>
          
          {/* ETNA STYLE BRANDING */}
          <h1 className="text-5xl font-black tracking-[ -0.05em] text-white italic leading-none" style={{ fontFamily: '"Etna", "Inter", sans-serif' }}>
            VAPOR <span className="text-[#4fd1d9]">X</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#4fd1d9] to-[#7000ff] mt-4 rounded-full"></div>
          <p className="text-slate-400 text-[11px] font-medium tracking-[0.6em] mt-6 uppercase opacity-80">Login Portal</p>
        </div>

        {/* Professional Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold py-3 px-4 rounded-lg text-center uppercase tracking-widest">
              {errorMsg}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Staff Credentials</label>
            <input 
              type="email" 
              placeholder="Username / Email" 
              required
              className="w-full bg-black border border-white/10 p-4 rounded-xl text-white placeholder:text-slate-700 outline-none focus:border-[#4fd1d9] focus:ring-1 focus:ring-[#4fd1d9]/20 transition-all text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">Access PIN</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              className="w-full bg-black border border-white/10 p-4 rounded-xl text-white placeholder:text-slate-700 outline-none focus:border-[#4fd1d9] focus:ring-1 focus:ring-[#4fd1d9]/20 transition-all text-sm tracking-[0.3em]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full relative mt-4 h-14 bg-white hover:bg-[#4fd1d9] text-black font-black rounded-xl overflow-hidden transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50"
          >
            <span className="relative z-10 uppercase tracking-tighter text-md">
              {loading ? 'Validating...' : 'Login'}
            </span>
          </button>
        </form>

        {/* Footer Hardware Status */}
        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fd1d9] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4fd1d9]"></span>
            </span>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Hardware Online</span>
          </div>
          <span className="text-[9px] text-slate-600 font-mono">v1.0.42</span>
        </div>
      </div>
    </main>
  );
}