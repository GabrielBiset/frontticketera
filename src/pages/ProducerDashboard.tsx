import { useState } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts"

export default function ProducerDashboard() {
  const eventos = [
    {
      id: 1,
      nombre: "Oasis Tour 2026",
      lugar: "River Plate",
      fecha: "12/06/2026",
      entradasVendidas: 3200,
      capacidadTotal: 5000,
      recaudacion: 2800000,
    },
    {
      id: 2,
      nombre: "Sebastian Mendoza",
      lugar: "Sky Lab",
      fecha: "06/06/2025",
      entradasVendidas: 800,
      capacidadTotal: 1200,
      recaudacion: 800000,
    },
    {
      id: 3,
      nombre: "Ana y la otra",
      lugar: "Garcia Bar",
      fecha: "05/06/2025",
      entradasVendidas: 280,
      capacidadTotal: 300,
      recaudacion: 150000,
    },
  ]

  const ventasPorEvento: Record<
    number,
    { fecha: string; tickets: number; recaudacion: number }[]
  > = {
    1: [
      { fecha: "01 Jun", tickets: 200, recaudacion: 100000 },
      { fecha: "02 Jun", tickets: 300, recaudacion: 150000 },
      { fecha: "03 Jun", tickets: 500, recaudacion: 250000 },
    ],
    2: [
      { fecha: "01 Jun", tickets: 100, recaudacion: 50000 },
      { fecha: "02 Jun", tickets: 250, recaudacion: 125000 },
      { fecha: "03 Jun", tickets: 450, recaudacion: 220000 },
    ],
    3: [
      { fecha: "01 Jun", tickets: 80, recaudacion: 40000 },
      { fecha: "02 Jun", tickets: 90, recaudacion: 45000 },
      { fecha: "03 Jun", tickets: 110, recaudacion: 55000 },
    ],
  }

  const [eventoSeleccionado, setEventoSeleccionado] = useState(eventos[0].id)
  const ventasSeleccionadas = ventasPorEvento[eventoSeleccionado] || []

  const eventoActual = eventos.find((e) => e.id === eventoSeleccionado)!

  const ocupacion = (eventoActual.entradasVendidas / eventoActual.capacidadTotal) * 100

  return (
    <div className="p-6 space-y-6 text-black bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Dashboard Productor 🎟️</h2>

      {/* Métricas generales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Eventos activos</p>
          <p className="text-xl font-bold text-gray-900">{eventos.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Entradas vendidas hoy</p>
          <p className="text-xl font-bold text-gray-900">120</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Recaudación del día</p>
          <p className="text-xl font-bold text-gray-900">$52.000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Entradas totales</p>
          <p className="text-xl font-bold text-gray-900">4.200</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Recaudación total</p>
          <p className="text-xl font-bold text-gray-900">$3.750.000</p>
        </div>

        {/* Nueva métrica: ocupación del evento seleccionado */}
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Ocupación del evento</p>
          <p className="text-xl font-bold text-gray-900">
            {ocupacion.toFixed(2)}%
          </p>
          <p className="text-xs text-gray-500">
            ({eventoActual.entradasVendidas} / {eventoActual.capacidadTotal})
          </p>
        </div>
      </div>

      {/* Tabla de eventos */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-3">Evento</th>
              <th className="px-4 py-3">Lugar</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Entradas</th>
              <th className="px-4 py-3">Capacidad</th>
              <th className="px-4 py-3">Ocupación %</th>
              <th className="px-4 py-3">Recaudación</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => {
              const ocupacionEvento = (evento.entradasVendidas / evento.capacidadTotal) * 100
              return (
                <tr key={evento.id} className="border-b">
                  <td className="px-4 py-3">{evento.nombre}</td>
                  <td className="px-4 py-3">{evento.lugar}</td>
                  <td className="px-4 py-3">{evento.fecha}</td>
                  <td className="px-4 py-3">{evento.entradasVendidas}</td>
                  <td className="px-4 py-3">{evento.capacidadTotal}</td>
                  <td className="px-4 py-3">{ocupacionEvento.toFixed(2)}%</td>
                  <td className="px-4 py-3">${evento.recaudacion.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:underline mr-3">Ver</button>
                    <button className="text-green-600 hover:underline">Editar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Selector evento */}
      <div className="flex items-center justify-end">
        <select
          value={eventoSeleccionado}
          onChange={(e) => setEventoSeleccionado(Number(e.target.value))}
          className="border rounded px-3 py-1 text-gray-900 bg-white"
        >
          {eventos.map((evento) => (
            <option key={evento.id} value={evento.id}>
              {evento.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Layout compacto para gráficos: 2 columnas en desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Entradas diarias - AreaChart compacto */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Entradas diarias - {eventoActual.nombre}
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={ventasSeleccionadas} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="fecha" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
              <Area type="monotone" dataKey="tickets" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTickets)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recaudación diaria - BarChart horizontal compacto */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Recaudación diaria - {eventoActual.nombre}
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={ventasSeleccionadas}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="fecha" type="category" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Bar dataKey="recaudacion" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico totales por evento (barras) */}
      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">Totales por evento</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eventos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="entradasVendidas" fill="#3b82f6" name="Entradas vendidas" />
            <Bar dataKey="recaudacion" fill="#10b981" name="Recaudación" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
