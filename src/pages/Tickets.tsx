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
  Card,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Tickets = () => {
  const [estado, setEstado] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: any) => {
    setEstado(event.target.value);
  };

  const tickets = [
    {
      estado: "Vigente",
      afiche: "🎫",
      evento: "Leo mattioli 2025 Tour",
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

  const filteredTickets =
    estado === "" ? tickets : tickets.filter((t) => t.estado === estado);

  return (
    <Box sx={{ m: { xs: 2, md: 4 }, p: { xs: 2, sm: 3 }, bgcolor: "white", borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between" mb={3}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h5"
              sx={{ color: "black", fontWeight: "bold", textAlign: { xs: "center", md: "left" } }}
            >
              ¡Revisá tus eTickets y Consumos!
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              size="medium"
              sx={{
                minWidth: 180,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: "0px 1px 6px rgba(0,0,0,0.1)",
              }}
            >
              <InputLabel id="estado-label">Filtrar por Estado</InputLabel>
              <Select
                labelId="estado-label"
                value={estado}
                onChange={handleChange}
                label="Filtrar por Estado"
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

        {isSmallScreen ? (
          <Grid container spacing={2}>
            {filteredTickets.map((ticket, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    bgcolor: "#fefefe",
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Typography fontWeight="bold">
                    {ticket.afiche} {ticket.evento}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tipo:</strong> {ticket.tipo}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fecha:</strong> {ticket.lugarFecha}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Valor:</strong> {ticket.valor}
                  </Typography>
                  <Typography variant="body2">
                    <strong>eTicket:</strong> {ticket.eTicket}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Compra:</strong> {ticket.compra}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Opciones:</strong> {ticket.opciones}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ backgroundColor: "white", color: "black" }}>
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
        )}
      </CardContent>
    </Box>
  );
};

export default Tickets;
