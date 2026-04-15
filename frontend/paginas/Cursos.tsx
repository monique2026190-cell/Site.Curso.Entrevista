import React from 'react';
import { Typography, Container, Grid, Box, CssBaseline, GlobalStyles, IconButton, CircularProgress, Alert } from '@mui/material';
import BotaoCriarProposta from '../componentes/BotaoCriarProposta';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CursoCard from '../componentes/conteiner.lista.cursos';
import Footer from '../componentes/Footer';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Cabecalho from '../componentes/Cabecalho';
import { useCursos } from '../hooks/useCursos'; // Importando o hook

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const Cursos: React.FC = () => {
  const navigate = useNavigate();
  const { cursos, loading, error } = useCursos(); // Usando o hook

  const handleSearchClick = () => {
    navigate('/pesquisar-cursos');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Container component="main" sx={{ mt: 10, mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography component="h1" variant="h4">
            Cursos Disponíveis
          </Typography>
          <IconButton color="primary" onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ my: 4 }}>
            Erro ao carregar os cursos. Tente novamente mais tarde.
          </Alert>
        )}

        {!loading && !error && (
          <Grid container spacing={4}>
            {cursos.map((curso) => (
              <CursoCard key={curso.id} id={curso.id} nome={curso.nome} descricao={curso.descricao} />
            ))}
          </Grid>
        )}

        <BotaoCriarProposta />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default Cursos;
