import React from 'react';
import { Container, Typography, Box, TextField, IconButton, CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../componentes/Footer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const PesquisaCursos: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container sx={{ mt: 10, mb: 8, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Pesquisar Cursos
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Digite o nome do curso..."
              sx={{ mr: 1 }}
            />
            <IconButton color="primary">
              <SearchIcon />
            </IconButton>
          </Box>
          {/* Aqui você pode adicionar a lógica para exibir os resultados da pesquisa */}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default PesquisaCursos;
