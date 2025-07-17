// pages/Billboard.tsx
export default function BillboardPage() {
  return (
    <div className="p-4">
      <div className="text-xl font-semibold">¡Estamos trabajando!</div>

      <div className="mt-4 text-xl text-white-600">
        Gabi, lista para crear o corregir:

        <ul className="list-disc list-inside mt-2 space-y-3">
          <li>Inicio de sesión:
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>¿Olvidaste tu contraseña? – Crear link con formulario ✅ Cumplido</li>
              <li>Registrate – Crear link con formulario ✅ Cumplido </li>
            </ul>
          </li>

          <li>Tickets:
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>Corregir visual para celulares ✅ Cumplido</li>
            </ul>
          </li>

          <li>Crear evento:
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>Corregir visual para celulares – Cuadro de ticks y botón de subir imagen ✅ Cumplido</li>
            </ul>
          </li>

          <li>Preguntas:
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>Adecuar las preguntas frecuentes a la ticketera, porque describen a otra. ✅ Cumplido </li>
              <li>Hacer un pie de página ✅ Cumplido</li>
              <li>Ventanas emergentes que surgen luego de llenar un formulario o comprar tickets ✅ Cumplido </li>
              <li>Prueba Beva ✅ Cumplido </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}


