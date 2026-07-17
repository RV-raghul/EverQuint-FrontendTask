import { useState } from 'react'
import type { KeyboardEvent } from 'react'

import { STATUSES, PRIORITIES } from '../utils/constants.js'
import type {
  TaskFormData,
  TaskStatus,
  TaskPriority,
} from '../types/task.js'

type FormErrors = Partial<Record<keyof TaskFormData, string>>

const defaultForm: TaskFormData = {
  title: '',
  description: '',
  status: STATUSES[0] as TaskStatus,
  priority: PRIORITIES[1] as TaskPriority,
  assignee: '',
  tags: [],
}

function validate(form: TaskFormData): FormErrors {
  const errors: FormErrors = {}

  if (!form.title.trim()) {
    errors.title = 'Title is required'
  }

  if (form.title.trim().length > 100) {
    errors.title = 'Title must be under 100 characters'
  }

  if (!form.status) {
    errors.status = 'Status is required'
  }

  if (!form.priority) {
    errors.priority = 'Priority is required'
  }

  return errors
}

function useTaskForm(initialValues: TaskFormData | null = null) {
  const [form, setForm] = useState<TaskFormData>(
    initialValues ?? defaultForm
  )

  const [errors, setErrors] = useState<FormErrors>({})
  const [isDirty, setIsDirty] = useState(false)
  const [tagInput, setTagInput] = useState('')

  function handleChange<K extends keyof TaskFormData>(
    field: K,
    value: TaskFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))

    setIsDirty(true)

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  function handleAddTag() {
    const trimmed = tagInput.trim().toLowerCase()

    if (trimmed && !form.tags.includes(trimmed)) {
      handleChange('tags', [...form.tags, trimmed])
    }

    setTagInput('')
  }

  function handleRemoveTag(tag: string) {
    handleChange(
      'tags',
      form.tags.filter((t) => t !== tag)
    )
  }

  function handleTagKeyDown(
    e: KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  function validateForm(): boolean {
    const newErrors = validate(form)
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  function resetForm() {
    setForm(initialValues ?? defaultForm)
    setErrors({})
    setIsDirty(false)
    setTagInput('')
  }

  return {
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
  }
}

export default useTaskForm