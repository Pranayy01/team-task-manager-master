import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useThemeStore from '../../store/themeStore';
import { getInitials } from '../../utils/helpers';

export default function Header({ onMenuClick, title }) {
  const { user, logout } = useAuthStore();
  const { darkMode, toggleTheme } = useThemeStore();
  const [profileOpen, setProfileOpen] = useState(false);

  const openCommandPalette = () => {
    window.dispatchEvent(new Event('open-command-palette'));
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-slate-50/80 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-void-950/65 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button onClick={onMenuClick} className="icon-btn lg:hidden" aria-label="Open navigation">
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-primary-600 dark:text-primary-300">Workspace</p>
            <h1 className="truncate text-xl font-bold text-slate-950 dark:text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openCommandPalette}
            className="hidden min-w-64 items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm transition hover:border-primary-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/10 dark:text-slate-400 dark:hover:border-primary-300/50 dark:hover:text-white md:flex"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search actions
            </span>
            <span className="rounded-md border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:border-white/10">
              Ctrl K
            </span>
          </button>
          <button onClick={openCommandPalette} className="icon-btn md:hidden" aria-label="Search actions">
            <Search className="h-5 w-5" />
          </button>
          <button onClick={toggleTheme} className="icon-btn" aria-label={darkMode ? 'Use light theme' : 'Use dark theme'}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="icon-btn relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-300 shadow-glow-cyan" />
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen((value) => !value)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1.5 pl-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary-300 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:border-primary-300/50"
              aria-expanded={profileOpen}
            >
              <span className="hidden sm:inline">{user?.name?.split(' ')[0]}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-cyan-300 text-xs font-bold text-void-950">
                {getInitials(user?.name)}
              </span>
              <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  className="absolute right-0 mt-2 w-60 rounded-lg border border-slate-200 bg-white p-2 shadow-panel dark:border-white/10 dark:bg-void-900"
                >
                  <div className="border-b border-slate-200 px-3 py-3 dark:border-white/10">
                    <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{user?.name}</p>
                    <p className="truncate text-xs text-slate-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
