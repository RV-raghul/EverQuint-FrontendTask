import type { TaskPriority, TaskStatus } from '../types/task'
import type { TagColor } from '../components/ui/Tag'

export const STATUSES: TaskStatus[] = [
  'Backlog',
  'In Progress',
  'Done',
]

export const PRIORITIES: TaskPriority[] = [
  'Low',
  'Medium',
  'High',
]

export const PRIORITY_COLORS: Record<TaskPriority, TagColor> = {
  Low: 'green',
  Medium: 'yellow',
  High: 'red',
}

export const STATUS_COLORS: Record<TaskStatus, TagColor> = {
  Backlog: 'blue',
  'In Progress': 'purple',
  Done: 'green',
}

export const STORAGE_KEY = 'team_workflow_tasks'

export const SCHEMA_VERSION = 2