import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { School, Comment, ThumbUp } from '@mui/icons-material';

interface NotificacaoCardProps {
  tipo: 'novo_curso' | 'novo_comentario' | 'curtida';
  mensagem: string;
  data: string;
  lida?: boolean;
}

const getNotificationStyle = (tipo: NotificacaoCardProps['tipo']) => {
  switch (tipo) {
    case 'novo_curso':
      return { icon: <School />, color: '#BB86FC' };
    case 'novo_comentario':
      return { icon: <Comment />, color: '#03DAC6' };
    case 'curtida':
      return { icon: <ThumbUp />, color: '#CF6679' };
    default:
      return { icon: null, color: '#FFFFFF' };
  }
};

const NotificacaoCard: React.FC<NotificacaoCardProps> = ({ tipo, mensagem, data, lida = false }) => {
  const { icon, color } = getNotificationStyle(tipo);

  return (
    <Card sx={{
      mb: 2,
      display: 'flex',
      alignItems: 'stretch',
      backgroundColor: lida ? '#1E1E1E' : '#2A2A2A',
      borderLeft: `5px solid ${color}`,
      boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 15px 0 rgba(0, 0, 0, 0.3)',
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: 'rgba(0,0,0,0.1)' }}>
          <Avatar sx={{ bgcolor: 'transparent', color: color }}>
              {icon}
          </Avatar>
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="body1" sx={{ color: '#E0E0E0', fontWeight: lida ? 'normal' : 'bold' }}>
          {mensagem}
        </Typography>
        <Typography variant="caption" sx={{ color: '#A0A0A0', mt: 0.5 }}>
          {data}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificacaoCard;
