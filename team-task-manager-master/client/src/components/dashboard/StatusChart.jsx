import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#94a3b8', '#22d3ee', '#34d399'];
const LABELS = { todo: 'To Do', in_progress: 'In Progress', completed: 'Completed' };

export default function StatusChart({ data }) {
  const chartData = (data || []).map((item) => ({
    name: LABELS[item._id] || item._id,
    value: item.count,
  }));

  if (!chartData.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-white/10 text-sm text-slate-500">
        No task data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <defs>
          {COLORS.map((color, index) => (
            <linearGradient key={color} id={`status-${index}`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.95} />
              <stop offset="100%" stopColor={color} stopOpacity={0.45} />
            </linearGradient>
          ))}
        </defs>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={102}
          paddingAngle={5}
          dataKey="value"
          animationDuration={900}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={`url(#status-${index % COLORS.length})`} stroke="rgba(255,255,255,0.08)" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'rgba(3, 4, 10, 0.92)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8,
            color: '#fff',
          }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend iconType="circle" wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
