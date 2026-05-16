import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, CalendarClock, Plus, UserPlus, Users2, X } from 'lucide-react';
import { projectAPI, taskAPI } from '../api/services';
import useAuthStore from '../store/authStore';
import Modal from '../components/ui/Modal';
import TaskBoard from '../components/tasks/TaskBoard';
import TaskCard from '../components/tasks/TaskCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PageShell from '../components/ui/PageShell';
import GlassCard from '../components/ui/GlassCard';
import ProgressRing from '../components/ui/ProgressRing';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import { getInitials } from '../utils/helpers';

export default function ProjectDetails() {
  const { id } = useParams();
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberModal, setMemberModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('member');
  const [taskForm, setTaskForm] = useState({
    title: '', description: '', priority: 'medium', dueDate: '', assignedTo: '', status: 'todo',
  });

  const project = data?.project;
  const userId = user?._id?.toString();
  const isProjectAdmin =
    project?.teamMembers?.some(
      (member) => member.user._id?.toString() === userId && member.role === 'admin'
    ) ||
    project?.createdBy?._id?.toString() === userId ||
    project?.createdBy?.toString() === userId ||
    user?.role === 'admin';

  const fetchData = async () => {
    try {
      const [projRes, tasksRes] = await Promise.all([
        projectAPI.getOne(id),
        taskAPI.getAll({ project: id }),
      ]);
      setData(projRes.data.data);
      setTasks(tasksRes.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const progress = useMemo(() => {
    if (!tasks.length) return 0;
    return (tasks.filter((task) => task.status === 'completed').length / tasks.length) * 100;
  }, [tasks]);

  const handleAddMember = async (event) => {
    event.preventDefault();
    try {
      await projectAPI.addMember(id, { email: memberEmail, role: memberRole });
      toast.success('Member added');
      setMemberModal(false);
      setMemberEmail('');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add member');
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!confirm('Remove this member?')) return;
    try {
      await projectAPI.removeMember(id, memberId);
      toast.success('Member removed');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove member');
    }
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();
    try {
      await taskAPI.create({ ...taskForm, project: id });
      toast.success('Task created');
      setTaskModal(false);
      setTaskForm({ title: '', description: '', priority: 'medium', dueDate: '', assignedTo: '', status: 'todo' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleStatusChange = async (taskId, status) => {
    const previous = tasks;
    setTasks((items) => items.map((item) => (item._id === taskId ? { ...item, status } : item)));
    try {
      await taskAPI.update(taskId, { status });
      toast.success('Status updated');
    } catch {
      setTasks(previous);
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  }

  if (!project) {
    return <EmptyState title="Project not found" description="The selected project could not be loaded." />;
  }

  return (
    <PageShell
      eyebrow="Project workspace"
      title={project.title}
      description={project.description || 'No project description has been added yet.'}
      actions={isProjectAdmin && (
        <>
          <button onClick={() => setMemberModal(true)} className="btn-secondary">
            <UserPlus className="h-4 w-4" />
            Add Member
          </button>
          <button onClick={() => setTaskModal(true)} className="btn-primary">
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </>
      )}
    >
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-200 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <div className="grid gap-4 lg:grid-cols-4">
        <GlassCard className="p-5" hover={false}>
          <p className="text-sm text-slate-500 dark:text-slate-400">Progress</p>
          <div className="mt-4 flex items-center justify-between">
            <ProgressRing value={progress} tone="violet" />
            <div className="text-right">
              <p className="text-3xl font-black text-slate-950 dark:text-white">{tasks.length}</p>
              <p className="text-xs text-slate-500">Total tasks</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5" hover={false}>
          <p className="text-sm text-slate-500 dark:text-slate-400">Team size</p>
          <div className="mt-6 flex items-end justify-between">
            <p className="text-4xl font-black text-slate-950 dark:text-white">{project.teamMembers?.length || 0}</p>
            <Users2 className="h-8 w-8 text-cyan-300" />
          </div>
        </GlassCard>
        <GlassCard className="p-5 lg:col-span-2" hover={false}>
          <p className="text-sm text-slate-500 dark:text-slate-400">Team avatars</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {project.teamMembers?.slice(0, 8).map((member) => (
              <div key={member.user._id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/70 px-3 py-2 dark:border-white/10 dark:bg-black/20">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-300 to-cyan-200 text-xs font-bold text-void-950">
                  {getInitials(member.user.name)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-950 dark:text-white">{member.user.name}</span>
                  <span className="block text-xs capitalize text-slate-500">{member.role}</span>
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6">
        <GlassCard className="p-5" hover={false}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-cyan-600 dark:text-cyan-200">Members</p>
              <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">Project team</h2>
            </div>
            <Badge variant="cyan">{project.teamMembers?.length || 0}</Badge>
          </div>
          <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {project.teamMembers?.map((member) => (
              <li key={member.user._id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white/70 p-3 dark:border-white/10 dark:bg-black/20">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-cyan-300 text-xs font-bold text-void-950">
                    {getInitials(member.user.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{member.user.name}</p>
                    <p className="text-xs capitalize text-slate-500">{member.role}</p>
                  </div>
                </div>
                {isProjectAdmin && member.user._id !== project.createdBy?._id && (
                  <button onClick={() => handleRemoveMember(member.user._id)} className="icon-btn h-8 w-8 text-red-500" aria-label="Remove member">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-primary-500 dark:text-primary-300">Kanban</p>
              <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">Project task board</h2>
            </div>
            <Badge variant="primary">{tasks.length} tasks</Badge>
          </div>
          {tasks.length ? (
            <TaskBoard tasks={tasks} canEdit onStatusChange={handleStatusChange} />
          ) : (
            <EmptyState
              title="No tasks in this project"
              description={isProjectAdmin ? 'Create the first task and assign it to a team member.' : 'This project has no tasks yet.'}
              action={isProjectAdmin && <button onClick={() => setTaskModal(true)} className="btn-primary"><Plus className="h-4 w-4" />Add Task</button>}
            />
          )}
        </div>
      </div>

      {tasks.length > 0 && (
        <GlassCard className="p-5" hover={false}>
          <div className="mb-4 flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-primary-300" />
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">Recent project tasks</h2>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {tasks.slice(0, 4).map((task) => (
              <TaskCard key={task._id} task={task} canEdit onStatusChange={handleStatusChange} />
            ))}
          </div>
        </GlassCard>
      )}

      <Modal isOpen={memberModal} onClose={() => setMemberModal(false)} title="Add Team Member">
        <form onSubmit={handleAddMember} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" value={memberEmail} onChange={(event) => setMemberEmail(event.target.value)} required placeholder="user@example.com" />
          </div>
          <div>
            <label className="label">Role</label>
            <select className="input" value={memberRole} onChange={(event) => setMemberRole(event.target.value)}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full">Add Member</button>
        </form>
      </Modal>

      <Modal isOpen={taskModal} onClose={() => setTaskModal(false)} title="Create Task" size="lg">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label">Title</label>
              <input className="input" value={taskForm.title} onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })} required />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Description</label>
              <textarea className="input" rows={3} value={taskForm.description} onChange={(event) => setTaskForm({ ...taskForm, description: event.target.value })} />
            </div>
            <div>
              <label className="label">Priority</label>
              <select className="input" value={taskForm.priority} onChange={(event) => setTaskForm({ ...taskForm, priority: event.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="label">Due Date</label>
              <input type="date" className="input" value={taskForm.dueDate} onChange={(event) => setTaskForm({ ...taskForm, dueDate: event.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Assign To</label>
              <select className="input" value={taskForm.assignedTo} onChange={(event) => setTaskForm({ ...taskForm, assignedTo: event.target.value })}>
                <option value="">Unassigned</option>
                {project.teamMembers?.map((member) => (
                  <option key={member.user._id} value={member.user._id}>{member.user.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full">Create Task</button>
        </form>
      </Modal>
    </PageShell>
  );
}
