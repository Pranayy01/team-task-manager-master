import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  CheckSquare,
  FolderKanban,
  LogOut,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
  X,
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useThemeStore from '../../store/themeStore';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const { darkMode, toggleTheme } = useThemeStore();

  const actions = useMemo(
    () => [
      { label: 'Dashboard', hint: 'Overview and analytics', icon: BarChart3, run: () => navigate('/dashboard') },
      { label: 'Projects', hint: 'Project portfolio', icon: FolderKanban, run: () => navigate('/projects') },
      { label: 'Tasks', hint: 'Board and task list', icon: CheckSquare, run: () => navigate('/tasks') },
      { label: 'Profile', hint: 'Account details', icon: User, run: () => navigate('/profile') },
      { label: 'Settings', hint: 'Workspace preferences', icon: Settings, run: () => navigate('/settings') },
      {
        label: darkMode ? 'Switch to light mode' : 'Switch to dark mode',
        hint: 'Theme',
        icon: darkMode ? Sun : Moon,
        run: toggleTheme,
      },
      { label: 'Log out', hint: 'End session', icon: LogOut, run: logout },
    ],
    [darkMode, logout, navigate, toggleTheme]
  );

  const filtered = actions.filter((item) =>
    `${item.label} ${item.hint}`.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    const handleOpen = () => setOpen(true);
    window.addEventListener('keydown', handleKey);
    window.addEventListener('open-command-palette', handleOpen);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('open-command-palette', handleOpen);
    };
  }, []);

  const runAction = (action) => {
    action.run();
    setOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-void-950/70 px-4 pt-24 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-lg border border-white/10 bg-void-900/95 shadow-panel"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search actions..."
                className="h-10 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button className="icon-btn h-8 w-8" onClick={() => setOpen(false)} aria-label="Close command palette">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto p-2 premium-scrollbar">
              {filtered.length ? (
                filtered.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      onClick={() => runAction(action)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-primary-200">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-white">{action.label}</span>
                        <span className="block truncate text-xs text-slate-500">{action.hint}</span>
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <Sparkles className="h-8 w-8 text-primary-300" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-white">No actions found</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
