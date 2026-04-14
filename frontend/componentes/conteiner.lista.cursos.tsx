import React from 'react';
import { Card, CardContent, Typography, Grid, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface CursoCardProps {
  id: number;
  nome: string;
  descricao: string;
}

const CursoCard: React.FC<CursoCardProps> = ({ id, nome, descricao }) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        onClick={() => navigate(`/curso/${id}`)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          bgcolor: 'background.paper',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',

          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
          }
        }}
      >
        {/* Área visual/topo */}
        <Box
          sx={{
            height: 140,
            background: 'linear-gradient(135deg, #1e293b, #3b82f6)',
          }}
        />

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: 'text.primary',
            }}
          >
            {nome}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.6,
            }}
          >
            {descricao}
          </Typography>
        </CardContent>

        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              py: 1.2,
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              boxShadow: 'none',

              '&:hover': {
                boxShadow: '0 6px 20px rgba(59,130,246,0.3)',
              }
            }}
          >
            Ver curso
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default CursoCard;
