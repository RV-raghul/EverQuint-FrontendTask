import { STATUSES, PRIORITIES } from '../../utils/constants'
import Button from '../../components/ui/Button'
import Select from '../../components/ui/Select'

const priorityOptions = [
  { value: '', label: 'All Priorities' },
  ...PRIORITIES.map((p) => ({ value: p, label: p })),
]

const sortOptions = [
  { value: 'updatedAt', label: 'Last Updated' },
  { value: 'createdAt', label: 'Created Date' },
  { value: 'priority', label: 'Priority' },
]

function FilterBar({ search, priority, sortBy, statuses, hasActiveFilters, updateParam, toggleStatus, clearFilters }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 mb-6 flex flex-wrap gap-3 items-end">

      {/* Search */}
      <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
        <label className="text-xs font-medium text-gray-500">Search</label>
        <input
          type="text"
          value={search}
          onChange={(e) => updateParam('search', e.target.value)}
          placeholder="Search title or description..."
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Status Multi Select */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Status</label>
        <div className="flex gap-2">
          {STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => toggleStatus(status)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                statuses.includes(status)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Priority */}
      <div className="min-w-[150px]">
        <Select
          id="priority-filter"
          label="Priority"
          value={priority}
          onChange={(e) => updateParam('priority', e.target.value)}
          options={priorityOptions}
        />
      </div>

      {/* Sort By */}
      <div className="min-w-[150px]">
        <Select
          id="sort-filter"
          label="Sort By"
          value={sortBy}
          onChange={(e) => updateParam('sortBy', e.target.value)}
          options={sortOptions}
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="destructive" size="md" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  )
}

export default FilterBar