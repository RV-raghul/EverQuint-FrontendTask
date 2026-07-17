import type { ReactNode, MouseEventHandler } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

function Card({
  children,
  className = '',
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 ${
        onClick
          ? 'cursor-pointer hover:shadow-md transition-shadow'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default Card