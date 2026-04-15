
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Container, Typography, Box, Paper, CssBaseline, GlobalStyles, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../contexto/contexto.autenticacao';
import { env } from '../config/env';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#90CAF9',
    },
  },
});

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isGoogleAuthConfigured = env.googleClientId && !env.googleClientId.includes('SEU_GOOGLE_CLIENT_ID');

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      login(credentialResponse.credential);
    }
  };

  const handleGoogleError = () => {
    console.error('Login com Google falhou');
  };

  const handleEmailPasswordLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically call a login function from your auth context
    // For now, we'll just log the credentials
    console.log({ email, password });
    // Example: login(email, password);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#121212", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' } }} />
      <Container component="main" maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleEmailPasswordLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
          <Box>
            {isGoogleAuthConfigured ? (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_black"
                text="signin_with"
                shape="rectangular"
              />
            ) : (
              <Box sx={{ textAlign: 'center', p: 2, border: '1px dashed grey', borderRadius: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  A autenticação do Google não está configurada.
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Para habilitar o login, defina <code>VITE_GOOGLE_CLIENT_ID</code> no seu arquivo <code>.env</code>.
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
