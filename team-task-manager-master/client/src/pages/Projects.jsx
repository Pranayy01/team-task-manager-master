import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowRight, FolderKanban, Plus, Users2 } from 'lucide-react';
import { projectAPI } from '../api/services';
import useAuthStore from '../store/authStore';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import { CardSkeleton } from '../components/ui/Skeleton';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import PageShell from '../components/ui/PageShell';
import GlassCard from '../components/ui/GlassCard';
import ProgressRing from '../components/ui/ProgressRing';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const user = useAuthStore((s) => s.user);
  const canCreate = user?.role === 'admin';

  const fetchProjects = async () => {
    try {
      const res = await projectAPI.getAll();
      setProjects(res.data.data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await projectAPI.create(form);
      toast.success('Project created');
      setModalOpen(false);
      setForm({ title: '', description: '' });
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageShell title="Projects" description="Loading project portfolio...">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => <CardSkeleton key={item} />)}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Portfolio"
      title="Projects"
      description={`${projects.length} active project${projects.length === 1 ? '' : 's'} across your workspace.`}
      actions={canCreate && (
        <button onClick={() => setModalOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      )}
    >
      {projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description={canCreate ? 'Create your first project and start assigning team tasks.' : 'You have not been added to any projects yet.'}
          action={canCreate && (
            <button onClick={() => setModalOpen(true)} className="btn-primary">
              <Plus className="h-4 w-4" />
              Create Project
            </button>
          )}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const progress = project.taskCount ? (project.completedCount / project.taskCount) * 100 : 0;
            return (
              <GlassCard
                key={project._id}
                as="article"
                delay={index * 0.03}
                className="flex min-h-72 flex-col p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary-300/30 bg-primary-500/10 text-primary-500 dark:text-primary-200">
                    <FolderKanban className="h-6 w-6" />
                  </div>
                  <ProgressRing value={progress} size={68} stroke={7} tone="violet" />
                </div>
                <div className="mt-5 flex-1">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">{project.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {project.description || 'No description yet. Add context as your project evolves.'}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-white/10">
                  <span className="flex items-center gap-2">
                    <Users2 className="h-4 w-4" />
                    {project.teamMembers?.length || 0} members
                  </span>
                  <span>{project.completedCount || 0}/{project.taskCount || 0} done</span>
                </div>
                <Link to={`/projects/${project._id}`} className="btn-secondary mt-4 w-full">
                  Open project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </GlassCard>
            );
          })}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Project">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input className="input" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input" rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? <LoadingSpinner size="sm" /> : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </PageShell>
  );
}
