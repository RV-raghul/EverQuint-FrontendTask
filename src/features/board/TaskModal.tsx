import Modal from '../../components/ui/Modal'
import TaskForm from './TaskForm'
import useTaskForm from '../../hooks/useTaskForm'
import { useTasks } from '../../store/TaskContext'
import type { Task } from '../../types/task'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  task?: Task | null
  onSuccess?: (message: string) => void
}

function TaskModal({
  isOpen,
  onClose,
  task = null,
  onSuccess,
}: TaskModalProps) {
  const { addTask, editTask, deleteTask } = useTasks()

  const isEdit = Boolean(task)

  const {
    form,
    errors,
    isDirty,
    tagInput,
    setTagInput,
    handleChange,
    handleAddTag,
    handleRemoveTag,
    handleTagKeyDown,
    validateForm,
    resetForm,
  } = useTaskForm(
    task
      ? {
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          assignee: task.assignee,
          tags: task.tags ?? [],
        }
      : null
  )

  function handleClose() {
    if (isDirty) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to close?'
      )

      if (!confirmed) return
    }

    resetForm()
    onClose()
  }

  function handleSubmit() {
    if (!validateForm()) return

    if (isEdit && task) {
      editTask(task.id, form)
      onSuccess?.('Task updated successfully!')
    } else {
      addTask(form)
      onSuccess?.('Task created successfully!')
    }

    resetForm()
    onClose()
  }

  function handleDelete() {
    if (!task) return

    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (confirmed) {
      deleteTask(task.id)
      onSuccess?.('Task deleted!')
      resetForm()
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? 'Edit Task' : 'Create New Task'}
    >
      <TaskForm
        key={task?.id ?? 'new'}
        form={form}
        errors={errors}
        tagInput={tagInput}
        setTagInput={setTagInput}
        handleChange={handleChange}
        handleAddTag={handleAddTag}
        handleRemoveTag={handleRemoveTag}
        handleTagKeyDown={handleTagKeyDown}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        onDelete={handleDelete}
        isEdit={isEdit}
      />
    </Modal>
  )
}

export default TaskModal