import React from 'react';
import { Container, Typography, Box, CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../componentes/Footer';
import NotificacaoCard from '../componentes/conteiner.notificacao.tsx';
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

const notificacoes = [
  { tipo: 'novo_curso', mensagem: 'Novo curso de React Native disponível!', data: '2 dias atrás', lida: false },
  { tipo: 'novo_comentario', mensagem: 'João comentou na sua proposta.', data: '1 dia atrás', lida: false },
  { tipo: 'curtida', mensagem: 'Maria curtiu sua proposta.', data: '3 horas atrás', lida: true },
];

const Notificacoes: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Cabecalho />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container sx={{ mt: 10, mb: 8, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>Notificações</Typography>
          {
            notificacoes.map((notificacao, index) => (
              <NotificacaoCard key={index} tipo={notificacao.tipo as any} mensagem={notificacao.mensagem} data={notificacao.data} lida={notificacao.lida} />
            ))
          }
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Notificacoes;
