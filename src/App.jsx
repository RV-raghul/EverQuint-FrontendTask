import { useState } from 'react'
import BoardView from './features/board/BoardView'
import TaskModal from './features/board/TaskModal'
import FilterBar from './features/board/FilterBar'
import { useTasks } from './store/TaskContext'
import useFilters from './hooks/useFilters'
import Button from './components/ui/Button'
import Toast from './components/ui/Toast'

function App() {
  const { tasks, migrated, setMigrated, storageError } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [toast, setToast] = useState(null)

  const {
    search,
    priority,
    sortBy,
    statuses,
    filteredTasks,
    hasActiveFilters,
    updateParam,
    toggleStatus,
    clearFilters,
  } = useFilters(tasks)

  function handleTaskClick(task) {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  function handleNewTask() {
    setSelectedTask(null)
    setIsModalOpen(true)
  }

  function handleModalClose() {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  function handleSuccess(message) {
    setToast({ message, type: 'success' })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600">
          Team Workflow Board
        </h1>
        <Button variant="primary" size="md" onClick={handleNewTask}>
          + New Task
        </Button>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        {storageError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            ⚠️ Storage is unavailable. Changes will not be saved.
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          search={search}
          priority={priority}
          sortBy={sortBy}
          statuses={statuses}
          hasActiveFilters={hasActiveFilters}
          updateParam={updateParam}
          toggleStatus={toggleStatus}
          clearFilters={clearFilters}
        />

        {/* Empty State — filters hiding all tasks */}
        {filteredTasks.length === 0 && tasks.length > 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-lg font-medium">No tasks match your filters</p>
            <p className="text-sm mt-1">Try adjusting or clearing your filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-indigo-500 text-sm underline hover:text-indigo-700"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Empty State — no tasks at all */}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-lg font-medium">No tasks yet</p>
            <p className="text-sm mt-1">Click "+ New Task" to get started</p>
          </div>
        )}

        {/* Board */}
        {filteredTasks.length > 0 && (
          <BoardView
            tasks={filteredTasks}
            onTaskClick={handleTaskClick}
          />
        )}
      </main>

      {/* Task Modal */}
      <TaskModal
         key={selectedTask?.id || 'new'}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        task={selectedTask}
        onSuccess={handleSuccess}
      />

      {/* Migration Toast */}
      {migrated && (
        <Toast
          message="Your data was migrated to the latest version ✓"
          type="info"
          onClose={() => setMigrated(false)}
        />
      )}

      {/* Action Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default App