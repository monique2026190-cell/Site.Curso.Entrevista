import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface MeusCursosCardProps {
  id: number;
  nome: string;
  progresso: number;
  imagemUrl?: string; 
}

const MeusCursosCard: React.FC<MeusCursosCardProps> = ({ id, nome, progresso, imagemUrl }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/conteudo-curso/${id}`);
  };

  return (
    <Card 
      sx={{ 
        mb: 3, 
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#1E1E1E',
        boxShadow: '0 8px 24px 0 rgba(0,0,0,0.5)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 32px 0 rgba(0,0,0,0.6)',
        },
        height: '200px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'flex-end',
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%), url(${imagemUrl || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ position: 'relative', zIndex: 2, color: '#FFFFFF' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {nome}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={progresso} 
              sx={{ height: 8, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.3)', '& .MuiLinearProgress-bar': { backgroundColor: '#BB86FC' } }}
            />
          </Box>
          <Box sx={{ minWidth: 40 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{`${Math.round(progresso)}%`}</Typography>
          </Box>
        </Box>
        <Button variant="contained" color="primary" size="small" sx={{ backgroundColor: '#BB86FC', '&:hover': { backgroundColor: '#9e66d4' } }}>
          Continuar
        </Button>
      </CardContent>
    </Card>
  );
};

export default MeusCursosCard;
