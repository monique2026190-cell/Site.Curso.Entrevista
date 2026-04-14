import React from 'react';
import { Container, Typography, Box, CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../componentes/Footer';
import MeusCursosCard from '../componentes/conteiner.meus.curso.tsx';
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

const meusCursos = [
  {
    id: 1,
    nome: 'Curso de React',
    progresso: 75,
    imagemUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    nome: 'Curso de Node.js',
    progresso: 50,
    imagemUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 4,
    nome: 'Curso de TypeScript',
    progresso: 25,
    imagemUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
  },
];

const MeusCursos: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#121212' } }} />
      <Cabecalho />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container sx={{ mt: 10, mb: 8, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            Meus Cursos
          </Typography>
          {
            meusCursos.map(curso => (
              <MeusCursosCard 
                key={curso.id} 
                id={curso.id} 
                nome={curso.nome} 
                progresso={curso.progresso} 
                imagemUrl={curso.imagemUrl} 
              />
            ))
          }
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default MeusCursos;
