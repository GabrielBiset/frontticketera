import { Box, Typography, IconButton, Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        backgroundColor: "#111",
        color: "#fff",
        py: 3,
        px: 2,
        textAlign: "center",
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
        <IconButton
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener"
          sx={{ color: "#fff" }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener"
          sx={{ color: "#fff" }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          href="https://twitter.com/"
          target="_blank"
          rel="noopener"
          sx={{ color: "#fff" }}
        >
          <TwitterIcon />
        </IconButton>
      </Stack>

      <Typography variant="body2" color="gray">
        © {new Date().getFullYear()} Ticketium. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
