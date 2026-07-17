import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import TaskCard from './TaskCard'
import Tag from '../../components/ui/Tag'

import { STATUS_COLORS } from '../../utils/constants'

import type { Task, TaskStatus } from '../../types/task'

interface BoardColumnProps {
  status: TaskStatus
  tasks: Task[]
  onTaskClick: (task: Task) => void
}

function BoardColumn({
  status,
  tasks,
  onTaskClick,
}: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  return (
    <div className="flex flex-col w-full min-w-[280px]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Tag
            label={status}
            color={STATUS_COLORS[status]}
          />

          <span className="text-xs text-gray-400 font-medium">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={`flex-1 rounded-2xl p-3 min-h-[400px] transition-colors ${
          isOver
            ? 'bg-indigo-50 border-2 border-dashed border-indigo-300'
            : 'bg-gray-50'
        }`}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <div className="flex items-center justify-center h-24 text-sm text-gray-400">
              No tasks here
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task)}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  )
}

export default BoardColumn