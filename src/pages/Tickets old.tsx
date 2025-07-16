import { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
} from "@mui/material";

const Tickets = () => {
  const [estado, setEstado] = useState("");

  const handleChange = (event: any) => {
    setEstado(event.target.value);
  };

  const tickets = [
    {
      estado: "Vigente",
      afiche: "🎫",
      evento: "Oasis Tour 2026",
      tipo: "Anticipada",
      lugarFecha: "River Plate - 12/06/2025",
      valor: "$206.000",
      eTicket: "Ver",
      compra: "#1",
      opciones: "Cancelar",
    },
    {
      estado: "Expirado",
      afiche: "❌",
      evento: "Sebastian Mendoza",
      tipo: "Preventa 1",
      lugarFecha: "Sky Lab - 06/06/2025",
      valor: "$10.000",
      eTicket: "Ver",
      compra: "#2",
      opciones: "-",
    },
    {
      estado: "Validados",
      afiche: "🎟️",
      evento: "Ana y la otra",
      tipo: "Preventa 2",
      lugarFecha: "Garcia Bar - 05/06/2025",
      valor: "$15.000",
      eTicket: "Ver",
      compra: "#3",
      opciones: "-",
    },
  ];

  const filteredTickets = estado === "" ? tickets : tickets.filter((t) => t.estado === estado);

  return (
    <Box sx={{ m: 4, backgroundColor: "white", color: "black", p: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2} justifyContent="space-between" mb={3}>
          <Grid sx={{ gridColumn: { xs: "span 4", sm: "span 6", md: "span 9" } }}>
            <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
              ¡Revisar tus eTickets y Consumos!
            </Typography>
          </Grid>

          <Grid sx={{ gridColumn: { xs: "span 4", sm: "span 6", md: "span 3" } }}>
            <FormControl
              fullWidth
              size="medium"
              sx={{ minWidth: 180, backgroundColor: "white", borderRadius: 1 }}
            >
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                value={estado}
                onChange={handleChange}
                label="Estado"
                sx={{ color: "black" }}
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                <MenuItem value="Vigente">Vigente</MenuItem>
                <MenuItem value="Validados">Validados</MenuItem>
                <MenuItem value="Reenviados">Reenviados</MenuItem>
                <MenuItem value="Expirado">Expirado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Paper sx={{ backgroundColor: "white", color: "black", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Afiche</TableCell>
                <TableCell>Evento</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Lugar y Fecha</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>eTicket</TableCell>
                <TableCell>Compra</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket, index) => (
                  <TableRow key={index}>
                    <TableCell>{ticket.afiche}</TableCell>
                    <TableCell>{ticket.evento}</TableCell>
                    <TableCell>{ticket.tipo}</TableCell>
                    <TableCell>{ticket.lugarFecha}</TableCell>
                    <TableCell>{ticket.valor}</TableCell>
                    <TableCell>{ticket.eTicket}</TableCell>
                    <TableCell>{ticket.compra}</TableCell>
                    <TableCell>{ticket.opciones}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No hay tickets en el estado seleccionado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </CardContent>
    </Box>
  );
};

export default Tickets;
