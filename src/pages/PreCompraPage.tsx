import { useState } from "react";
import { toast } from "react-toastify";

type Asistente = {
  nombreApellido: string;
  documento: string;
  email: string;
};

const OPCIONES_PRECIOS = {
  preventa1: { label: "Preventa 1", entrada: 150000, gestion: 6000 },
  preventa2: { label: "Preventa 2", entrada: 170000, gestion: 6000 },
  anticipada: { label: "Anticipada", entrada: 200000, gestion: 6000 },
  dosxuno: { label: "2x1", entrada: 200000, gestion: 6000 },
};

export default function PreCompraPage() {
  const eventName = "Oasis Tour 2025 - River Plate";

  const [formData, setFormData] = useState({
    nombreApellido: "",
    dni: "",
    telefono: "",
    ciudad: "",
    email: "",
    emailConfirm: "",
    medioPago: "",
    opcionCompra: "anticipada",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [asistentes, setAsistentes] = useState<Asistente[]>([]);
  const [asistenteForm, setAsistenteForm] = useState<Asistente>({
    nombreApellido: "",
    documento: "",
    email: "",
  });
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAsistenteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAsistenteForm({ ...asistenteForm, [e.target.name]: e.target.value });
  };

  const maxAsistentes = cantidadSeleccionada;
  const cantidadEntradas = asistentes.length > 0 ? asistentes.length : cantidadSeleccionada;
  const precioSeleccionado = OPCIONES_PRECIOS[formData.opcionCompra];

  let totalEntrada = 0;
  if (formData.opcionCompra === "dosxuno") {
    totalEntrada = precioSeleccionado.entrada * Math.ceil(cantidadEntradas / 2);
  } else {
    totalEntrada = precioSeleccionado.entrada * cantidadEntradas;
  }
  const totalGestion = precioSeleccionado.gestion * cantidadEntradas;
  const totalPagar = totalEntrada + totalGestion;

  const openModal = () => setModalOpen(true);

  const handleAddAsistente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asistenteForm.nombreApellido || !asistenteForm.documento || !asistenteForm.email) {
      toast.error("Por favor complete todos los campos del asistente");
      return;
    }

    if (asistentes.length >= maxAsistentes) {
      toast.error(`Ya agregó la cantidad máxima de asistentes: ${maxAsistentes}`);
      return;
    }

    setAsistentes([...asistentes, asistenteForm]);
    setAsistenteForm({ nombreApellido: "", documento: "", email: "" });
    setModalOpen(false);
  };

  const handleEditarAsistente = (index: number, campo: keyof Asistente, valor: string) => {
    const nuevosAsistentes = [...asistentes];
    nuevosAsistentes[index] = { ...nuevosAsistentes[index], [campo]: valor };
    setAsistentes(nuevosAsistentes);
  };

  const handleEliminarAsistente = (index: number) => {
    if (window.confirm("¿Querés eliminar este asistente?")) {
      const nuevosAsistentes = [...asistentes];
      nuevosAsistentes.splice(index, 1);
      setAsistentes(nuevosAsistentes);
    }
  };

  // ⬇️ FLUJO DE COMPRA con Toastify
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email !== formData.emailConfirm || !formData.medioPago) {
      toast.error("Verificá que todos los campos estén completos y los emails coincidan. Luego, intentá nuevamente.");
      return;
    }

    if (asistentes.length === 0) {
      const confirm = window.confirm(
        "No agregó asistentes personalizados. ¿Desea continuar con sus datos para todas las entradas?"
      );
      if (!confirm) return;
    }

    try {
      // Aquí deberías hacer la request real de compra
      // await api.comprarEntrada({ ...formData, asistentes });
      toast.success("¡Compra exitosa! Recibiste tu entrada por email.");
    } catch (error) {
      toast.error("Hubo un error procesando tu compra. Intenta nuevamente.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white text-black rounded shadow-lg mt-8 relative">
      <h1 className="text-2xl font-bold mb-6 text-center">Ticket - {eventName}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold">Nombre y Apellido</label>
          <input
            type="text"
            name="nombreApellido"
            value={formData.nombreApellido}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>

        <div className="mb-4 flex gap-2">
          <div className="flex-1">
            <label className="block font-bold">DNI</label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-bold">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold">Ciudad</label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold">Confirmar Email</label>
          <input
            type="email"
            name="emailConfirm"
            value={formData.emailConfirm}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold">Medio de Pago</label>
          <select
            name="medioPago"
            value={formData.medioPago}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
            required
          >
            <option value="">Seleccionar medio de pago</option>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
            <option value="mercadopago">Mercado Pago</option>
            {/* agregá más opciones si querés */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold">Tipo de Entrada</label>
          <select
            name="opcionCompra"
            value={formData.opcionCompra}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          >
            {Object.entries(OPCIONES_PRECIOS).map(([key, opcion]) => (
              <option key={key} value={key}>
                {opcion.label}
              </option>
            ))}
          </select>
        </div>

        {/* Podés agregar la lógica de asistentes aquí (botón y listado) */}

        <div className="mb-4">
          <label className="block font-bold">Cantidad de entradas</label>
          <input
            type="number"
            min={1}
            max={10}
            value={cantidadSeleccionada}
            onChange={(e) => setCantidadSeleccionada(Number(e.target.value))}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>

        <div className="mb-6 text-lg font-bold text-right">
          Total a pagar: ${totalPagar.toLocaleString()}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition"
        >
          Comprar entrada
        </button>
      </form>

      {/* Modal para agregar asistentes, si seguís usándolo */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <p>Formulario para agregar asistente</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
