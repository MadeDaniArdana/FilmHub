'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { AlertCircle, CheckCircle } from 'lucide-react';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError('Password tidak cocok!');
      setLoading(false);
      return;
    }

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data?.session) {
        // Logged in immediately
        router.push('/');
        router.refresh();
      } else {
        setMessage('Registrasi berhasil! Silakan periksa email Anda untuk verifikasi.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal mendaftar. Silakan coba lagi.';
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
          <h1 className="text-3xl font-headline font-bold text-white mb-2">Buat Akun</h1>
          <p className="text-on-surface-variant font-label">
            Mulai perjalanan sinematik Anda di FilmHub
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-error-container/20 border border-error/50 text-error px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 bg-green-900/40 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
            <CheckCircle size={18} />
            {message}
          </div>
        )}

        {/* Social sign-up */}
        <SocialAuthButtons onError={setError} />

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-outline-variant/30" />
          <span className="text-xs text-on-surface-variant uppercase font-medium tracking-wide">
            Atau daftar dengan email
          </span>
          <div className="h-[1px] flex-1 bg-outline-variant/30" />
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
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
            <label className="text-sm font-label font-medium text-on-surface-variant block pl-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="Minimal 6 karakter"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-label font-medium text-on-surface-variant block pl-1">
              Konfirmasi Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="Ulangi password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-xl py-3 hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(233,69,96,0.3)] disabled:opacity-70 disabled:active:scale-100 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              'Daftar'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-on-surface-variant font-label">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-white font-bold hover:text-primary transition-colors">
            Masuk di sini
          </Link>
        </p>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
}
