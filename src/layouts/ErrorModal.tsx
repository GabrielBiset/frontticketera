import { useEffect } from "react"

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  message?: string
}

export default function ErrorModal({ open, onClose, title, message }: Props) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 3500)
      return () => clearTimeout(timer)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md w-[90%] max-w-md text-center">
        <h2 className="text-xl font-bold mb-2">{title || "¡Error en la compra!"}</h2>
        <p>{message || "Revisá los datos e intentá nuevamente."}</p>
      </div>
    </div>
  )
}
