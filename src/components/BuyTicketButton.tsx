import React, { useState } from 'react';
import { buyTicket } from '../api/ticketApi';
import AlertMessage from './AlertMessage';

interface Props {
  ticketId: number;
}

const BuyTicketButton: React.FC<Props> = ({ ticketId }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | null>(null);

  const handleBuy = async () => {
    try {
      await buyTicket(ticketId);
      setType('success');
      setMessage('¡Compra exitosa!');
    } catch (err) {
      setType('error');
      setMessage('Ocurrió un error al comprar la entrada.');
    }
  };

  return (
    <div>
      <button onClick={handleBuy} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Comprar Entrada
      </button>
      {type && (
        <AlertMessage
          message={message}
          type={type}
          onClose={() => {
            setMessage('');
            setType(null);
          }}
        />
      )}
    </div>
  );
};

export default BuyTicketButton;

