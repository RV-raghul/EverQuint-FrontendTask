import { useSearchParams } from 'react-router'
import { useMemo } from 'react'

function useFilters(tasks) {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read filters from URL
  const search = searchParams.get('search') || ''
  const priority = searchParams.get('priority') || ''
  const sortBy = searchParams.get('sortBy') || 'updatedAt'
  const statuses = searchParams.getAll('status')

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    setSearchParams(params)
  }

  function toggleStatus(status) {
    const params = new URLSearchParams(searchParams)
    const current = params.getAll('status')
    if (current.includes(status)) {
      // Remove it
      params.delete('status')
      current.filter((s) => s !== status).forEach((s) => params.append('status', s))
    } else {
      params.append('status', status)
    }
    setSearchParams(params)
  }

  function clearFilters() {
    setSearchParams({})
  }

  // Filter + sort tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks]

    // Filter by search
    if (search) {
      const lower = search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(lower) ||
          t.description.toLowerCase().includes(lower)
      )
    }

    // Filter by priority
    if (priority) {
      result = result.filter((t) => t.priority === priority)
    }

    // Filter by statuses (multi select)
    if (statuses.length > 0) {
      result = result.filter((t) => statuses.includes(t.status))
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'priority') {
        const order = { High: 0, Medium: 1, Low: 2 }
        return order[a.priority] - order[b.priority]
      }
      // createdAt or updatedAt
      return new Date(b[sortBy]) - new Date(a[sortBy])
    })

    return result
  }, [tasks, search, priority, statuses, sortBy])

  const hasActiveFilters = search || priority || statuses.length > 0

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