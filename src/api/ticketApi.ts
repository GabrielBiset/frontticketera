export async function buyTicket(ticketId: number) {
  try {
    const response = await fetch(`/api/tickets/buy/${ticketId}`, {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('No se pudo completar la compra');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
