import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Card, CardMedia,
  CardContent, Typography, Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

import bannerImage from '../assets/Banners/banner.jpg';
import bannerImage2 from '../assets/Banners/banner2.jpg';
import bannerImage3 from '../assets/Banners/banner3.jpg';
import bannerImage4 from '../assets/Banners/banner4.jpg';
import bannerImage5 from '../assets/Banners/banner5.jpg';
import bannerImage6 from '../assets/Banners/banner6.jpg';
import bannerImage7 from '../assets/Banners/banner7.jpg';
import bannerImage8 from '../assets/Banners/banner8.jpg';

const eventsData = [
  {
    id: 1,
    title: 'Oasis Tour Mundial 2026',
    city: 'Buenos Aires',
    place: 'River Plate',
    category: 'Rock Internacional',
    date: '2025-11-16',
    image: bannerImage,
  },
  {
    id: 2,
    title: 'La Kermesse 10 Años',
    city: 'Mar del Plata',
    place: 'Gap',
    category: 'Rock',
    date: '2025-06-20',
    image: bannerImage2,
  },
  {
    id: 3,
    title: 'Sebastian Mendoza',
    city: 'San Justo',
    place: 'Sky Lab',
    category: 'Cumbia',
    date: '2025-06-07',
    image: bannerImage3,
  },
  {
    id: 4,
    title: 'Linkin Park From Zero',
    city: 'Buenos Aires',
    place: 'Parque de la ciudad',
    category: 'Rock',
    date: '2025-10-31',
    image: bannerImage4,
  },
  {
    id: 5,
    title: 'Ana y la otra',
    city: 'Rosario',
    place: 'Garcia Bar',
    category: 'Rock',
    date: '2025-06-06',
    image: bannerImage5,
  },
  {
    id: 6,
    title: 'Gustavo Cordera',
    city: 'Buenos Aires',
    place: 'Vorterix',
    category: 'Rock',
    date: '2025-07-12',
    image: bannerImage6,
  },
  {
    id: 7,
    title: 'REI Tour 2025',
    city: 'Mar del Plata',
    place: 'Vorterix',
    category: 'Trap',
    date: '2025-07-19',
    image: bannerImage7,
  },
  {
    id: 8,
    title: 'Dua Lipa en Vivo',
    city: 'Buenos Aires',
    place: 'River Plate',
    category: 'Pop',
    date: '2025-11-07',
    image: bannerImage8,
  },
];

const unique = (key: keyof typeof eventsData[0]) => {
  return Array.from(new Set(eventsData.map(event => event[key])));
};

export default function EventsPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  const filteredEvents = eventsData.filter(event =>
    (event.title.toLowerCase().includes(searchText.toLowerCase())) &&
    (selectedCity === '' || event.city === selectedCity) &&
    (selectedCategory === '' || event.category === selectedCategory) &&
    (selectedDate === '' || event.date === selectedDate)
  );

  return (
    <Box p={4} sx={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      {/* Filtros */}
      <Grid container spacing={2} mb={4} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
        <Grid sx={{ gridColumn: { xs: 'span 4', sm: 'span 4', md: 'span 3' } }}>
          <TextField
            fullWidth
            label="Buscar por nombre"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
        </Grid>

        <Grid sx={{ gridColumn: { xs: 'span 4', sm: 'span 4', md: 'span 3' } }}>
          <FormControl
            fullWidth
            size="medium"
            sx={{ minWidth: 240, backgroundColor: 'white', borderRadius: 1 }}
          >
            <InputLabel>Ciudad</InputLabel>
            <Select
              value={selectedCity}
              label="Ciudad"
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              {unique('city').map(city => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid sx={{ gridColumn: { xs: 'span 4', sm: 'span 4', md: 'span 3' } }}>
          <FormControl
            fullWidth
            size="medium"
            sx={{ minWidth: 240, backgroundColor: 'white', borderRadius: 1 }}
          >
            <InputLabel>Categoría</InputLabel>
            <Select
              value={selectedCategory}
              label="Categoría"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              {unique('category').map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid sx={{ gridColumn: { xs: 'span 4', sm: 'span 4', md: 'span 3' } }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DatePicker
              label="Seleccionar fecha"
              value={selectedDate ? new Date(selectedDate) : null}
              onChange={(newValue) => {
                if (newValue) {
                  const formatted = newValue.toISOString().split('T')[0];
                  setSelectedDate(formatted);
                } else {
                  setSelectedDate('');
                }
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: { backgroundColor: 'white', borderRadius: 1 },
                },
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid sx={{
          gridColumn: { xs: 'span 4', sm: 'span 4', md: 'span 3' },
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSearchText('');
              setSelectedCity('');
              setSelectedCategory('');
              setSelectedDate('');
            }}
          >
            Restablecer filtros
          </Button>
        </Grid>
      </Grid>

      {/* Grid de eventos */}
      <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
        {filteredEvents.map(event => (
          <Grid key={event.id} sx={{ gridColumn: { xs: 'span 4', sm: 'span 4', md: 'span 4' } }}>
            <Card>
              <CardMedia
                component="img"
                sx={{ height: 260, width: 260, objectFit: 'cover' }}
                image={event.image}
                alt={event.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>{event.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.place ? `${event.place} - ${event.city}` : event.city}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
              </CardContent>
              <Box textAlign="center" mb={2}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#4caf50",
                    "&:hover": {
                      backgroundColor: "#388e3c",
                    },
                  }}
                  onClick={() => {
                    if (event.id === 1) {
                    navigate("/evento/1");
                    } else if (event.id === 8) {
                    navigate("/evento/8");
                    } else {
                    alert("Este evento aún no tiene una página disponible.");
                   }

                    
                  }}
                >
                  COMPRAR
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

