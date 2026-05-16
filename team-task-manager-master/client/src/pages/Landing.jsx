import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CheckSquare,
  Clock3,
  FolderKanban,
  Layers3,
  MessageSquare,
  Play,
  ShieldCheck,
  Sparkles,
  Users2,
  Zap,
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import GlassCard from '../components/ui/GlassCard';
import ProgressRing from '../components/ui/ProgressRing';
import useAuthStore from '../store/authStore';
import { fadeUp, stagger } from '../utils/animations';

const features = [
  { icon: FolderKanban, title: 'Project clarity', copy: 'Plan work, ownership, status, and timelines in one polished command center.' },
  { icon: CheckSquare, title: 'Task momentum', copy: 'Move work from idea to done with drag-ready boards, filters, alerts, and clean task cards.' },
  { icon: BarChart3, title: 'Live insight', copy: 'Recharts-powered analytics make bottlenecks, overdue work, and progress obvious.' },
  { icon: Users2, title: 'Team rhythm', copy: 'Avatars, roles, activity, and collaboration cues keep distributed teams aligned.' },
];

const testimonials = [
  { name: 'Aarav Mehta', role: 'Product Lead', quote: 'It feels fast, focused, and premium without burying the team in process.' },
  { name: 'Maya Singh', role: 'Engineering Manager', quote: 'The dashboard makes overdue risk and ownership clear in a few seconds.' },
  { name: 'Nikhil Rao', role: 'Founder', quote: 'Exactly the kind of portfolio project UI recruiters stop scrolling for.' },
];

function PortalScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-token', {
        y: -18,
        rotateY: 18,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.25,
      });
      gsap.to('.hero-track', {
        rotateX: 8,
        rotateZ: -4,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef} className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-panel">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.26),transparent_34%),linear-gradient(145deg,rgba(15,23,42,0.2),rgba(0,0,0,0.85))]" />
      <div className="hero-track absolute left-[8%] top-[9%] h-24 w-[72%] rotate-[-17deg] skew-x-[-18deg] rounded-lg border border-slate-500/20 bg-[linear-gradient(135deg,rgba(148,163,184,0.18)_25%,transparent_25%,transparent_50%,rgba(148,163,184,0.18)_50%,rgba(148,163,184,0.18)_75%,transparent_75%)] bg-[length:26px_26px] shadow-2xl" />
      <div className="hero-track absolute bottom-[8%] right-[-6%] h-24 w-[72%] rotate-[-17deg] skew-x-[-18deg] rounded-lg border border-slate-500/20 bg-[linear-gradient(135deg,rgba(148,163,184,0.16)_25%,transparent_25%,transparent_50%,rgba(148,163,184,0.16)_50%,rgba(148,163,184,0.16)_75%,transparent_75%)] bg-[length:26px_26px] shadow-2xl" />
      <div className="hero-token absolute right-[22%] top-[18%] flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-slate-950 shadow-glow">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary-300/50 bg-primary-500/15 text-primary-100">
          <Layers3 className="h-8 w-8" />
        </div>
      </div>
      <div className="hero-token absolute bottom-[20%] left-[24%] flex h-36 w-36 items-center justify-center rounded-full border border-violet-300/40 bg-primary-500/10 shadow-[0_0_70px_rgba(139,92,246,0.55)]">
        <div className="h-20 w-20 rounded-lg border border-white/25 bg-white/20 backdrop-blur-xl" />
      </div>
      <div className="absolute bottom-8 right-8 flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/15 text-cyan-200">
          <Zap className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-white">91% velocity</p>
          <p className="text-xs text-slate-400">Sprint health rising</p>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  const bars = [62, 84, 48, 76, 91, 68, 88];

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-panel backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-primary-200">Dashboard preview</p>
          <h3 className="mt-1 text-lg font-bold text-white">Sprint command center</h3>
        </div>
        <div className="flex -space-x-2">
          {['AS', 'MR', 'NK', 'PV'].map((name) => (
            <span key={name} className="flex h-9 w-9 items-center justify-center rounded-full border border-void-950 bg-gradient-to-br from-primary-300 to-cyan-200 text-xs font-bold text-void-950">
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ['Tasks shipped', '128', 'text-primary-200'],
          ['In review', '24', 'text-cyan-200'],
          ['Overdue', '7', 'text-red-200'],
        ].map(([label, value, tone]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className={`mt-2 text-2xl font-bold ${tone}`}>{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <div className="flex h-40 items-end gap-2">
            {bars.map((bar, index) => (
              <motion.div
                key={bar}
                initial={{ height: 0 }}
                whileInView={{ height: `${bar}%` }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.65, ease: 'easeOut' }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-primary-500 to-cyan-300"
              />
            ))}
          </div>
        </div>
        <div className="space-y-3 rounded-lg border border-white/10 bg-black/20 p-4">
          {['Design QA', 'API polish', 'Recruiter demo'].map((task, index) => (
            <div key={task} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-3">
              <span className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className={`h-4 w-4 ${index === 2 ? 'text-amber-300' : 'text-emerald-300'}`} />
                {task}
              </span>
              <span className="text-xs text-slate-500">{index === 2 ? 'Today' : 'Done'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const token = useAuthStore((s) => s.token);
  const ctaTarget = token ? '/dashboard' : '/signup';

  return (
    <div className="min-h-screen overflow-hidden bg-void-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-aurora" />
      <div className="premium-grid pointer-events-none fixed inset-0 bg-grid-fade bg-[length:48px_48px] opacity-70" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-void-950/45 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary-300/30 bg-primary-500/15 text-primary-100 shadow-glow">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">Team Task Manager</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-400 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#preview" className="hover:text-white">Preview</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <Link to="/login" className="hover:text-white">Login</Link>
          </div>
          <MagneticButton to={ctaTarget} className="min-h-10 px-4">
            {token ? 'Open app' : 'Get started'}
          </MagneticButton>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid min-h-[86vh] max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-primary-100">
              <Sparkles className="h-3.5 w-3.5" />
              Premium SaaS command center for modern teams
            </motion.div>
            <motion.h1 variants={fadeUp} className="max-w-3xl text-5xl font-black leading-[1.05] text-white md:text-7xl">
              Team Task Manager
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              A cinematic, glassmorphic workspace for projects, tasks, team collaboration, and analytics, built on your existing full-stack app.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton to={ctaTarget} icon={ArrowRight}>
                Launch workspace
              </MagneticButton>
              <MagneticButton to="/login" variant="secondary" icon={Play}>
                View demo login
              </MagneticButton>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {['Realtime clarity', 'Drag-ready boards', 'Analytics'].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-3 text-center text-xs font-semibold text-slate-300">
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <PortalScene />
          </motion.div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase text-primary-200">Features</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">A focused system for shipping with less noise.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <GlassCard key={feature.title} delay={index * 0.05} className="p-5">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-primary-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{feature.copy}</p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        <section id="preview" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-cyan-200">Dashboard preview</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Everything important, elegantly surfaced.</h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              See sprint velocity, overdue risk, task distribution, project progress, and recent movement in a dashboard that feels built for daily use.
            </p>
            <div className="mt-8 flex gap-5">
              <ProgressRing value={78} label="Done" tone="violet" />
              <ProgressRing value={92} label="Focus" tone="cyan" />
            </div>
          </div>
          <DashboardPreview />
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            { icon: Users2, title: 'Team collaboration', copy: 'Assign owners, manage member roles, and keep project context connected to the work.' },
            { icon: MessageSquare, title: 'Activity timeline', copy: 'Recent updates and overdue alerts create a fast operational pulse for managers.' },
            { icon: ShieldCheck, title: 'Production ready', copy: 'Backend contracts remain untouched while the frontend gets a cohesive premium system.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.title} className="p-6">
                <Icon className="h-6 w-6 text-cyan-200" />
                <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.copy}</p>
              </GlassCard>
            );
          })}
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-primary-200">Testimonials</p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">Built to impress and still be useful.</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <GlassCard key={item.name} className="p-6">
                <p className="text-base leading-7 text-slate-200">"{item.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-300 to-cyan-200 text-xs font-bold text-void-950">
                    {item.name.split(' ').map((part) => part[0]).join('')}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-panel backdrop-blur-xl md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase text-cyan-200">Pricing</p>
                <h2 className="mt-3 text-3xl font-bold md:text-5xl">Portfolio-grade polish with startup-grade structure.</h2>
                <p className="mt-5 text-base leading-7 text-slate-400">
                  Keep it simple for demos, then grow into teams, projects, and analytics without rewriting your backend.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ['Starter', 'Free', ['Projects and tasks', 'Dark SaaS UI', 'Command palette']],
                  ['Team', 'Custom', ['Kanban board', 'Analytics', 'Role-based collaboration']],
                ].map(([name, price, perks]) => (
                  <div key={name} className="rounded-lg border border-white/10 bg-black/20 p-5">
                    <p className="text-sm font-semibold text-slate-300">{name}</p>
                    <p className="mt-3 text-3xl font-black text-white">{price}</p>
                    <ul className="mt-5 space-y-3 text-sm text-slate-400">
                      {perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>Team Task Manager. Premium project operations UI.</p>
          <div className="flex gap-5">
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link to="/signup" className="hover:text-white">Sign up</Link>
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
