import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { loadTasksFromStorage, saveTasksToStorage } from '../utils/migration'
import { createTask, updateTask } from '../utils/helpers'

const TaskContext = createContext(null)

function taskReducer(state, action) {
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

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, [])
  const [migrated, setMigrated] = useState(false)
  const [storageError, setStorageError] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const { tasks: loaded, migrated: wasMigrated, error } = loadTasksFromStorage()
    dispatch({ type: 'SET_TASKS', payload: loaded })
    if (wasMigrated) setMigrated(true)
    if (error) setStorageError(true)
  }, [])

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length >= 0) {
      saveTasksToStorage(tasks)
    }
  }, [tasks])

  function addTask(data) {
    const task = createTask(data)
    dispatch({ type: 'ADD_TASK', payload: task })
    return task
  }

  function editTask(id, updates) {
    const existing = tasks.find((t) => t.id === id)
    if (!existing) return
    const updated = updateTask(existing, updates)
    dispatch({ type: 'UPDATE_TASK', payload: updated })
  }

  function deleteTask(id) {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }

  function moveTask(id, status) {
    dispatch({ type: 'MOVE_TASK', payload: { id, status } })
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, moveTask, migrated, setMigrated, storageError }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTasks must be used within TaskProvider')
  return context
}