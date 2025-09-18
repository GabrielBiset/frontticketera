import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const ventasPorEvento30d = [
  { nombre: "La Kermesse", ventas: 1200000 },
  { nombre: "Oasis Tour", ventas: 50000000 },
  { nombre: "Seba Mendoza", ventas: 1500000 },
  { nombre: "Cordera", ventas: 1100000 },
  { nombre: "Dua Lipa", ventas: 14000000 },
]

const ventasRecientes = [
  { evento: "La Kermesse", monto: 500000, hace: "hace 2 horas" },
  { evento: "Oasis Tour 25", monto: 15000000, hace: "hace 3 horas" },
  { evento: "Seba Mendoza", monto: 800000, hace: "hace 5 horas" },
  { evento: "Cordera Solo", monto: 100000, hace: "hace 8 horas" },
  { evento: "Dua Lipa River", monto: 1000000, hace: "hace 6 horas" },
]

const proximos = [
  { 
    id: 1, 
    nombre: "La Kermesse", 
    estado: "Activo", 
    fecha: "15 Mar 2025", 
    hora: "22:00 - 03:00", 
    lugar: "Club Luminoso, Buenos Aires", 
    precio: 20000,
    vendidas: 350, 
    capacidad: 500,
    vendidasHoy: 25
  },
  { 
    id: 2, 
    nombre: "Oasis Tour", 
    estado: "Casi Agotado", 
    fecha: "15 Nov 2025", 
    hora: "23:00 - 01:00", 
    lugar: "River Plate, Buenos Aires",
    precio: 150000, 
    vendidas: 40000, 
    capacidad: 50000,
    vendidasHoy: 100
  },
  { 
    id: 3, 
    nombre: "Seba Mendoza", 
    estado: "Activo", 
    fecha: "17 Mar 2025", 
    hora: "21:00 - 04:00", 
    lugar: "Arena Electrónica, Rosario", 
    precio: 20000,
    vendidas: 450, 
    capacidad: 1000,
    vendidasHoy: 40
  },
  { 
    id: 4, 
    nombre: "Cordera Solo", 
    estado: "Activo", 
    fecha: "12 Jul 2025", 
    hora: "20:00 - 22:00", 
    lugar: "Vorterix, Buenos Aires", 
    precio: 10000,
    vendidas: 100, 
    capacidad: 1000,
    vendidasHoy: 10
  },
  { 
    id: 5, 
    nombre: "Dua Lipa", 
    estado: "Activo", 
    fecha: "7 Nov 2025", 
    hora: "21:00 - 12:00", 
    lugar: "River Plate, Buenos Aires", 
    precio: 100000,
    vendidas: 5000, 
    capacidad: 50000,
    vendidasHoy: 10
  },
]

function formatMoney(n: number) {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function ProducerDashboard() {
  const totalVentas = 67800000
  const deltaVentas = "+20.1% desde el mes pasado"
  const eventosActivos = 5
  const deltaEventos = "+3 desde la semana pasada"
  const entradasVendidas = 45900
  const deltaEntradas = "+201 desde el mes pasado"
  const clientesActivos = 235
  const deltaClientes = "+180 nuevos clientes"

  const [filtroEvento, setFiltroEvento] = useState("todos")

  const eventosFiltrados =
    filtroEvento === "todos"
      ? proximos
      : proximos.filter((_ev) => {
          if (filtroEvento === "proximos") return true
          if (filtroEvento === "pasados") return false // simulado vacío
          if (filtroEvento === "borradores") return false // simulado vacío
          return true
        })

  // 🔹 Total diario (sumatoria de ventas recientes)
  const totalDiario = ventasRecientes.reduce((sum, v) => sum + v.monto, 0)

  // ==============================
  // ⬇️ Estado y lógica del MODAL (solo para pestaña "Eventos")
  // ==============================
  type TipoKey = "vip" | "anticipada" | "preventa1" | "preventa2" | "2x1"
  type TipoData = { precio: number; cupo: number }
  type TicketForm = Record<TipoKey, TipoData>

  const emptyForm: TicketForm = {
    vip: { precio: 0, cupo: 0 },
    anticipada: { precio: 0, cupo: 0 },
    preventa1: { precio: 0, cupo: 0 },
    preventa2: { precio: 0, cupo: 0 },
    "2x1": { precio: 0, cupo: 0 },
  }

  const [isOpen, setIsOpen] = useState(false)
  const [eventoActivo, setEventoActivo] = useState<any | null>(null)
  const [ticketForm, setTicketForm] = useState<TicketForm>(emptyForm)
  const [entradasPorEvento, setEntradasPorEvento] = useState<Record<number, TicketForm>>({})

  const tiposOrden: TipoKey[] = ["vip", "anticipada", "preventa1", "preventa2", "2x1"]

  function abrirModal(evento: any) {
    setEventoActivo(evento)
    const existente = entradasPorEvento[evento.id]
    setTicketForm(existente ? existente : emptyForm)
    setIsOpen(true)
  }

  function cerrarModal() {
    setIsOpen(false)
  }

  function onChangeCampo(tipo: TipoKey, campo: keyof TipoData, valor: string) {
    const num = Number(valor)
    setTicketForm((prev) => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [campo]: isNaN(num) ? 0 : num,
      },
    }))
  }

  function guardarCambios() {
    if (!eventoActivo) return
    setEntradasPorEvento((prev) => ({ ...prev, [eventoActivo.id]: ticketForm }))
    setIsOpen(false)
  }
  // ==============================

  return (
    <div className="p-6 text-black bg-gray-100 min-h-screen space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Productor 🎟️</h2>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white rounded shadow p-1">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="diario">Diario</TabsTrigger>
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
        </TabsList>

        {/* --- GENERAL --- */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Ventas Totales" value={formatMoney(totalVentas)} delta={deltaVentas} />
            <StatCard title="Eventos Activos" value={eventosActivos} delta={deltaEventos} />
            <StatCard title="Entradas Vendidas" value={entradasVendidas} delta={deltaEntradas} />
            <StatCard title="Clientes Activos" value={clientesActivos} delta={deltaClientes} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-gray-900">Ventas por Evento</h3>
              <p className="text-sm text-gray-600 mb-2">Comparativa de ventas por evento en los últimos 30 días</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ventasPorEvento30d}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nombre" />
                  <YAxis />
                  <Tooltip formatter={(v) => formatMoney(v as number)} />
                  <Bar dataKey="ventas" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-gray-900">Ventas Recientes</h3>
              <div className="space-y-3 mt-4">
                {ventasRecientes.map((v, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-700">{v.evento}</div>
                    <div className="font-semibold text-gray-900">{formatMoney(v.monto)}</div>
                    <div className="text-xs text-gray-500">{v.hace}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Próximos Eventos</h3>
            <div className="space-y-4 mt-4">
              {proximos.map(ev => {
                const pr = Math.round((ev.vendidas / ev.capacidad) * 100)
                return (
                  <div key={ev.id} className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <div className="text-sm font-medium text-blue-600 uppercase">{ev.estado}</div>
                      <div className="text-base font-semibold text-gray-900">{ev.nombre}</div>
                      <div className="text-sm text-gray-500">{ev.fecha} {ev.hora}</div>
                      <div className="text-sm text-gray-500">{ev.lugar}</div>
                      <div className="text-sm text-gray-800">{ev.vendidas} / {ev.capacidad} entradas vendidas ({pr}%)</div>
                      <div className="text-sm text-green-700 font-medium">➕ {ev.vendidasHoy} entradas vendidas hoy ({formatMoney (ev.precio)})</div>
                    </div>
                    <div className="flex gap-2 mt-3 sm:mt-0">
                      <button className="text-blue-600 hover:underline text-sm">Editar</button>
                      {/* ⚠️ En GENERAL NO se abre modal (queda igual) */}
                      <button className="text-green-600 hover:underline text-sm">Gestionar Entradas</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>

        {/* --- DIARIO --- */}
        <TabsContent value="diario">
          {/* 🔹 Resumen Diario */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <StatCard title="Importe Diario" value={formatMoney(totalDiario)} delta="+12% vs ayer" />
            <StatCard title="Eventos Activos" value={proximos.length} delta="+1" />
            <StatCard
              title="Entradas Vendidas Hoy"
              value={proximos.reduce((sum, ev) => sum + ev.vendidasHoy, 0)}
              delta="+15 vs ayer"
            />
            <StatCard title="Clientes Activos" value={clientesActivos} delta="+2%" />
          </div>

          {/* 🔹 Detalle de Ventas Recientes */}
          <div className="space-y-4">
            {ventasRecientes.map((venta, index) => {
              const eventoRelacionado = proximos.find(ev => venta.evento.includes(ev.nombre))
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:justify-between md:items-center"
                >
                  <div>
                    <div className="font-semibold text-gray-800">{venta.evento}</div>
                    <div className="text-sm text-gray-500">{venta.hace}</div>

                    {eventoRelacionado && (
                      <>
                        <div className="text-sm text-gray-600">
                          📅 {eventoRelacionado.fecha} {eventoRelacionado.hora}
                        </div>
                        <div className="text-sm text-gray-600">📍 {eventoRelacionado.lugar}</div>
                        <div className="text-sm text-gray-800">
                          🎟️ {eventoRelacionado.vendidas} / {eventoRelacionado.capacidad} entradas vendidas
                        </div>
                        <div className="text-sm text-green-700 font-medium">
                          ➕ {eventoRelacionado.vendidasHoy} entradas vendidas hoy ({formatMoney(eventoRelacionado.precio)})
                        </div>
                      </>
                    )}
                  </div>

                  <div className="text-lg font-bold text-gray-900 mt-3 md:mt-0">
                    {formatMoney(venta.monto)}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* --- EVENTOS --- */}
        <TabsContent value="eventos">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setFiltroEvento("todos")}
                className={`px-3 py-1 rounded text-sm ${filtroEvento === "todos" ? "bg-blue-600 text-white" : "bg-white text-gray-800 border"}`}
              >
                Todos
              </button>
              <button
                onClick={() => setFiltroEvento("proximos")}
                className={`px-3 py-1 rounded text-sm ${filtroEvento === "proximos" ? "bg-blue-600 text-white" : "bg-white text-gray-800 border"}`}
              >
                Próximos
              </button>
              <button
                onClick={() => setFiltroEvento("pasados")}
                className={`px-3 py-1 rounded text-sm ${filtroEvento === "pasados" ? "bg-blue-600 text-white" : "bg-white text-gray-800 border"}`}
              >
                Pasados
              </button>
              <button
                onClick={() => setFiltroEvento("borradores")}
                className={`px-3 py-1 rounded text-sm ${filtroEvento === "borradores" ? "bg-blue-600 text-white" : "bg-white text-gray-800 border"}`}
              >
                Borradores
              </button>
            </div>
            {eventosFiltrados.length === 0 ? (
              <p className="text-gray-600">No hay eventos para mostrar.</p>
            ) : (
              eventosFiltrados.map((evento) => {
                const pr = Math.round((evento.vendidas / evento.capacidad) * 100)
                return (
                  <div
                    key={evento.id}
                    className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                  >
                    <div>
                      <div className="text-sm font-medium text-blue-600 uppercase">{evento.estado}</div>
                      <div className="text-base font-semibold text-gray-900">{evento.nombre}</div>
                      <div className="text-sm text-gray-500">
                        {evento.fecha} {evento.hora}
                      </div>
                      <div className="text-sm text-gray-500">{evento.lugar}</div>
                      <div className="text-sm text-gray-800">
                        {evento.vendidas} / {evento.capacidad} entradas vendidas ({pr}%)
                      </div>
                      <div className="text-sm text-green-700 font-medium">
                        ➕ {evento.vendidasHoy} entradas vendidas hoy ({formatMoney(evento.precio)})
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 sm:mt-0">
                      <button className="text-blue-600 hover:underline text-sm">Editar</button>
                      {/* 👉 En EVENTOS sí abrimos el sub-cuadro */}
                      <button
                        onClick={() => abrirModal(evento)}
                        className="text-green-600 hover:underline text-sm"
                      >
                        Gestionar Entradas
                      </button>
                    </div>
                  </div>
                )
              })
            )}

            {/* 🔳 SUB-CUADRO / MODAL (solo visible en pestaña Eventos) */}
            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" onClick={cerrarModal} />

                {/* Dialog */}
                <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Gestionar Entradas {eventoActivo ? `— ${eventoActivo.nombre}` : ""}
                    </h3>
                    <button
                      onClick={cerrarModal}
                      className="px-3 py-1 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
                    >
                      Cerrar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-medium text-gray-600 mb-2 px-2">
                    <div>Tipo</div>
                    <div>Precio</div>
                    <div>Cupo</div>
                  </div>

                  <div className="space-y-2">
                    {tiposOrden.map((tipo) => (
                      <div key={tipo} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center bg-gray-50 rounded-xl p-3">
                        <div className="capitalize font-medium">{tipo}</div>
                        <input
                          type="number"
                          min={0}
                          value={ticketForm[tipo].precio}
                          onChange={(e) => onChangeCampo(tipo, "precio", e.target.value)}
                          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Precio"
                        />
                        <input
                          type="number"
                          min={0}
                          value={ticketForm[tipo].cupo}
                          onChange={(e) => onChangeCampo(tipo, "cupo", e.target.value)}
                          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Cupo"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Resumen */}
                  <div className="mt-4 bg-gray-50 rounded-xl p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Cupo total</span>
                      <span className="font-semibold text-gray-900">
                        {Object.values(ticketForm).reduce((acc, t) => acc + (t.cupo || 0), 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Precio promedio (simple)</span>
                      <span className="font-semibold text-gray-900">
                        {formatMoney(
                          (() => {
                            const vals = Object.values(ticketForm).map(t => t.precio || 0)
                            const count = vals.length || 1
                            const sum = vals.reduce((a, b) => a + b, 0)
                            return sum / count
                          })()
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-2">
                    <button
                      onClick={cerrarModal}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={guardarCambios}
                      className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({ title, value, delta }: { title: string, value: string | number, delta: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-green-600 mt-1">{delta}</p>
    </div>
  )
}

