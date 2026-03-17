import { formatDistanceToNow } from 'date-fns'

export function generateId() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function formatRelativeTime(dateStr) {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
  } catch {
    return 'Unknown time'
  }
}

export function createTask({ title, description, status, priority, assignee, tags }) {
  const now = new Date().toISOString()
  return {
    id: generateId(),
    title,
    description,
    status,
    priority,
    assignee,
    tags,
    createdAt: now,
    updatedAt: now,
    schemaVersion: 2,
  }
}

export function updateTask(existingTask, updates) {
  return {
    ...existingTask,
    ...updates,
    updatedAt: new Date().toISOString(),
  }
}