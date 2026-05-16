import { motion } from 'framer-motion';
import { CalendarClock, FolderKanban, GripVertical } from 'lucide-react';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import { formatDate, getInitials, isOverdue } from '../../utils/helpers';

export default function TaskCard({
  task,
  onStatusChange,
  canEdit = false,
  compact = false,
  dragHandleProps,
  isDragging = false,
}) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <motion.article
      layout
      whileHover={{ y: -3 }}
      className={`group rounded-lg border bg-white/90 p-4 shadow-sm backdrop-blur-xl transition dark:bg-white/[0.075] ${
        overdue
          ? 'border-red-300/40 dark:border-red-400/30'
          : 'border-slate-200 dark:border-white/10'
      } ${isDragging ? 'rotate-1 shadow-glow' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {dragHandleProps && (
              <button
                className="cursor-grab rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:cursor-grabbing dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Drag task"
                {...dragHandleProps}
              >
                <GripVertical className="h-4 w-4" />
              </button>
            )}
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={task.status} />
            {overdue && (
              <span className="inline-flex rounded-full border border-red-300/40 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-700 dark:text-red-200">
                Overdue
              </span>
            )}
          </div>
          <h3 className={`${compact ? 'line-clamp-2' : 'truncate'} text-sm font-bold text-slate-950 dark:text-white`}>{task.title}</h3>
          {task.description && !compact && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{task.description}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            {task.project && (
              <span className="flex items-center gap-1.5">
                <FolderKanban className="h-3.5 w-3.5" />
                {typeof task.project === 'object' ? task.project.title : task.project}
              </span>
            )}
            <span className={`flex items-center gap-1.5 ${overdue ? 'font-semibold text-red-600 dark:text-red-300' : ''}`}>
              <CalendarClock className="h-3.5 w-3.5" />
              {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          {task.assignedTo && (
            <div
              className={`${compact ? 'h-8 w-8' : 'h-9 w-9'} flex items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-cyan-300 text-xs font-bold text-void-950 shadow-glow-cyan`}
              title={task.assignedTo.name}
            >
              {getInitials(task.assignedTo.name)}
            </div>
          )}
          {canEdit && onStatusChange && !compact && (
            <select
              value={task.status}
              onChange={(event) => onStatusChange(task._id, event.target.value)}
              className="input w-32 py-1.5 text-xs"
              aria-label="Task status"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          )}
        </div>
      </div>
      {canEdit && onStatusChange && compact && (
        <select
          value={task.status}
          onChange={(event) => onStatusChange(task._id, event.target.value)}
          className="input mt-3 w-full py-1.5 text-xs"
          aria-label="Task status"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      )}
    </motion.article>
  );
}
