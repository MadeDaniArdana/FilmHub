'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { AlertCircle } from 'lucide-react';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';

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

      if (error) throw error;

      router.push('/');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal masuk. Silakan periksa kredensial Anda.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 pt-24 pb-12">
      <div className="w-full max-w-md bg-surface-container rounded-2xl p-8 shadow-2xl border border-white/5 relative z-10 overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container" />

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

        {/* Social login */}
        <SocialAuthButtons onError={setError} />

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-outline-variant/30" />
          <span className="text-xs text-on-surface-variant uppercase font-medium tracking-wide">
            Atau masuk dengan email
          </span>
          <div className="h-[1px] flex-1 bg-outline-variant/30" />
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-label font-medium text-on-surface-variant block pl-1">
              Email
            </label>
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
              <label className="text-sm font-label font-medium text-on-surface-variant">
                Password
              </label>
              <Link
                href="#"
                className="text-xs text-primary hover:text-primary-foreground transition-colors"
              >
                Lupa Password?
              </Link>
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
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-on-surface-variant font-label">
          Belum punya akun?{' '}
          <Link href="/register" className="text-white font-bold hover:text-primary transition-colors">
            Daftar sekarang
          </Link>
        </p>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
}
