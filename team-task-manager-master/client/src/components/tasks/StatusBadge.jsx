import { statusColors, statusLabels } from '../../utils/helpers';

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusColors[status]}`}>
      {statusLabels[status] || status}
    </span>
  );
}
