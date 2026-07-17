import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

interface TextInputProps {
  id: string
  label?: string
  error?: string
  placeholder?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  type?: HTMLInputTypeAttribute
  className?: string
}

function TextInput({
  label,
  id,
  error,
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      />

      {error && (
        <span className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  )
}

export default TextInput