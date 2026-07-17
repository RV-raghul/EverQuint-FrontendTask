import { useState } from 'react'
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'

import BoardColumn from './BoardColumn'
import TaskCard from './TaskCard'
import { STATUSES } from '../../utils/constants'
import { useTasks } from '../../store/TaskContext'

import type { Task } from '../../types/task'

interface BoardViewProps {
  tasks: Task[]
  onTaskClick: (task: Task) => void
}

function BoardView({ tasks, onTaskClick }: BoardViewProps) {
  const { moveTask } = useTasks()

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  function handleDragStart(event: DragStartEvent) {
    const { active } = event

    const task = tasks.find((t) => t.id === active.id)

    setActiveTask(task ?? null)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    setActiveTask(null)

    if (!over) return

    const overStatus = STATUSES.includes(over.id as (typeof STATUSES)[number])
      ? (over.id as (typeof STATUSES)[number])
      : tasks.find((t) => t.id === over.id)?.status

    if (overStatus && active.id !== over.id) {
      moveTask(String(active.id), overStatus)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATUSES.map((status) => (
          <BoardColumn
            key={status}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-2 scale-105">
            <TaskCard task={activeTask} onClick={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default BoardView