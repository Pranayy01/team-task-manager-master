import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowRight, Mail, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' });
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await register(form);
    if (result.success) {
      toast.success('Account created');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-void-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-aurora" />
      <div className="premium-grid pointer-events-none fixed inset-0 bg-grid-fade bg-[length:48px_48px] opacity-70" />
      <div className="relative z-10 grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.08] p-6 shadow-panel backdrop-blur-xl sm:p-8"
          >
            <Link to="/" className="mb-8 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary-300/30 bg-primary-500/15 text-primary-100 shadow-glow">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-bold">Team Task Manager</span>
            </Link>
            <p className="text-sm font-semibold uppercase text-cyan-200">Create workspace access</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Start your account</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Choose a role and jump into the redesigned project dashboard.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="label">Full name</label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    className="input pl-10"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>
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
                <input
                  type="password"
                  className="input"
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="label">Role</label>
                <select className="input" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size="sm" /> : 'Create account'}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-400">
              Already have access?{' '}
              <Link to="/login" className="font-semibold text-primary-200 hover:text-white">
                Sign in
              </Link>
            </p>
          </motion.div>
        </section>

        <section className="hidden flex-col justify-between border-l border-white/10 p-10 lg:flex">
          <div />
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
            <p className="text-sm font-semibold uppercase text-primary-200">Premium operations UI</p>
            <h1 className="mt-4 text-5xl font-black leading-tight">From signup to shipped tasks in one smooth flow.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              The interface now feels like a high-end SaaS product while keeping your Express and MongoDB backend intact.
            </p>
          </motion.div>
          <div className="grid gap-3">
            {['Glassmorphism design system', 'Animated navigation and forms', 'Responsive dashboard foundation'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
                <span className="text-sm font-semibold text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
