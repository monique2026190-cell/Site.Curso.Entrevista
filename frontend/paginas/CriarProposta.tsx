import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, CssBaseline, GlobalStyles, CircularProgress, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCriarCurso } from '../hooks/useCriarCurso'; // Importando o hook

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

const CriarProposta: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const { salvarCurso, loading, error } = useCriarCurso(); // Usando o hook

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await salvarCurso({ nome, descricao });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212" } }} />
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
          Criar Proposta de Curso
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="titulo"
            label="Título da Proposta"
            name="titulo"
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            variant="outlined"
            InputLabelProps={{
              style: { color: '#E0E0E0' },
            }}
            sx={{ input: { color: 'white' }, '.MuiOutlinedInput-root': { '.MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="descricao"
            label="Descrição da Proposta"
            name="descricao"
            multiline
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            variant="outlined"
            InputLabelProps={{
              style: { color: '#E0E0E0' },
            }}
            sx={{ textarea: { color: 'white' }, '.MuiOutlinedInput-root': { '.MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } } }}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Enviar Proposta'}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CriarProposta;
