import { SCHEMA_VERSION, STORAGE_KEY } from './constants'

// Sample seed tasks for first time load
const seedTasks = [
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

// Migration from v1 to v2
// v1 didn't have tags or schemaVersion field
function migrateV1ToV2(tasks) {
  return tasks.map((task) => ({
    ...task,
    tags: task.tags || [],
    schemaVersion: 2,
  }))
}

export function loadTasksFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    // First time — seed with sample data
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: SCHEMA_VERSION, tasks: seedTasks })
      )
      return { tasks: seedTasks, migrated: false }
    }

    const parsed = JSON.parse(raw)

    // v1 shape: tasks were stored as plain array
    if (Array.isArray(parsed)) {
      const migrated = migrateV1ToV2(parsed)
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: SCHEMA_VERSION, tasks: migrated })
      )
      return { tasks: migrated, migrated: true }
    }

    // v1 shape: object but no version field
    if (!parsed.version || parsed.version < 2) {
      const migrated = migrateV1ToV2(parsed.tasks || [])
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: SCHEMA_VERSION, tasks: migrated })
      )
      return { tasks: migrated, migrated: true }
    }

    // Already v2 — return as is
    return { tasks: parsed.tasks || [], migrated: false }
  } catch (err) {
    console.error('Storage read failed:', err)
    return { tasks: [], migrated: false, error: true }
  }
}

export function saveTasksToStorage(tasks) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: SCHEMA_VERSION, tasks })
    )
  } catch (err) {
    console.error('Storage write failed:', err)
  }
}