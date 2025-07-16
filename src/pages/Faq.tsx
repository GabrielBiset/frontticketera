// pages/Faq.tsx
import { useState } from "react";

const faqs = [
  {
    question: "¿Cómo puedo comprar entradas?",
    answer:
      "Puedes adquirir tus entradas desde nuestra web seleccionando el evento deseado, eligiendo la cantidad de tickets y completando el proceso de pago. Recibirás un correo con tus tickets en formato digital.",
  },
  {
    question: "¿Qué métodos de pago están disponibles?",
    answer:
      "Aceptamos tarjetas de crédito, débito, transferencias bancarias y medios de pago como Mercado Pago, dependiendo del evento.",
  },
  {
    question: "¿Cómo recibo mis entradas?",
    answer:
      "Una vez finalizada la compra, recibirás un correo con tus entradas en formato PDF o podrás descargarlas desde tu perfil en el sitio.",
  },
  {
    question: "¿Puedo devolver o cambiar una entrada?",
    answer:
      "Las entradas no son reembolsables, excepto en caso de cancelación del evento. No se realizan cambios una vez realizada la compra.",
  },
  {
    question: "¿Qué hago si no me llega el correo con mis entradas?",
    answer:
      "Verifica tu bandeja de correo no deseado o spam. Si no lo encuentras, inicia sesión y descárgalas desde tu cuenta. También podés contactarnos desde la sección de Ayuda.",
  },
  {
    question: "¿Qué documentación necesito para ingresar?",
    answer:
      "Debes presentar tu entrada digital o impresa y un documento de identidad válido que coincida con el titular de la compra.",
  },
  {
    question: "¿Puedo transferir mi entrada a otra persona?",
    answer:
      "Sí, mientras no esté personalizada. En eventos con entrada nominal, debes solicitar el cambio de titularidad según lo indique el organizador.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Preguntas Frecuentes
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800"
            >
              {faq.question}
              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="mt-2 text-gray-600 text-sm">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
