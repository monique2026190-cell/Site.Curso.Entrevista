import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Avatar,
  Link as MuiLink,
  CssBaseline,
  Divider
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../componentes/logo';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90CAF9',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#BDBDBD',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1rem',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  }
});

const Login: React.FC = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim() && senha.trim()) {
      navigate('/completar-perfil');
    }
  };

  const handleGoogleLogin = () => {
    // Lógica de login com Google (a ser implementada)
    console.log("Login com Google clicado");
    // Exemplo: navigate('/completar-perfil');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '100vh',
          px: 2,
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4,
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 48, height: 48 }}>
              <Logo />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'text.primary' }}>
              Bem-vindo de volta!
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome de Usuário"
                name="nome"
                autoComplete="username"
                autoFocus
                variant="outlined"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
                autoComplete="current-password"
                variant="outlined"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                Entrar
              </Button>
              <Box sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
                <MuiLink href="#" variant="body2" sx={{ color: 'primary.main' }}>
                  Esqueceu a senha?
                </MuiLink>
              </Box>
              <Divider sx={{ my: 2 }}>OU</Divider>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                sx={{ py: 1.5 }}
              >
                Entrar com Google
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
