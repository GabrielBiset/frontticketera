import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  message?: string
}

export default function SuccessModal({ open, onClose, title, message }: Props) {
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose()
        navigate("/") // redirige al home
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [open, onClose, navigate])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-lg shadow-md w-[90%] max-w-md text-center">
        <h2 className="text-xl font-bold mb-2">{title || "¡Compra Exitosa!"}</h2>
        <p className="mb-4">
          {message || "Gracias por tu compra. Tus entradas fueron generadas y te llegarán por email."}
        </p>
        <button
          onClick={() => {
            onClose()
            navigate("/")
          }}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ir al inicio
        </button>
      </div>
    </div>
  )
}
