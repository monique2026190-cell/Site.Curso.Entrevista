import React, { useState } from 'react';
import { Card, CardContent, Typography, Container, Button, CardMedia, CssBaseline, GlobalStyles } from '@mui/material';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardMetodosPagamento from '../componentes/card.metodos.pagamento.tsx';
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

const DetalhesCurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);

  const curso = {
    id: id,
    nome: `Curso de ${id}`,
    descricao: `Descrição detalhada do curso de ${id}.`,
    preco: 'R$ 49,99',
    imagem: 'https://via.placeholder.com/300'
  };

  const handleComprar = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Container component="main" sx={{ mt: 10 }}>
        <Card sx={{ bgcolor: 'background.paper' }}>
          <CardMedia
            component="img"
            height="300"
            image={curso.imagem}
            alt={`Imagem do ${curso.nome}`}
          />
          <CardContent>
            <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
              {curso.nome}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              {curso.preco}
            </Typography>
            <Typography variant="body1">
              {curso.descricao}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleComprar}>
              Comprar Agora
            </Button>
          </CardContent>
        </Card>
        <CardMetodosPagamento open={open} onClose={handleClose} />
      </Container>
    </ThemeProvider>
  );
};

export default DetalhesCurso;
