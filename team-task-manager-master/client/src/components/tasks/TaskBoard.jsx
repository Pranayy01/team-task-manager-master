import { DndContext, PointerSensor, closestCorners, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { AnimatePresence, motion } from 'framer-motion';
import { Circle, CircleCheck, Clock3 } from 'lucide-react';
import TaskCard from './TaskCard';

const columns = [
  { id: 'todo', label: 'To Do', icon: Circle, tone: 'text-slate-400' },
  { id: 'in_progress', label: 'In Progress', icon: Clock3, tone: 'text-cyan-300' },
  { id: 'completed', label: 'Completed', icon: CircleCheck, tone: 'text-emerald-300' },
];

function DroppableColumn({ column, children, count }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const Icon = column.icon;

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[420px] rounded-lg border bg-white/75 p-3 shadow-sm backdrop-blur-xl transition dark:bg-white/[0.06] ${
        isOver ? 'border-primary-300/60 shadow-glow' : 'border-slate-200 dark:border-white/10'
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${column.tone}`} />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{column.label}</h3>
        </div>
        <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400">
          {count}
        </span>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DraggableTask({ task, canEdit, onStatusChange }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task._id });
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.45 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard
        task={task}
        canEdit={canEdit}
        onStatusChange={onStatusChange}
        compact
        isDragging={isDragging}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export default function TaskBoard({ tasks, canEdit, onStatusChange }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const grouped = columns.reduce((acc, column) => {
    acc[column.id] = tasks.filter((task) => task.status === column.id);
    return acc;
  }, {});

  const handleDragEnd = ({ active, over }) => {
    if (!over || !canEdit) return;
    const task = tasks.find((item) => item._id === active.id);
    const nextStatus = over.id;
    if (!task || task.status === nextStatus || !columns.some((column) => column.id === nextStatus)) return;
    onStatusChange(task._id, nextStatus);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((column) => (
          <DroppableColumn key={column.id} column={column} count={grouped[column.id].length}>
            <AnimatePresence>
              {grouped[column.id].map((task) => (
                <motion.div key={task._id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <DraggableTask task={task} canEdit={canEdit} onStatusChange={onStatusChange} />
                </motion.div>
              ))}
            </AnimatePresence>
            {!grouped[column.id].length && (
              <div className="rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-500">
                No tasks here
              </div>
            )}
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
}
