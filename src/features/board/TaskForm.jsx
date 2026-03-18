import TextInput from '../../components/ui/TextInput'
import TextArea from '../../components/ui/TextArea'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import Tag from '../../components/ui/Tag'
import { STATUSES, PRIORITIES } from '../../utils/constants'

const statusOptions = STATUSES.map((s) => ({ value: s, label: s }))
const priorityOptions = PRIORITIES.map((p) => ({ value: p, label: p }))

function TaskForm({ form, errors, tagInput, setTagInput, handleChange, handleAddTag, handleRemoveTag, handleTagKeyDown, onSubmit, onCancel, isEdit }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <TextInput
        id="title"
        label="Title *"
        placeholder="Enter task title"
        value={form.title}
        onChange={(e) => handleChange('title', e.target.value)}
        error={errors.title}
      />

      {/* Description */}
      <TextArea
        id="description"
        label="Description"
        placeholder="Enter task description"
        value={form.description}
        onChange={(e) => handleChange('description', e.target.value)}
        rows={3}
      />

      {/* Status & Priority */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          id="status"
          label="Status *"
          value={form.status}
          onChange={(e) => handleChange('status', e.target.value)}
          options={statusOptions}
          error={errors.status}
        />
        <Select
          id="priority"
          label="Priority *"
          value={form.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          options={priorityOptions}
          error={errors.priority}
        />
      </div>

      {/* Assignee */}
      <TextInput
        id="assignee"
        label="Assignee"
        placeholder="Enter assignee name"
        value={form.assignee}
        onChange={(e) => handleChange('assignee', e.target.value)}
      />

      {/* Tags */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Tags</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Type a tag and press Enter"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button variant="secondary" size="md" onClick={handleAddTag}>
            Add
          </Button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {form.tags.map((tag) => (
              <Tag
                key={tag}
                label={tag}
                color="blue"
                onRemove={() => handleRemoveTag(tag)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
        <Button variant="secondary" size="md" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" size="md" onClick={onSubmit}>
          {isEdit ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </div>
  )
}

export default TaskForm