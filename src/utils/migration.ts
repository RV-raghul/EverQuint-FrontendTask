import { SCHEMA_VERSION, STORAGE_KEY } from './constants.ts'
import type { Task } from '../types/task.js'

// Sample seed tasks for first time load
const seedTasks: Task[] = [
  {
    id: '1',
    title: 'Setup project structure',
    description: 'Initialize Vite, Tailwind and folder structure',
    status: 'Done',
    priority: 'High',
    assignee: 'Alice',
    tags: ['setup', 'infra'],
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
    schemaVersion: 2,
  },
  {
    id: '2',
    title: 'Build UI components',
    description: 'Button, Modal, Card, Toast and other base components',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Bob',
    tags: ['ui', 'components'],
    createdAt: new Date('2024-01-02').toISOString(),
    updatedAt: new Date('2024-01-02').toISOString(),
    schemaVersion: 2,
  },
  {
    id: '3',
    title: 'Implement drag and drop',
    description: 'Use dnd-kit to move tasks between columns',
    status: 'Backlog',
    priority: 'High',
    assignee: 'Charlie',
    tags: ['feature', 'ux'],
    createdAt: new Date('2024-01-03').toISOString(),
    updatedAt: new Date('2024-01-03').toISOString(),
    schemaVersion: 2,
  },
]

interface StorageData {
  version: number
  tasks: Task[]
}

interface LoadTasksResult {
  tasks: Task[]
  migrated: boolean
  error?: boolean
}

// Migration from v1 to v2
function migrateV1ToV2(tasks: Partial<Task>[]): Task[] {
  return tasks.map(
    (task) =>
      ({
        ...task,
        tags: task.tags ?? [],
        schemaVersion: 2,
      }) as Task
  )
}

export function loadTasksFromStorage(): LoadTasksResult {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    // First time load
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: SCHEMA_VERSION,
          tasks: seedTasks,
        })
      )

      return {
        tasks: seedTasks,
        migrated: false,
      }
    }

    const parsed: unknown = JSON.parse(raw)

    // Old v1 format (array)
    if (Array.isArray(parsed)) {
      const migrated = migrateV1ToV2(parsed)

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: SCHEMA_VERSION,
          tasks: migrated,
        })
      )

      return {
        tasks: migrated,
        migrated: true,
      }
    }

    const storage = parsed as Partial<StorageData>

    // Old object format without version
    if (!storage.version || storage.version < 2) {
      const migrated = migrateV1ToV2(storage.tasks ?? [])

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: SCHEMA_VERSION,
          tasks: migrated,
        })
      )

      return {
        tasks: migrated,
        migrated: true,
      }
    }

    return {
      tasks: storage.tasks ?? [],
      migrated: false,
    }
  } catch (err) {
    console.error('Storage read failed:', err)

    return {
      tasks: [],
      migrated: false,
      error: true,
    }
  }
}

export function saveTasksToStorage(tasks: Task[]): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: SCHEMA_VERSION,
        tasks,
      })
    )
  } catch (err) {
    console.error('Storage write failed:', err)
  }
}