'use client';

import { Box, Typography, Link, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 4, 
        py: 3, 
        px: 2, 
        backgroundColor: 'grey.100',
        textAlign: 'center'
      }}
    >
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Desenvolvido por Lucas Coelho
      </Typography>
      <IconButton
        component={Link}
        href="https://www.linkedin.com/in/devlucascoelho/"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
      >
        <LinkedInIcon />
      </IconButton>
    </Box>
  );
}