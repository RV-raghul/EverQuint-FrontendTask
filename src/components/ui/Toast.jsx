import { useEffect } from 'react'

const typeStyles = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-indigo-600 text-white',
}

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-3 ${typeStyles[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 focus:outline-none" aria-label="Close">
        ×
      </button>
    </div>
  )
}

export default Toast