import { formatDistanceToNow } from 'date-fns'

import type { Task, TaskFormData } from '../types/task.js'

export function generateId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function formatRelativeTime(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), {
      addSuffix: true,
    })
  } catch {
    return 'Unknown time'
  }
}

export function createTask(data: TaskFormData): Task {
  const now = new Date().toISOString()

  return {
    id: generateId(),
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    assignee: data.assignee,
    tags: data.tags,
    createdAt: now,
    updatedAt: now,
    schemaVersion: 2,
  }
}

export function updateTask(
  existingTask: Task,
  updates: Partial<TaskFormData>
): Task {
  return {
    ...existingTask,
    ...updates,
    updatedAt: new Date().toISOString(),
  }
}