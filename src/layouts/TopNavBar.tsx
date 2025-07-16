import { Link, useLocation } from "react-router-dom"
import { Bell, Ticket, User, PlusCircle, Menu } from "lucide-react"
import { useState } from "react"
import logo from "../assets/ticketium.png" // Ajustá la ruta si es necesario

export function TopNavBar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { to: "/", label: "HOME" },
    { to: "/eventos", label: "EVENTOS" },
    { to: "/cartelera", label: "CARTELERA" },
    { to: "/tickets", label: "TICKETS" },
    { to: "/productores", label: "PRODUCTORES" },
    { to: "/contacto", label: "CONTACTO" },
    { to: "/preguntas", label: "PREGUNTAS" },
  ]

  return (
    <nav className="bg-black text-white px-6 py-3 flex items-center justify-between sticky top-0 z-20">
      {/* Izquierda: Logo y botón menú móvil */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* Botón menú móvil */}
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Centro: Links de navegación */}
      <div
        className={`text-lg font-medium flex-1 flex justify-center items-center gap-6 
          ${menuOpen ? "absolute top-full left-0 bg-black w-full flex-col p-4" : "hidden md:flex"}
        `}
      >
        {navItems.map(({ to, label }) => {
          const isActive = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-1 rounded-md hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {/* Derecha: Iconos */}
      <div className="flex gap-4 items-center">
        <Link to="/crearevento" className="hover:text-gray-400" title="Crear evento">
          <PlusCircle size={24} />
        </Link>
        <Link to="/tickets" className="hover:text-gray-400" title="Tickets">
          <Ticket size={24} />
        </Link>
        <Link to="/notificaciones" className="hover:text-gray-400" title="Notificaciones">
          <Bell size={24} />
        </Link>
        <Link to="/login" className="hover:text-gray-400" title="Usuario">
          <User size={24} />
        </Link>
      </div>
    </nav>
  )
}
