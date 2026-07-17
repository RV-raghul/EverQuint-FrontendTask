import { useState } from 'react'
import BoardView from './features/board/BoardView.js'
import TaskModal from './features/board/TaskModal.js'
import FilterBar from './features/board/FilterBar.js'
import { useTasks } from './store/TaskContext.js'
import useFilters from './hooks/useFilters.js'
import Button from './components/ui/Button.js'
import Toast from './components/ui/Toast.js'
import type { Task } from './types/task'

type ToastState = {
  message: string
  type: 'success' | 'info' | 'error' | 'warning'
}

function App() {
  const { tasks, migrated, setMigrated, storageError } = useTasks()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [toast, setToast] = useState<ToastState | null>(null)

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

  function handleTaskClick(task: Task) {
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

  function handleSuccess(message: string) {
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

        {filteredTasks.length === 0 && tasks.length > 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-lg font-medium">
              No tasks match your filters
            </p>
            <p className="text-sm mt-1">
              Try adjusting or clearing your filters
            </p>

            <button
              onClick={clearFilters}
              className="mt-4 text-indigo-500 text-sm underline hover:text-indigo-700"
            >
              Clear all filters
            </button>
          </div>
        )}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-lg font-medium">No tasks yet</p>
            <p className="text-sm mt-1">
              Click "+ New Task" to get started
            </p>
          </div>
        )}

        {filteredTasks.length > 0 && (
          <BoardView
            tasks={filteredTasks}
            onTaskClick={handleTaskClick}
          />
        )}
      </main>

      <TaskModal
        key={selectedTask?.id ?? 'new'}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        task={selectedTask}
        onSuccess={handleSuccess}
      />

      {migrated && (
        <Toast
          message="Your data was migrated to the latest version ✓"
          type="info"
          onClose={() => setMigrated(false)}
        />
      )}

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