import React from 'react';
import {
  Typography, 
  Container, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box, 
  CssBaseline, 
  GlobalStyles 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BotaoConfiguracoesCurso from '../componentes/BotaoConfiguracoesCurso';
import BotaoPublicarConteudo from '../componentes/BotaoPublicarConteudo';
import Cabecalho from '../componentes/Cabecalho';
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

const ConteudoCurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const modulos = [
    { id: 1, titulo: 'Módulo 1: Introdução', aulas: ['Aula 1.1', 'Aula 1.2'] },
    { id: 2, titulo: 'Módulo 2: Tópicos Avançados', aulas: ['Aula 2.1', 'Aula 2.2'] },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Container component="main" sx={{ mt: 10, flexGrow: 1, pb: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography component="h1" variant="h4">
            Conteúdo do Curso {id}
          </Typography>
          {id && <BotaoConfiguracoesCurso id={id} />}
        </Box>
        
        {modulos.map(modulo => (
          <Accordion key={modulo.id} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Typography>{modulo.titulo}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {modulo.aulas.map(aula => <li key={aula}><Typography>{aula}</Typography></li>)}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}

      </Container>

      {id && <BotaoPublicarConteudo id={id} />}

      <Footer />
    </ThemeProvider>
  );
};

export default ConteudoCurso;
