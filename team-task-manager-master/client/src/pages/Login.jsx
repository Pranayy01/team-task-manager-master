import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowRight, LockKeyhole, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import MagneticButton from '../components/ui/MagneticButton';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(form);
    if (result.success) {
      toast.success('Welcome back');
      navigate(from, { replace: true });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-void-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-aurora" />
      <div className="premium-grid pointer-events-none fixed inset-0 bg-grid-fade bg-[length:48px_48px] opacity-70" />
      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden flex-col justify-between border-r border-white/10 p-10 lg:flex">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary-300/30 bg-primary-500/15 text-primary-100 shadow-glow">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">Team Task Manager</span>
          </Link>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
            <p className="text-sm font-semibold uppercase text-primary-200">Command center access</p>
            <h1 className="mt-4 text-5xl font-black leading-tight">Your team workspace, tuned for focus.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Sign in to manage projects, move task boards, track overdue work, and read analytics without losing the premium feel.
            </p>
          </motion.div>
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <p className="text-xs font-semibold uppercase text-slate-500">Demo account</p>
            <p className="mt-2 text-sm text-slate-300">admin@demo.com / admin123</p>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.08] p-6 shadow-panel backdrop-blur-xl sm:p-8"
          >
            <div className="mb-8">
              <Link to="/" className="mb-8 flex items-center gap-3 lg:hidden">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary-300/30 bg-primary-500/15 text-primary-100 shadow-glow">
                  <Sparkles className="h-5 w-5" />
                </span>
                <span className="font-bold">Team Task Manager</span>
              </Link>
              <p className="text-sm font-semibold uppercase text-primary-200">Welcome back</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Sign in</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Enter your credentials to continue to the workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    className="input pl-10"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    className="input pl-10"
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size="sm" /> : 'Sign in'}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-slate-400">
              Demo: <span className="font-semibold text-slate-200">admin@demo.com</span> / <span className="font-semibold text-slate-200">admin123</span>
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              Need an account?{' '}
              <Link to="/signup" className="font-semibold text-primary-200 hover:text-white">
                Sign up
              </Link>
            </p>
            <div className="mt-6 flex justify-center">
              <MagneticButton to="/" variant="secondary" className="min-h-10 px-4">
                Back to landing
              </MagneticButton>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
