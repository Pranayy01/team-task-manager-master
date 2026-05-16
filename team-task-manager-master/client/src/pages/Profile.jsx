import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Save, ShieldCheck, UserRound } from 'lucide-react';
import { userAPI } from '../api/services';
import useAuthStore from '../store/authStore';
import { getInitials } from '../utils/helpers';
import PageShell from '../components/ui/PageShell';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const [form, setForm] = useState({ name: user?.name || '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const res = await userAPI.updateProfile({ name: form.name });
      updateUser(res.data.data);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell
      eyebrow="Account"
      title="Profile"
      description="Keep your identity clean and recognizable across projects, tasks, and team activity."
    >
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <GlassCard className="p-6" hover={false}>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-300 to-cyan-200 text-2xl font-black text-void-950 shadow-glow-cyan">
              {getInitials(user?.name)}
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">{user?.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{user?.email}</p>
            <Badge variant="primary" className="mt-4 capitalize">{user?.role}</Badge>
          </div>
          <div className="mt-8 grid gap-3">
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/70 p-3 dark:border-white/10 dark:bg-black/20">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">Secure session</p>
                <p className="text-xs text-slate-500">Token-based protected workspace</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/70 p-3 dark:border-white/10 dark:bg-black/20">
              <UserRound className="h-5 w-5 text-primary-300" />
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">Workspace role</p>
                <p className="text-xs capitalize text-slate-500">{user?.role}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6" hover={false}>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase text-primary-500 dark:text-primary-300">Profile settings</p>
            <h2 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">Personal details</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  className="input pl-10"
                  value={form.name}
                  onChange={(event) => setForm({ name: event.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input className="input bg-slate-100 pl-10 dark:bg-black/20" value={user?.email || ''} disabled />
              </div>
              <p className="mt-2 text-xs text-slate-500">Email is managed by authentication.</p>
            </div>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </GlassCard>
      </div>
    </PageShell>
  );
}
