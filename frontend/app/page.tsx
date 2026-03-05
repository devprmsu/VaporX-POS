'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
}

export default function Dashboard() {
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // 1. Fetch Products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  // 2. Barcode Scanner Logic
  const addToCartBySKU = (sku: string) => {
    const product = products.find(p => p.sku === sku);
    if (product) {
      setCart([...cart, product]);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    // This is where we will trigger the MUNBYN printer later
    alert(`Processing Sale: ₱${total.toFixed(2)}`);
    setCart([]);
  };

  return (
    <main className="min-h-screen bg-[#0a0f14] text-white flex flex-col md:flex-row p-4 gap-4">
      {/* Left Side: Product Terminal */}
      <div className="flex-1 bg-[#111820] rounded-3xl p-6 border border-slate-800 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic text-[#4fd1d9]">TERMINAL_01</h2>
          <button onClick={() => router.push('/login')} className="text-xs text-slate-500 hover:text-red-400">LOGOUT</button>
        </div>

        <input 
          type="text" 
          placeholder="SCAN SKU OR SEARCH..." 
          className="w-full bg-black p-4 rounded-xl border border-slate-700 focus:border-[#4fd1d9] outline-none mb-6"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (addToCartBySKU(search), setSearch(''))}
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(product => (
            <button 
              key={product.id}
              onClick={() => setCart([...cart, product])}
              className="bg-black/40 border border-slate-800 p-4 rounded-2xl hover:border-[#4fd1d9] transition-all text-left"
            >
              <p className="text-xs text-[#4fd1d9] font-bold uppercase">{product.sku}</p>
              <p className="font-bold text-lg">{product.name}</p>
              <p className="text-slate-400">₱{product.price}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: Cart & Receipt Preview */}
      <div className="w-full md:w-96 bg-[#111820] rounded-3xl p-6 border border-[#4fd1d9]/20 flex flex-col shadow-[0_0_30px_rgba(79,209,217,0.05)]">
        <h3 className="text-xl font-black mb-6 border-b border-slate-800 pb-4">CURRENT_SALE</h3>
        
        <div className="flex-1 overflow-y-auto space-y-3 mb-6">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between text-sm bg-black/20 p-3 rounded-lg border border-slate-900">
              <span>{item.name}</span>
              <span className="font-mono text-[#4fd1d9]">₱{item.price}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-6">
          <div className="flex justify-between text-2xl font-black mb-6">
            <span>TOTAL</span>
            <span className="text-[#4fd1d9]">₱{total.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-[#4fd1d9] text-[#0a0f14] py-5 rounded-2xl font-black text-xl hover:bg-white transition-all shadow-lg shadow-[#4fd1d9]/20"
          >
            PROCESS SALE
          </button>
        </div>
      </div>
    </main>
  );
}