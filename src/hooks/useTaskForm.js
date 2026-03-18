import { useState } from 'react'
import { STATUSES, PRIORITIES } from '../utils/constants'

const defaultForm = {
  title: '',
  description: '',
  status: STATUSES[0],
  priority: PRIORITIES[1],
  assignee: '',
  tags: [],
}

function validate(form) {
  const errors = {}
  if (!form.title.trim()) errors.title = 'Title is required'
  if (form.title.trim().length > 100) errors.title = 'Title must be under 100 characters'
  if (!form.status) errors.status = 'Status is required'
  if (!form.priority) errors.priority = 'Priority is required'
  return errors
}

function useTaskForm(initialValues = null) {
  const [form, setForm] = useState(initialValues || defaultForm)
  const [errors, setErrors] = useState({})
  const [isDirty, setIsDirty] = useState(false)
  const [tagInput, setTagInput] = useState('')

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setIsDirty(true)
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function handleAddTag() {
    const trimmed = tagInput.trim().toLowerCase()
    if (trimmed && !form.tags.includes(trimmed)) {
      handleChange('tags', [...form.tags, trimmed])
    }
    setTagInput('')
  }

  function handleRemoveTag(tag) {
    handleChange('tags', form.tags.filter((t) => t !== tag))
  }

  function handleTagKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  function validateForm() {
    const newErrors = validate(form)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function resetForm() {
    setForm(initialValues || defaultForm)
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