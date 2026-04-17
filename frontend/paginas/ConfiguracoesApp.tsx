
import React from 'react';
import {
  CssBaseline, GlobalStyles, ThemeProvider, createTheme, Box, AppBar, Toolbar, IconButton, Typography,
  Container, Button
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ContaSection } from './ContaSection';
import { FinanceiroSection } from './FinanceiroSection';
import { SegurancaSection } from './SegurancaSection';
import { useAuth } from '../contexto/contexto.autenticacao';

// O mesmo tema escuro e sofisticado da página de cursos
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#5E97F6', // Um azul mais sóbrio e profissional
    },
    text: {
      primary: '#EAEAEA',
      secondary: '#A9A9A9',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 500,
    },
  },
});

export const ConfiguracoesApp: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: darkTheme.palette.background.default } }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static" sx={{ bgcolor: 'background.paper', boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <Toolbar>
            <IconButton 
              aria-label="voltar" 
              onClick={() => navigate(-1)}
              sx={{
                marginRight: '10px',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Configurações
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="md" sx={{ flexGrow: 1, overflowY: 'auto', py: 3 }}>
          <ContaSection />
          <FinanceiroSection />
          <SegurancaSection />

          <Box sx={{ mt: 4, px: 1 }}>
            <Button
              fullWidth
              variant="text"
              startIcon={<ExitToAppIcon />}
              onClick={logout}
              sx={{
                p: '12px',
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 600,
                color: 'text.secondary',
                bgcolor: 'background.paper',
                justifyContent: 'center',
                '&:hover': {
                  bgcolor: '#282828',
                  color: '#ff8a80', // Tom sutil de vermelho no hover
                },
              }}
            >
              Sair da Conta
            </Button>
            <Typography variant="caption" display="block" sx={{ textAlign: 'center', color: 'text.secondary', mt: 2, opacity: 0.5 }}>
              Flux Security Ecosystem • v1.2.3
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
