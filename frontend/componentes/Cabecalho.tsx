import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Cabecalho: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1E1E1E' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6" component="div">
            Multi-Curso
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Cabecalho;
