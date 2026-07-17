import { useEffect, useRef, type ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 focus:outline-none"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-gray-800"
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl focus:outline-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

export default Modal