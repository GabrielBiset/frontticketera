// src/pages/LoginPage.tsx
import { useState } from "react"
import { Button } from "../components/Button"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email:", email, "Password:", password)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md w-full p-6 border rounded shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-2 text-center text-black">Inicia Sesión</h1>
        <p className="mb-6 text-gray-700">
          Ingresa a tu cuenta de Ticketium y disfruta de tus eventos favoritos
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-black">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-black">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="text-right mt-1">
              <a href="/reset-password" className="text-sm text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-sm">o inicia sesión con</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex gap-4 justify-center">
          <button
            type="button"
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-black hover:bg-gray-100"
            onClick={() => alert("Login con Google")}
          >
            <FcGoogle size={20} />
            Google
          </button>
          <button
            type="button"
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-blue-700 hover:bg-blue-50"
            onClick={() => alert("Login con Facebook")}
          >
            <FaFacebook size={20} />
            Facebook
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-700">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}
