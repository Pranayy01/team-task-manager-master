import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Edit3, Filter, LayoutGrid, ListFilter, Plus, Search, Trash2 } from 'lucide-react';
import { projectAPI, taskAPI } from '../api/services';
import useAuthStore from '../store/authStore';
import TaskBoard from '../components/tasks/TaskBoard';
import TaskCard from '../components/tasks/TaskCard';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import { TaskSkeleton } from '../components/ui/Skeleton';
import PageShell from '../components/ui/PageShell';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PriorityBadge from '../components/tasks/PriorityBadge';
import StatusBadge from '../components/tasks/StatusBadge';
import { formatDate } from '../utils/helpers';

export default function Tasks() {
  const user = useAuthStore((s) => s.user);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('board');
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', project: '', sort: '-createdAt' });
  const [editModal, setEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const canManage = user?.role === 'admin';

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = { ...filters };
      if (params.search === '') delete params.search;
      if (params.status === '') delete params.status;
      if (params.priority === '') delete params.priority;
      if (params.project === '') delete params.project;
      const res = await taskAPI.getAll(params);
      setTasks(res.data.data);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    projectAPI.getAll().then((result) => setProjects(result.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchTasks, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleStatusChange = async (taskId, status) => {
    const previous = tasks;
    setTasks((items) => items.map((item) => (item._id === taskId ? { ...item, status } : item)));
    try {
      await taskAPI.update(taskId, { status });
      toast.success('Status updated');
    } catch (err) {
      setTasks(previous);
      toast.error(err.response?.data?.message || 'Failed to update');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    try {
      await taskAPI.delete(id);
      toast.success('Task deleted');
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  };

  const openEdit = (task) => {
    setEditingTask({ ...task, dueDate: task.dueDate ? task.dueDate.split('T')[0] : '' });
    setEditModal(true);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      await taskAPI.update(editingTask._id, {
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate || undefined,
        status: editingTask.status,
        assignedTo: editingTask.assignedTo?._id || editingTask.assignedTo || undefined,
      });
      toast.success('Task updated');
      setEditModal(false);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    }
  };

  const activeFilters = useMemo(
    () => Object.entries(filters).filter(([key, value]) => key !== 'sort' && value).length,
    [filters]
  );

  return (
    <PageShell
      eyebrow="Execution"
      title="Task Board"
      description="Search, filter, drag status lanes, and switch into a clean table when you need dense review."
      actions={
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/10">
          <button
            onClick={() => setViewMode('board')}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
              viewMode === 'board' ? 'bg-primary-500 text-white' : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            Board
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
              viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <ListFilter className="h-4 w-4" />
            Table
          </button>
        </div>
      }
    >
      <div className="rounded-lg border border-slate-200 bg-white/85 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.075]">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <div className="relative xl:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              className="input pl-10"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(event) => setFilters({ ...filters, search: event.target.value })}
            />
          </div>
          <select className="input" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select className="input" value={filters.priority} onChange={(event) => setFilters({ ...filters, priority: event.target.value })}>
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select className="input" value={filters.project} onChange={(event) => setFilters({ ...filters, project: event.target.value })}>
            <option value="">All Projects</option>
            {projects.map((project) => <option key={project._id} value={project._id}>{project.title}</option>)}
          </select>
          <select className="input" value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value })}>
            <option value="-createdAt">Newest</option>
            <option value="dueDate">Due Date Asc</option>
            <option value="-dueDate">Due Date Desc</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5" />
            {activeFilters} active filter{activeFilters === 1 ? '' : 's'}
          </span>
          <span>{tasks.length} task{tasks.length === 1 ? '' : 's'}</span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3, 4].map((item) => <TaskSkeleton key={item} />)}</div>
      ) : tasks.length === 0 ? (
        <EmptyState title="No tasks found" description="Try adjusting your filters or create tasks from a project detail page." />
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === 'board' ? (
            <motion.div key="board" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <TaskBoard tasks={tasks} canEdit onStatusChange={handleStatusChange} />
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white/85 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.075] md:block">
                <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-white/10">
                  <thead className="bg-slate-100/70 text-left text-xs font-semibold uppercase text-slate-500 dark:bg-white/5">
                    <tr>
                      <th className="px-4 py-3">Task</th>
                      <th className="px-4 py-3">Project</th>
                      <th className="px-4 py-3">Priority</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Due</th>
                      {canManage && <th className="px-4 py-3 text-right">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                    {tasks.map((task) => (
                      <tr key={task._id} className="transition hover:bg-slate-50 dark:hover:bg-white/5">
                        <td className="max-w-xs px-4 py-4">
                          <p className="truncate font-semibold text-slate-950 dark:text-white">{task.title}</p>
                          <p className="mt-1 truncate text-xs text-slate-500">{task.description || 'No description'}</p>
                        </td>
                        <td className="px-4 py-4 text-slate-500">{typeof task.project === 'object' ? task.project.title : task.project || 'Unassigned'}</td>
                        <td className="px-4 py-4"><PriorityBadge priority={task.priority} /></td>
                        <td className="px-4 py-4"><StatusBadge status={task.status} /></td>
                        <td className="px-4 py-4 text-slate-500">{formatDate(task.dueDate)}</td>
                        {canManage && (
                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => openEdit(task)} className="icon-btn h-8 w-8" aria-label="Edit task"><Edit3 className="h-4 w-4" /></button>
                              <button onClick={() => handleDelete(task._id)} className="icon-btn h-8 w-8 text-red-500" aria-label="Delete task"><Trash2 className="h-4 w-4" /></button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="space-y-3 md:hidden">
                {tasks.map((task) => (
                  <TaskCard key={task._id} task={task} canEdit onStatusChange={handleStatusChange} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Task" size="lg">
        {editingTask && (
          <form onSubmit={handleEdit} className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input className="input" value={editingTask.title} onChange={(event) => setEditingTask({ ...editingTask, title: event.target.value })} required />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea className="input" rows={3} value={editingTask.description || ''} onChange={(event) => setEditingTask({ ...editingTask, description: event.target.value })} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Priority</label>
                <select className="input" value={editingTask.priority} onChange={(event) => setEditingTask({ ...editingTask, priority: event.target.value })}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="label">Status</label>
                <select className="input" value={editingTask.status} onChange={(event) => setEditingTask({ ...editingTask, status: event.target.value })}>
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="label">Due Date</label>
                <input type="date" className="input" value={editingTask.dueDate} onChange={(event) => setEditingTask({ ...editingTask, dueDate: event.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">
              <Plus className="h-4 w-4" />
              {editingTask ? 'Save Changes' : <LoadingSpinner size="sm" />}
            </button>
          </form>
        )}
      </Modal>
    </PageShell>
  );
}
