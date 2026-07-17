import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  className?: string
}

const base =
  'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
  secondary:
    'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',
  destructive:
    'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {children}
    </button>
  )
}

export default Button