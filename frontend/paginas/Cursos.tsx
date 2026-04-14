import React from 'react';
import { Typography, Container, Grid, Box, CssBaseline, GlobalStyles, IconButton } from '@mui/material';
import BotaoCriarProposta from '../componentes/BotaoCriarProposta';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CursoCard from '../componentes/conteiner.lista.cursos.tsx';
import Footer from '../componentes/Footer';
import SearchIcon from '@mui/icons-material/Search';
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

const cursos = [
  { id: 1, nome: 'Curso de React', descricao: 'Aprenda o básico e o avançado de React.' },
  { id: 2, nome: 'Curso de Node.js', descricao: 'Construa aplicações back-end com Node.js.' },
  { id: 3, nome: 'Curso de Material-UI', descricao: 'Estilize suas aplicações com Material-UI.' },
];

const Cursos: React.FC = () => {
  const navigate = useNavigate();

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
            Nossos Cursos
          </Typography>
          <IconButton color="primary" onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Grid container spacing={4}>
          {cursos.map((curso) => (
            <CursoCard key={curso.id} id={curso.id} nome={curso.nome} descricao={curso.descricao} />
          ))}
        </Grid>
        <BotaoCriarProposta />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default Cursos;
