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
import { Edit, Book, Delete, BarChart, People } from '@mui/icons-material';

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

const ConfiguracoesCurso: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#0f1115' } }} />

      <Container maxWidth="md" sx={{ mt: 6 }}>
        
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Configurações do Curso
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            Gerencie as informações e o conteúdo do seu curso
          </Typography>
        </Box>

        {/* Seção: Geral */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ mb: 2, fontSize: 14, color: 'text.secondary' }}>
            GERAL
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card sx={cardStyle}>
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Edit sx={{ color: '#60a5fa' }} />
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      Editar Informações
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Altere o título, a descrição e a capa
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card sx={cardStyle}>
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <People sx={{ color: '#34d399' }} />
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      Gerenciar Alunos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Visualize e administre os participantes
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Seção: Conteúdo */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ mb: 2, fontSize: 14, color: 'text.secondary' }}>
            CONTEÚDO
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card sx={cardStyle}>
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Book sx={{ color: '#a78bfa' }} />
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      Estrutura do Curso
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Adicione ou remova módulos e aulas
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={cardStyle}>
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <BarChart sx={{ color: '#f59e0b' }} />
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      Análises e Relatórios
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Acompanhe o engajamento e o progresso
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Seção: Avançado */}
        <Box>
          <Typography sx={{ mb: 2, fontSize: 14, color: 'text.secondary' }}>
            AVANÇADO
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Card sx={cardStyle}>
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Delete sx={{ color: '#ef4444' }} />
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      Excluir Curso
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Remova permanentemente este curso
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

export default ConfiguracoesCurso;
