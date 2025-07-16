import banner from "../assets/Banners/banner12.jpg"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function EventDetailPage() {
  const eventName = "Oasis Tour 2025"
  const eventId = 1  // ID de ejemplo
  const navigate = useNavigate()

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, "-")

  const handleBuyClick = () => {
    const slug = slugify(eventName)
    navigate(`/compra/precompra/${slug}/${eventId}`, { state: { eventName } })
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex justify-center">
  <img
    src={banner}
    alt="Banner del evento"
    className="h-35 sm:h-56 md:h-64 lg:h-80 xl:h-96 object-cover"
  />
</div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center border-b border-gray-700 pb-4 mb-4">
          <div>
            <p className="text-xl font-semibold">📍 Estadio River Plate</p>
            <p className="text-lg">🗓️ Domingo 16 de Noviembre - 20:00 hs</p>
            <p className="text-md">🎟️ +18 | Entrada general desde $150.000</p>
          </div>
          <Button
            variant="contained"
            sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' }, px: 4, py: 1.5, fontSize: '1rem' }}
            onClick={handleBuyClick}
          >
            COMPRAR ENTRADA
          </Button>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h2 className="text-2xl font-bold">Descripción</h2>
          <p>Oasis anuncia su regreso a sudamérica en 2025 con su histórico tour mundial.</p>
          <p>La última etapa de la gira comienza con dos noches en el estadio River Plate en Buenos Aires, Argentina.</p>
        </div>

        <div className="mt-8 space-y-2 text-sm text-gray-300">
          <p>🧍‍♂️ Edad mínima: 18 años</p>
          <p>🔄 No se permiten devoluciones</p>
          <p>💳 Se puede pagar con tarjeta o Mercado Pago</p>
          <p>📍 Dirección: Av. Pres. Figueroa Alcorta 7597, Cdad. Autónoma de Buenos Aires</p>
        </div>

        <div className="mt-8 space-y-2 text-base text-white border-t border-gray-700 pt-6">
          <h2 className="text-2xl font-bold mb-2">Formas de Pago</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>3 CUOTAS SIN INTERÉS FAVACARD</li>
            <li>3 CUOTAS SIN INTERÉS PLAN-Z NARANJA X</li>
            <li>Débito y Crédito VISA - MASTER - 3, 6 Y 12 CUOTAS FIJAS</li>
            <li>MERCADOPAGO: dinero en cuenta y todas las tarjetas (Crédito y Débito)</li>
            <li>TARJETAS DE CRÉDITO BANCO PROVINCIA (4 CUOTAS SIN INTERÉS)</li>
          </ul>
        </div>

        <div className="mt-8 bg-red-900 bg-opacity-20 p-4 rounded-lg border border-red-700 text-sm text-red-300">
          <p className="font-semibold mb-2">⚠️ IMPORTANTE</p>
          <p>
            Todas las entradas son <span className="font-bold">NOMINALES</span>, esto quiere decir que deberás completar los datos del comprador y de lxs asistentes.
          </p>
          <p className="mt-2">
            Nuestros QRs son únicos. <span className="font-bold">No compres entradas en sitios NO OFICIALES de Ticketium.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
