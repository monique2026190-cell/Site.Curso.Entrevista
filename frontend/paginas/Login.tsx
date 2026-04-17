
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Container, Typography, Box, Paper, TextField, Button } from '@mui/material';
import { useLogin } from '../hooks/useLogin';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleGoogleSuccess, handleGoogleError, handleEmailPasswordLogin } = useLogin();

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ 
        padding: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        marginTop: 8,
      }}>
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
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_black"
            text="signin_with"
            shape="rectangular"
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
