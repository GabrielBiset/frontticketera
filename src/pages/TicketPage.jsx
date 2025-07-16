import React from 'react';
import BuyTicketButton from '../components/BuyTicketButton';

const TicketPage = () => {
  return (
    <div>
      <h1>Evento: Concierto XYZ</h1>
      <BuyTicketButton ticketId={123} />
    </div>
  );
};

export default TicketPage;

