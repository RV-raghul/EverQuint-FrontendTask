import Modal from '../../components/ui/Modal'
import TaskForm from './TaskForm'
import useTaskForm from '../../hooks/useTaskForm'
import { useTasks } from '../../store/TaskContext'

function TaskModal({ isOpen, onClose, task = null, onSuccess }) {
  const { addTask, editTask } = useTasks()
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
          tags: task.tags || [],
        }
      : null
  )

  function handleClose() {
    if (isDirty) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to close?')
      if (!confirm) return
    }
    resetForm()
    onClose()
  }

  function handleSubmit() {
    if (!validateForm()) return

    if (isEdit) {
      editTask(task.id, form)
      onSuccess?.('Task updated successfully!')
    } else {
      addTask(form)
      onSuccess?.('Task created successfully!')
    }

    resetForm()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? 'Edit Task' : 'Create New Task'}
    >
      <TaskForm
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
        isEdit={isEdit}
      />
    </Modal>
  )
}

export default TaskModal