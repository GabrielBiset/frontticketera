import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

export default function ProductoresPage() {
  const [formData, setFormData] = useState({
    pais: "Argentina",
    nombre: "",
    correo: "",
    telefono: "",
    evento: "",
    mensaje: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, pais: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("Formulario enviado correctamente");
  };

  return (
    <Box
      maxWidth={600}
      mx="auto"
      mt={4}         // <- Aquí el margen superior igual que Tickets
      p={3}          // <- Padding igual que Tickets
      bgcolor="background.paper"
      borderRadius={2}
      boxShadow={3}
      component="form"
      onSubmit={handleSubmit}
      sx={{ color: "black" }}
    >
      <Typography variant="h5" component="h1" mb={3} color="black" fontWeight="bold">
        ¡Hablemos!
      </Typography>

      <Typography variant="body1" mb={4} color="black">
        Rellena el siguiente formulario y un miembro del equipo se contactará de inmediato.
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="pais-label" sx={{ color: "black" }}>
          País
        </InputLabel>
        <Select
          labelId="pais-label"
          name="pais"
          value={formData.pais}
          label="País"
          onChange={handleSelectChange}
          sx={{
            color: "black",
            ".MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
          }}
        >
          <MenuItem value="Argentina">Argentina</MenuItem>
          <MenuItem value="Chile">Chile</MenuItem>
          <MenuItem value="Uruguay">Uruguay</MenuItem>
          <MenuItem value="Otro">Otro</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Nombre Completo"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
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
        onChange={handleInputChange}
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
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ style: { color: "black" } }}
        inputProps={{ style: { color: "black" } }}
      />
      <TextField
        label="Nombre de evento"
        name="evento"
        value={formData.evento}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: "black" } }}
        inputProps={{ style: { color: "black" } }}
      />
      <TextField
        label="Mensaje"
        name="mensaje"
        value={formData.mensaje}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        InputLabelProps={{ style: { color: "black" } }}
        inputProps={{ style: { color: "black" } }}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Enviar
      </Button>
    </Box>
  );
}


