import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Settings,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { getInitials } from '../../utils/helpers';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose, collapsed, onToggleCollapse }) {
  const user = useAuthStore((s) => s.user);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-void-950/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-label="Close navigation"
        />
      )}
      <motion.aside
        animate={{ width: collapsed ? 88 : 280 }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        className={`fixed inset-y-0 left-0 z-50 flex transform flex-col border-r border-white/10 bg-void-950/88 shadow-panel backdrop-blur-2xl transition-transform lg:sticky lg:top-0 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between px-4">
          <NavLink to="/dashboard" onClick={onClose} className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary-300/30 bg-primary-500/15 text-primary-100 shadow-glow">
              <Sparkles className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">Team Task</p>
                <p className="truncate text-xs text-slate-500">Manager Pro</p>
              </div>
            )}
          </NavLink>
          <button className="icon-btn h-9 w-9 lg:hidden" onClick={onClose} aria-label="Close navigation">
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition duration-200 ${
                    isActive
                      ? 'border border-primary-300/30 bg-primary-500/15 text-white shadow-glow'
                      : 'border border-transparent text-slate-400 hover:border-white/10 hover:bg-white/10 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-white/10 p-3">
          <button
            onClick={onToggleCollapse}
            className="hidden w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 lg:flex"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
          <div className={`flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-cyan-300 text-sm font-bold text-void-950">
              {getInitials(user?.name)}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
                <p className="truncate text-xs capitalize text-slate-500">{user?.role}</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
