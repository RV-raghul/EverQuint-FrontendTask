import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Card from '../../components/ui/Card'
import Tag from '../../components/ui/Tag'
import { PRIORITY_COLORS } from '../../utils/constants'
import { formatRelativeTime } from '../../utils/helpers'

function TaskCard({ task, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card className="mb-3 select-none">
        {/* Drag Handle */}
        <div
          {...listeners}
          className="flex items-center gap-1 mb-2 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-400"
          aria-label="Drag to move task"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="5" cy="4" r="1.2" />
            <circle cx="5" cy="8" r="1.2" />
            <circle cx="5" cy="12" r="1.2" />
            <circle cx="11" cy="4" r="1.2" />
            <circle cx="11" cy="8" r="1.2" />
            <circle cx="11" cy="12" r="1.2" />
          </svg>
          <span className="text-xs">drag</span>
        </div>

        {/* Title */}
        <p
  className="text-sm font-semibold text-gray-800 mb-2 cursor-pointer hover:text-indigo-600"
  onClick={(e) => {
    e.stopPropagation()
    onClick()
  }}
>
          {task.title}
        </p>

        {/* Priority Badge */}
        <div className="mb-2">
          <Tag label={task.priority} color={PRIORITY_COLORS[task.priority]} />
        </div>

        {/* Tags */}
        {task.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {task.tags.map((tag) => (
              <Tag key={tag} label={tag} color="default" />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">
            {task.assignee || 'Unassigned'}
          </span>
          <span className="text-xs text-gray-400">
            {formatRelativeTime(task.updatedAt)}
          </span>
        </div>
      </Card>
    </div>
  )
}

export default TaskCard