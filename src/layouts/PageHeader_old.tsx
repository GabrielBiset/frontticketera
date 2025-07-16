import { Bell, Menu, Ticket, User } from "lucide-react"
import logo from "../assets/Logo.png"
import { Button } from "../components/Button"
import { useSidebarContext } from "../contexts/SidebarContext"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { EventBusy } from "@mui/icons-material"

// ✅ Categorías que se mostrarán en lugar de la barra de búsqueda
export const categories = [
  "All",
  "Recitales",
  "Teatro",
  "Electronica",
  "Deportes",
  "Fiestas",
  "Cine",
  "Workshops",
  "Infantiles",
  "Festival",
  "Conferencias",
  "Familias",
]

export function PageHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const ocultarBarra = location.pathname === "/login"

  return (
    <div className="flex flex-col gap-4 pt-2 mb-6 mx-4 bg-black text-white px-4 py-2 rounded-md">
      {/* Sección izquierda con logo y botón del menú */}
      <div className="flex justify-between items-center">
        <PageHeaderFirstSection />

        {/* Íconos del lado derecho */}
        <div className="flex-shrink-0 md:gap-2 flex">
          {!ocultarBarra && (
            <>
              <Link to="/crearevento">
                <Button size="icon" variant="ghost">
                  <EventBusy />
                </Button>
              </Link>
              <Button size="icon" variant="ghost">
                <Bell />
              </Button>
              <Link to="/tickets">
                <Button size="icon" variant="ghost">
                  <Ticket />
                </Button>
              </Link>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => navigate("/login")}
              >
                <User />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Fila de categorías */}
      {!ocultarBarra && (
        <div className="overflow-x-auto flex gap-2 justify-center items-center">
          {categories.map((category) => (
            <button
              key={category}
              className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-full whitespace-nowrap text-sm transition"
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

type PageHeaderFirstSectionProps = {
  hidden?: boolean
}

export function PageHeaderFirstSection({ hidden = false }: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext()

  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} className="h-6" />
      </a>
    </div>
  )
}
