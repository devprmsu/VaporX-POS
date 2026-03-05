'use client'
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert("AUTH ERROR: " + error.message);
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0f14]">
      <div className="p-10 bg-[#111820] border border-[#4fd1d9]/30 rounded-[2.5rem] shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-black text-center text-white italic mb-8">
          VAPOR <span className="text-[#4fd1d9]">X</span> TERMINAL
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="STAFF EMAIL" 
            className="w-full bg-black border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-[#4fd1d9]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="SECURITY PIN" 
            className="w-full bg-black border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-[#4fd1d9]"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-[#4fd1d9] text-black font-bold py-4 rounded-xl hover:bg-white transition-all">
            {loading ? 'SYNCING...' : 'OPEN TERMINAL'}
          </button>
        </form>
      </div>
    </main>
  );
}