# Architecture Notes

## Component Hierarchy
```
App
├── Header (inline in App)
├── FilterBar
│   ├── TextInput (search)
│   ├── Select (priority, sort)
│   └── Status toggle buttons
├── BoardView
│   ├── DndContext
│   └── BoardColumn (x3)
│       └── TaskCard (x n)
└── TaskModal
    └── TaskForm
        ├── TextInput
        ├── TextArea
        ├── Select
        ├── Tag
        └── Button
```

## Storage & Migration

Tasks are stored in localStorage under the key `team_workflow_tasks`
with this shape:
```json
{
  "version": 2,
  "tasks": [
    {
      "id": "task_1234_abc",
      "title": "My Task",
      "description": "Details here",
      "status": "Backlog",
      "priority": "High",
      "assignee": "Alice",
      "tags": ["ui", "feature"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "schemaVersion": 2
    }
  ]
}
```

### Migration Strategy

| Detected Shape | Action |
|---------------|--------|
| No data in storage | Seed with sample tasks |
| Plain array (v1) | Add `tags: []` and `schemaVersion: 2` |
| Object without version | Same migration as above |
| Version 2 | Load as-is, no migration needed |

## Performance

- `useFilters` uses `useMemo` to avoid recomputing filtered tasks
  on every render
- `useMemo` uses a stable `statusKey` string instead of the raw
  array to prevent unnecessary recomputation
- `TaskContext` uses an `isLoaded` flag to prevent saving an empty
  task list to localStorage before data is loaded from storage
