import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import CommandPalette from '../ui/CommandPalette';

const pageTitles = {
  '/dashboard': 'Command Center',
  '/projects': 'Projects',
  '/tasks': 'Task Board',
  '/profile': 'Profile',
  '/settings': 'Settings',
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const title =
    pageTitles[location.pathname] ||
    (location.pathname.startsWith('/projects/') ? 'Project Details' : 'Team Task Manager');

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-void-950 dark:text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-aurora opacity-80 dark:opacity-100" />
      <div className="premium-grid pointer-events-none fixed inset-0 bg-grid-fade bg-[length:48px_48px] opacity-70 dark:opacity-100" />
      <div className="relative flex min-h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((value) => !value)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            title={title}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((value) => !value)}
          />
          <main className="flex-1 overflow-x-hidden px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            <Outlet />
          </main>
        </div>
      </div>
      <CommandPalette />
    </div>
  );
}
