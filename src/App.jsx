import { useState } from 'react'
import BoardView from './features/board/BoardView'
import { useTasks } from './store/TaskContext'
import Button from './components/ui/Button'
import Toast from './components/ui/Toast'

function App() {
  const { tasks, migrated, setMigrated, storageError } = useTasks()
  const [selectedTask, setSelectedTask] = useState(null)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600">
          Team Workflow Board
        </h1>
        <Button variant="primary" size="md">
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

        <BoardView
          tasks={tasks}
          onTaskClick={(task) => setSelectedTask(task)}
        />
      </main>

      {/* Migration Toast */}
      {migrated && (
        <Toast
          message="Your data was migrated to the latest version ✓"
          type="info"
          onClose={() => setMigrated(false)}
        />
      )}
    </div>
  )
}

export default App