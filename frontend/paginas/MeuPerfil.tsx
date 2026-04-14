import React from 'react';
import { Container, Typography, Box, CssBaseline, GlobalStyles, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../componentes/Footer';
import CardInformacaoPerfil from '../componentes/card.informacoes.perfil.tsx';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import Cabecalho from '../componentes/Cabecalho';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const MeuPerfil: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container sx={{ mt: 10, mb: 8, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom>Meu Perfil</Typography>
            <IconButton color="primary" onClick={() => navigate('/configuracoes-app')}>
              <SettingsIcon />
            </IconButton>
          </Box>
          <CardInformacaoPerfil nome="Usuário Exemplo" />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default MeuPerfil;
