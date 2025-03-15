import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
      textAlign="center"
      padding={4}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          Go to Homepage
        </Button>
      </Link>
    </Box>
  );
}
