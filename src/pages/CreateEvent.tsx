import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

interface EventForm {
  country: string;
  eventType: string;
  adultsOnly: boolean;
  withMenu: boolean;
  name: string;
  category: string;
  artists: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  province: string;
  city: string;
  address: string;
  venue: string;
  spotifyUrl: string;
  youtubeUrl: string;
  acceptTerms: boolean;
}

const CreateEvent = () => {
  const [form, setForm] = useState<EventForm>({
    country: "Argentina",
    eventType: "Público",
    adultsOnly: false,
    withMenu: true,
    name: "",
    category: "",
    artists: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    province: "",
    city: "",
    address: "",
    venue: "",
    spotifyUrl: "",
    youtubeUrl: "",
    acceptTerms: false,
  });

  const [images, setImages] = useState<(File | null)[]>([null, null, null]);
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null]);

  const expectedSizes = [
    { width: 800, height: 800 },
    { width: 800, height: 400 },
    { width: 400, height: 800 },
  ];

  const sizeLabels = ["1080 x 1080 px", "1400 x 400 px", "1400 x 150 px"];

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateImageDimensions = (file: File, index: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        const expected = expectedSizes[index];
        resolve(width === expected.width && height === expected.height);
      };
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("La imagen debe pesar menos de 1MB");
      return;
    }

    const isValidDimensions = await validateImageDimensions(file, index);
    if (!isValidDimensions) {
      alert(`La imagen ${index + 1} debe medir exactamente ${sizeLabels[index]}`);
      return;
    }

    const newImages = [...images];
    const newPreviews = [...previews];
    newImages[index] = file;
    newPreviews[index] = URL.createObjectURL(file);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Evento creado:", form);
    console.log("Imágenes subidas:", images);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        ¡Ingresa los datos de tu evento!
      </Typography>

      <Typography variant="subtitle1">País destino: {form.country}</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Tipo de evento</InputLabel>
        <Select
          name="eventType"
          value={form.eventType}
          onChange={handleSelectChange}
          label="Tipo de evento"
        >
          <MenuItem value="Público">Público</MenuItem>
          <MenuItem value="Privado">Privado</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={form.adultsOnly}
            onChange={handleChange}
            name="adultsOnly"
          />
        }
        label="Evento solo para mayores de edad"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={form.withMenu}
            onChange={handleChange}
            name="withMenu"
          />
        }
        label="Agregar consumos de carta creada anteriormente"
      />

      {["name", "category", "artists", "province", "city", "address", "venue", "spotifyUrl", "youtubeUrl"].map((name) => (
        <TextField
          key={name}
          label={name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1")}
          name={name}
          value={(form as any)[name]}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      ))}

      <TextField
        label="Descripción"
        name="description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />

      {["startDate", "startTime", "endDate", "endTime"].map((name) => (
        <TextField
          key={name}
          label={name.includes("Date") ? `Fecha de ${name.includes("start") ? "inicio" : "finalización"}` : `Hora de ${name.includes("start") ? "inicio" : "finalización"}`}
          name={name}
          type={name.includes("Date") ? "date" : "time"}
          value={(form as any)[name]}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      ))}

      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Subí tus imágenes del evento
        </Typography>

        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            mt={3}
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            gap={2}
            flexWrap="wrap"
          >
            <Button
              variant="contained"
              component="label"
              color="secondary"
              startIcon={<PhotoCameraIcon />}
              sx={{ fontWeight: "bold", letterSpacing: 1, minWidth: 180, whiteSpace: "nowrap" }}
            >
              SUBIR IMAGEN&nbsp;{i + 1}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleImageChange(i, e)}
              />
            </Button>

            <Typography variant="body2" color="text.secondary">
              Requiere: <strong>{sizeLabels[i]}</strong> (máx. 1MB)
            </Typography>

            {previews[i] && (
              <Box
                component="img"
                src={previews[i]!}
                alt={`Imagen ${i + 1}`}
                sx={{
                  width: expectedSizes[i].width / 10,
                  height: expectedSizes[i].height / 10,
                  objectFit: "cover",
                  borderRadius: 2,
                  border: "1px solid #ccc",
                  mt: { xs: 1, sm: 0 },
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      <Box mt={2} p={2} bgcolor="#fff3cd" border="1px solid #ffeeba" borderRadius={2}>
        <Typography variant="body2" color="text.secondary">
          Si no subís una imagen, el evento se creará correctamente, pero <strong>no se mostrará en la página principal</strong> hasta que agregues una. Esto puede afectar el <strong>posicionamiento</strong> y las <strong>ventas</strong>.
        </Typography>
      </Box>

      <FormControlLabel
        sx={{ mt: 2 }}
        control={
          <Checkbox
            checked={form.acceptTerms}
            onChange={handleChange}
            name="acceptTerms"
          />
        }
        label="Acepto términos y condiciones"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Crear Evento
      </Button>
    </Box>
  );
};

export default CreateEvent;
