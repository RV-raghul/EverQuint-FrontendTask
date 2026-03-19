import { generateId, createTask, updateTask } from '../utils/helpers'

describe('helpers', () => {
  test('generateId returns a unique string', () => {
    const id1 = generateId()
    const id2 = generateId()
    expect(id1).not.toBe(id2)
    expect(id1).toContain('task_')
  })

  test('createTask returns a task with correct shape', () => {
    const task = createTask({
      title: 'Test Task',
      description: 'A description',
      status: 'Backlog',
      priority: 'High',
      assignee: 'Alice',
      tags: ['test'],
    })
    expect(task.title).toBe('Test Task')
    expect(task.status).toBe('Backlog')
    expect(task.priority).toBe('High')
    expect(task.tags).toEqual(['test'])
    expect(task.id).toBeDefined()
    expect(task.createdAt).toBeDefined()
    expect(task.updatedAt).toBeDefined()
  })


  test('updateTask merges updates and refreshes updatedAt', async () => {
    const original = createTask({
      title: 'Old Title',
      description: '',
      status: 'Backlog',
      priority: 'Low',
      assignee: '',
      tags: [],
    })

    // Wait 1ms so updatedAt is guaranteed to be different
    await new Promise((resolve) => setTimeout(resolve, 1))

    const updated = updateTask(original, { title: 'New Title' })
    expect(updated.title).toBe('New Title')
    expect(updated.id).toBe(original.id)
    expect(updated.updatedAt).not.toBe(original.updatedAt)
  })
})