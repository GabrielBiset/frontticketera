import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 6,
      py: 3,
      px: 2,
      textAlign: "center",
      backgroundColor: "#f8f9fa",
      color: "#6c757d",
      borderTop: "1px solid #dee2e6",
    }}
  >
    <Typography variant="body2">
      © {new Date().getFullYear()} Ticketium. Todos los derechos reservados.
    </Typography>
    <Typography variant="caption">
      Desarrollado con 💡 por tu equipo de innovación.
    </Typography>
  </Box>
);

export default Footer;
