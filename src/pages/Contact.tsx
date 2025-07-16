import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    evento: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario de contacto enviado:", formData);
    alert("Tu mensaje ha sido enviado. ¡Gracias por contactarte!");
  };

  return (
    <Box
      maxWidth={600}
      mx="auto"
      mt={4}            // Igual que ProductoresPage
      p={3}             // Igual que ProductoresPage
      bgcolor="background.paper"
      borderRadius={2}
      boxShadow={3}
      component="form"
      onSubmit={handleSubmit}
      sx={{ color: "black" }} // texto negro en todo el formulario
    >
      <Typography variant="h5" mb={3} fontWeight="bold" color="black">
        ¡Contáctate con Ticketium!
      </Typography>
      <Typography variant="body1" mb={4} color="black">
        ¿Necesitas ayuda? Llena el formulario y te contactaremos.
      </Typography>

      <Box mb={4} sx={{ color: "black", fontSize: "body1.fontSize" }}>
        <Typography>
          <strong>Email:</strong>{" "}
          <a href="mailto:info@ticketium.com.ar" style={{ color: "#1976d2", textDecoration: "none" }}>
            info@ticketium.com.ar
          </a>
        </Typography>
        <Typography><strong>Atención al Productor:</strong> +54 9 -- ---- ---- </Typography>
        <Typography><strong>Dirección:</strong> Av de Mayo 555 </Typography>
        <Typography><strong>Atención al Comprador:</strong> +54 9 -- ---- ---- </Typography>
      </Box>

      <TextField
        label="Nombre Completo"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ style: { color: "black" } }}
        inputProps={{ style: { color: "black" } }}
      />
      <TextField
        label="Correo Electrónico"
        name="correo"
        type="email"
        value={formData.correo}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ style: { color: "black" } }}
        inputProps={{ style: { color: "black" } }}
      />
      <TextField
        label="Teléfono"
        name="telefono"
        type="tel"
        value={formData.telefono}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ style: { color: "black" } }}
        inputProps={{ style: { color: "black" } }}
      />
      <TextField
        label="Nombre de Evento"
        name="evento"
        value={formData.evento}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: "black" } }}
        inputProps={{ style: { color: "black" } }}
      />
      <TextField
        label="Mensaje"
        name="mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        InputLabelProps={{ style: { color: "black" } }}
        inputProps={{ style: { color: "black" } }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Enviar
      </Button>
    </Box>
  );
}
