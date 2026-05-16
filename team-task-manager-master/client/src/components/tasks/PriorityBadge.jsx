import { priorityColors } from '../../utils/helpers';

export default function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${priorityColors[priority]}`}>
      {priority}
    </span>
  );
}
