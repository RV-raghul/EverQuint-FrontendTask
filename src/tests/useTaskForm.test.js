import { renderHook, act } from '@testing-library/react'
import useTaskForm from '../hooks/useTaskForm'

describe('useTaskForm', () => {
  test('initializes with default values', () => {
    const { result } = renderHook(() => useTaskForm())
    expect(result.current.form.title).toBe('')
    expect(result.current.form.tags).toEqual([])
    expect(result.current.isDirty).toBe(false)
  })

  test('updates field and marks form as dirty', () => {
    const { result } = renderHook(() => useTaskForm())
    act(() => {
      result.current.handleChange('title', 'New Task')
    })
    expect(result.current.form.title).toBe('New Task')
    expect(result.current.isDirty).toBe(true)
  })

  test('validates empty title and returns error', () => {
    const { result } = renderHook(() => useTaskForm())
    let isValid
    act(() => {
      isValid = result.current.validateForm()
    })
    expect(isValid).toBe(false)
    expect(result.current.errors.title).toBe('Title is required')
  })

  test('adds and removes tags correctly', () => {
    const { result } = renderHook(() => useTaskForm())
    act(() => {
      result.current.handleChange('tags', ['frontend'])
    })
    expect(result.current.form.tags).toContain('frontend')

    act(() => {
      result.current.handleChange('tags', [])
    })
    expect(result.current.form.tags).toHaveLength(0)
  })

  test('resets form to default values', () => {
    const { result } = renderHook(() => useTaskForm())
    act(() => {
      result.current.handleChange('title', 'Some Task')
    })
    act(() => {
      result.current.resetForm()
    })
    expect(result.current.form.title).toBe('')
    expect(result.current.isDirty).toBe(false)
  })
})