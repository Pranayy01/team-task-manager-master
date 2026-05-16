export const formatDate = (date) => {
  if (!date) return 'No due date';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === 'completed') return false;
  return new Date(dueDate) < new Date();
};

export const statusLabels = {
  todo: 'To Do',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export const priorityColors = {
  low: 'border-emerald-300/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200',
  medium: 'border-amber-300/40 bg-amber-500/10 text-amber-700 dark:text-amber-200',
  high: 'border-red-300/40 bg-red-500/10 text-red-700 dark:text-red-200',
};

export const statusColors = {
  todo: 'border-slate-300/40 bg-slate-500/10 text-slate-700 dark:text-slate-200',
  in_progress: 'border-cyan-300/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-200',
  completed: 'border-emerald-300/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200',
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
