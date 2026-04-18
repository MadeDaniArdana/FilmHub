'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Gagal masuk. Silakan periksa kredensial Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 pt-24 pb-12">
      <div className="w-full max-w-md bg-surface-container rounded-2xl p-8 shadow-2xl border border-white/5 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-headline font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant font-label">Masuk untuk melanjutkan ke FilmHub</p>
        </div>

        {error && (
          <div className="mb-6 bg-error-container/20 border border-error/50 text-error px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-label font-medium text-on-surface-variant block pl-1">Email Domain</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="nama@email.com"
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center pl-1">
              <label className="text-sm font-label font-medium text-on-surface-variant">Password</label>
              <Link href="#" className="text-xs text-primary hover:text-primary-foreground transition-colors">Lupa Password?</Link>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-xl py-3 hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(233,69,96,0.3)] disabled:opacity-70 disabled:active:scale-100 mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
          <span className="text-xs text-on-surface-variant uppercase font-medium tracking-wide">Atau masuk dengan</span>
          <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          type="button"
          className="mt-6 w-full bg-white text-[#1f1f1f] font-bold rounded-xl py-3 hover:bg-gray-100 active:scale-[0.98] transition-all flex justify-center items-center gap-3 border border-gray-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <p className="mt-8 text-center text-sm text-on-surface-variant font-label">
          Belum punya akun?{' '}
          <Link href="/register" className="text-white font-bold hover:text-primary transition-colors">
            Daftar sekarang
          </Link>
        </p>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
    </div>
  );
}
