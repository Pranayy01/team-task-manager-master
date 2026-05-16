import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FolderKanban,
  Gauge,
  ListTodo,
  TrendingUp,
} from 'lucide-react';
import { dashboardAPI } from '../api/services';
import StatCard from '../components/dashboard/StatCard';
import StatusChart from '../components/dashboard/StatusChart';
import TaskCard from '../components/tasks/TaskCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import PageShell from '../components/ui/PageShell';
import GlassCard from '../components/ui/GlassCard';
import ProgressRing from '../components/ui/ProgressRing';
import Badge from '../components/ui/Badge';
import { formatDate } from '../utils/helpers';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await dashboardAPI.getStats();
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const dashboard = data || {};
  const stats = dashboard.stats || {};
  const statusBreakdown = dashboard.statusBreakdown || [];
  const recentTasks = dashboard.recentTasks || [];
  const myTasks = dashboard.myTasks || [];
  const overdueTasksList = dashboard.overdueTasksList || [];
  const projectSummaries = dashboard.projectSummaries || [];

  const completionRate = useMemo(() => {
    if (!stats.totalTasks) return 0;
    return (stats.completedTasks / stats.totalTasks) * 100;
  }, [stats.completedTasks, stats.totalTasks]);

  if (loading) {
    return (
      <PageShell title="Command Center" description="Loading your workspace pulse...">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => <CardSkeleton key={item} />)}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Live overview"
      title="Command Center"
      description="A polished operating view for task velocity, overdue risk, project health, and your personal queue."
      actions={
        <Link to="/tasks" className="btn-primary">
          Open board
          <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Tasks" value={stats.totalTasks || 0} tone="violet" icon={ClipboardList} detail="All workspace tasks" />
        <StatCard title="Completed" value={stats.completedTasks || 0} tone="emerald" icon={CheckCircle2} trend={`${Math.round(completionRate)}% completion`} />
        <StatCard title="Pending" value={stats.pendingTasks || 0} tone="amber" icon={Clock3} detail="Needs attention" />
        <StatCard title="Overdue" value={stats.overdueTasks || 0} tone="red" icon={AlertTriangle} detail="Elegant risk alerts" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard className="p-5" hover={false}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-primary-500 dark:text-primary-300">Analytics</p>
              <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">Task status overview</h2>
            </div>
            <Badge variant="cyan">Animated</Badge>
          </div>
          <StatusChart data={statusBreakdown} />
        </GlassCard>

        <GlassCard className="p-5" hover={false}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-cyan-600 dark:text-cyan-200">Progress</p>
              <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">Workspace health</h2>
            </div>
            <ProgressRing value={completionRate} label="Done" tone="cyan" />
          </div>
          <div className="mt-5 grid gap-3">
            {projectSummaries.slice(0, 4).map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project._id}`}
                className="rounded-lg border border-slate-200 bg-white/70 p-4 transition hover:border-primary-300 hover:bg-white dark:border-white/10 dark:bg-black/20 dark:hover:border-primary-300/50"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-semibold text-slate-950 dark:text-white">{project.title}</span>
                  <span className="text-xs text-slate-500">{project.completed}/{project.total}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-primary-400 to-cyan-300"
                    style={{ width: `${project.progress || 0}%` }}
                  />
                </div>
              </Link>
            ))}
            {!projectSummaries.length && <p className="rounded-lg border border-dashed border-white/10 p-5 text-sm text-slate-500">No projects yet</p>}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-5" hover={false}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-primary-500 dark:text-primary-300">My queue</p>
              <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">Assigned tasks</h2>
            </div>
            <ListTodo className="h-5 w-5 text-primary-300" />
          </div>
          <div className="space-y-3">
            {myTasks.length ? myTasks.slice(0, 4).map((task) => <TaskCard key={task._id} task={task} canEdit />) : (
              <p className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-white/10">No tasks assigned to you</p>
            )}
          </div>
        </GlassCard>

        <GlassCard className="p-5" hover={false}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-red-500 dark:text-red-300">Risk radar</p>
              <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">Overdue alerts</h2>
            </div>
            <AlertTriangle className="h-5 w-5 text-red-300" />
          </div>
          <div className="space-y-3">
            {overdueTasksList.length ? overdueTasksList.slice(0, 4).map((task) => <TaskCard key={task._id} task={task} />) : (
              <div className="rounded-lg border border-emerald-300/30 bg-emerald-500/10 p-6 text-sm text-emerald-700 dark:text-emerald-200">
                No overdue tasks. The workspace is in good shape.
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <GlassCard className="p-5" hover={false}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-cyan-600 dark:text-cyan-200">Recent movement</p>
              <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">Activity timeline</h2>
            </div>
            <TrendingUp className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="space-y-4">
            {recentTasks.slice(0, 6).map((task, index) => (
              <div key={task._id} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-primary-200">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  {index < recentTasks.slice(0, 6).length - 1 && <span className="mt-2 h-full w-px bg-white/10" />}
                </div>
                <div className="min-w-0 pb-5">
                  <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{task.title}</p>
                  <p className="mt-1 text-xs text-slate-500">Due {formatDate(task.dueDate)}</p>
                </div>
              </div>
            ))}
            {!recentTasks.length && <p className="text-sm text-slate-500">No activity yet</p>}
          </div>
        </GlassCard>

        <GlassCard className="p-5" hover={false}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-primary-500 dark:text-primary-300">Portfolio</p>
              <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">Project pulse</h2>
            </div>
            <FolderKanban className="h-5 w-5 text-primary-300" />
          </div>
          <div className="grid gap-3">
            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-primary-500/15 to-cyan-500/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Completion rate</p>
                  <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{Math.round(completionRate)}%</p>
                </div>
                <Gauge className="h-10 w-10 text-cyan-300" />
              </div>
            </div>
            <Link to="/projects" className="btn-secondary w-full">
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </GlassCard>
      </div>
    </PageShell>
  );
}
