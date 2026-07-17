import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import { loadTasksFromStorage, saveTasksToStorage } from '../utils/migration.js'
import { createTask, updateTask } from '../utils/helpers.js'

import type {
  Task,
  TaskFormData,
  TaskStatus,
} from '../types/task.js'

interface TaskContextType {
  tasks: Task[]
  addTask: (data: TaskFormData) => Task
  editTask: (id: string, updates: Partial<TaskFormData>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, status: TaskStatus) => void
  migrated: boolean
  setMigrated: React.Dispatch<React.SetStateAction<boolean>>
  storageError: boolean
}

interface TaskProviderProps {
  children: ReactNode
}

type TaskAction =
  | {
      type: 'SET_TASKS'
      payload: Task[]
    }
  | {
      type: 'ADD_TASK'
      payload: Task
    }
  | {
      type: 'UPDATE_TASK'
      payload: Task
    }
  | {
      type: 'DELETE_TASK'
      payload: string
    }
  | {
      type: 'MOVE_TASK'
      payload: {
        id: string
        status: TaskStatus
      }
    }

const TaskContext = createContext<TaskContextType | undefined>(undefined)

function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload

    case 'ADD_TASK':
      return [...state, action.payload]

    case 'UPDATE_TASK':
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      )

    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload)

    case 'MOVE_TASK':
      return state.map((task) =>
        task.id === action.payload.id
          ? updateTask(task, { status: action.payload.status })
          : task
      )

    default:
      return state
  }
}

export function TaskProvider({
  children,
}: TaskProviderProps) {
  const [tasks, dispatch] = useReducer(taskReducer, [])

  const [migrated, setMigrated] = useState(false)
  const [storageError, setStorageError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const {
      tasks: loaded,
      migrated: wasMigrated,
      error,
    } = loadTasksFromStorage()

    dispatch({
      type: 'SET_TASKS',
      payload: loaded,
    })

    if (wasMigrated) setMigrated(true)
    if (error) setStorageError(true)

    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    saveTasksToStorage(tasks)
  }, [tasks, isLoaded])

  function addTask(data: TaskFormData): Task {
    const task = createTask(data)

    dispatch({
      type: 'ADD_TASK',
      payload: task,
    })

    return task
  }

  function editTask(
    id: string,
    updates: Partial<TaskFormData>
  ) {
    const existing = tasks.find((t) => t.id === id)

    if (!existing) return

    const updated = updateTask(existing, updates)

    dispatch({
      type: 'UPDATE_TASK',
      payload: updated,
    })
  }

  function deleteTask(id: string) {
    dispatch({
      type: 'DELETE_TASK',
      payload: id,
    })
  }

  function moveTask(
    id: string,
    status: TaskStatus
  ) {
    dispatch({
      type: 'MOVE_TASK',
      payload: {
        id,
        status,
      },
    })
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        moveTask,
        migrated,
        setMigrated,
        storageError,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks(): TaskContextType {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error(
      'useTasks must be used within TaskProvider'
    )
  }

  return context
}