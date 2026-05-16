import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void-950 p-8 text-center text-white">
      <div className="pointer-events-none fixed inset-0 bg-aurora" />
      <div className="premium-grid pointer-events-none fixed inset-0 bg-grid-fade bg-[length:48px_48px] opacity-70" />
      <div className="relative z-10 max-w-lg rounded-lg border border-white/10 bg-white/[0.08] p-8 shadow-panel backdrop-blur-xl">
        <Sparkles className="mx-auto h-10 w-10 text-primary-200" />
        <h1 className="mt-6 text-7xl font-black text-white">404</h1>
        <h2 className="mt-4 text-2xl font-bold">Page not found</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">The route you opened does not exist in this workspace.</p>
        <Link to="/" className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    </div>
  );
}
