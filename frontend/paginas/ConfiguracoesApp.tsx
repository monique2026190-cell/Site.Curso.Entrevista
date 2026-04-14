import React from 'react';
import {
  Typography,
  Container,
  Box,
  CssBaseline,
  GlobalStyles,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Notifications, Person, Settings } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f1115',
      paper: '#1a1d24',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9aa4af',
    }
  },
});

const cardStyle = {
  height: '100%',
  borderRadius: 3,
  p: 2,
  background: '#1a1d24',
  transition: 'all 0.25s ease',
  cursor: 'pointer',
  border: '1px solid rgba(255,255,255,0.04)',

  '&:hover': {
    transform: 'translateY(-4px)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
  }
};

const ConfiguracoesApp: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#0f1115" } }} />

      <Container maxWidth="sm" sx={{ mt: 6 }}>
        
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Configurações
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            Gerencie preferências e informações da sua conta
          </Typography>
        </Box>

        {/* Seção: Conta */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ mb: 2, fontSize: 14, color: 'text.secondary' }}>
            CONTA
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card sx={cardStyle}>
                <CardContent sx={{ display: 'flex', gap: 2 }}>
                  <Person sx={{ color: '#60a5fa' }} />
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      Meu Perfil
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Edite suas informações pessoais
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card sx={cardStyle}>
                <CardContent sx={{ display: 'flex', gap: 2 }}>
                  <Settings sx={{ color: '#a78bfa' }} />
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      Conta
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Segurança e preferências
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Seção: Preferências */}
        <Box>
          <Typography sx={{ mb: 2, fontSize: 14, color: 'text.secondary' }}>
            PREFERÊNCIAS
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card sx={cardStyle}>
                <CardContent sx={{ display: 'flex', gap: 2 }}>
                  <Notifications sx={{ color: '#34d399' }} />
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      Notificações
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Controle alertas e avisos
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </ThemeProvider>
  );
};

export default ConfiguracoesApp;
