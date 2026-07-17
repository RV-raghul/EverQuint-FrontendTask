import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

import type { Task, TaskPriority, TaskStatus } from '../types/task'

type SortField = 'updatedAt' | 'createdAt' | 'priority'

function useFilters(tasks: Task[]) {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const priority = (searchParams.get('priority') ?? '') as '' | TaskPriority
  const sortBy = (searchParams.get('sortBy') ?? 'updatedAt') as SortField
  const statuses = searchParams.getAll('status') as TaskStatus[]

  // Stable dependency for useMemo
  const statusKey = statuses.join(',')

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    setSearchParams(params)
  }

  function toggleStatus(status: TaskStatus) {
    const params = new URLSearchParams(searchParams)
    const current = params.getAll('status')

    if (current.includes(status)) {
      params.delete('status')

      current
        .filter((s) => s !== status)
        .forEach((s) => params.append('status', s))
    } else {
      params.append('status', status)
    }

    setSearchParams(params)
  }

  function clearFilters() {
    setSearchParams({})
  }

  const filteredTasks = useMemo(() => {
    let result = [...tasks]

    if (search) {
      const lower = search.toLowerCase()

      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(lower) ||
          task.description.toLowerCase().includes(lower)
      )
    }

    if (priority) {
      result = result.filter((task) => task.priority === priority)
    }

    if (statuses.length > 0) {
      result = result.filter((task) =>
        statuses.includes(task.status)
      )
    }

    result.sort((a, b) => {
      if (sortBy === 'priority') {
        const order: Record<TaskPriority, number> = {
          High: 0,
          Medium: 1,
          Low: 2,
        }

        return order[a.priority] - order[b.priority]
      }

      return (
        new Date(b[sortBy]).getTime() -
        new Date(a[sortBy]).getTime()
      )
    })

    return result
  }, [tasks, search, priority, statusKey, sortBy])

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(priority) ||
    statuses.length > 0

  return {
    search,
    priority,
    sortBy,
    statuses,
    filteredTasks,
    hasActiveFilters,
    updateParam,
    toggleStatus,
    clearFilters,
  }
}

export default useFilters