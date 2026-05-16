import { useState } from 'react';
import { Bell, Command, Moon, Palette, ShieldCheck, Sun } from 'lucide-react';
import PageShell from '../components/ui/PageShell';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import useThemeStore from '../store/themeStore';

function Toggle({ enabled, onChange, label, description, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className="flex w-full items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white/70 p-4 text-left transition hover:border-primary-300 dark:border-white/10 dark:bg-black/20 dark:hover:border-primary-300/50"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-primary-300">
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-slate-950 dark:text-white">{label}</span>
          <span className="block text-xs leading-5 text-slate-500">{description}</span>
        </span>
      </span>
      <span className={`relative h-6 w-11 rounded-full transition ${enabled ? 'bg-primary-500' : 'bg-slate-300 dark:bg-white/15'}`}>
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${enabled ? 'left-6' : 'left-1'}`} />
      </span>
    </button>
  );
}

export default function Settings() {
  const { darkMode, toggleTheme } = useThemeStore();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [desktopAlerts, setDesktopAlerts] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <PageShell
      eyebrow="Preferences"
      title="Settings"
      description="A polished settings surface for theme, notification, and workspace experience controls."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <GlassCard className="p-6" hover={false}>
          <p className="text-xs font-semibold uppercase text-primary-500 dark:text-primary-300">Theme</p>
          <h2 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">Visual mode</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            The interface is designed dark-first with a light mode fallback for bright environments.
          </p>
          <button onClick={toggleTheme} className="btn-primary mt-6 w-full">
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {darkMode ? 'Switch to Light' : 'Switch to Dark'}
          </button>
          <div className="mt-6 rounded-lg border border-white/10 bg-gradient-to-br from-primary-500/15 to-cyan-500/10 p-5">
            <Palette className="h-6 w-6 text-cyan-300" />
            <p className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">Design tokens</p>
            <div className="mt-3 flex gap-2">
              {['bg-void-950', 'bg-primary-500', 'bg-cyan-300', 'bg-emerald-300', 'bg-pink-400'].map((color) => (
                <span key={color} className={`h-8 w-8 rounded-full border border-white/20 ${color}`} />
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6" hover={false}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-cyan-600 dark:text-cyan-200">Workspace</p>
              <h2 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">Experience controls</h2>
            </div>
            <Badge variant="cyan">Local</Badge>
          </div>
          <div className="space-y-3">
            <Toggle
              enabled={emailAlerts}
              onChange={setEmailAlerts}
              icon={Bell}
              label="Email alerts"
              description="Receive project and overdue task summaries."
            />
            <Toggle
              enabled={desktopAlerts}
              onChange={setDesktopAlerts}
              icon={ShieldCheck}
              label="Desktop notifications"
              description="Surface important task movement while you work."
            />
            <Toggle
              enabled={!reducedMotion}
              onChange={(enabled) => setReducedMotion(!enabled)}
              icon={Command}
              label="Motion effects"
              description="Use subtle transitions, hover elevation, and page movement."
            />
          </div>
        </GlassCard>
      </div>
    </PageShell>
  );
}
