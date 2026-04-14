import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { Category, CreateNewFolder, Publish } from '@mui/icons-material';

interface BotaoPublicarConteudoProps {
  id: string;
}

const BotaoPublicarConteudo: React.FC<BotaoPublicarConteudoProps> = ({ id }) => {
  const navigate = useNavigate();

  const actions = [
    { icon: <CreateNewFolder />, name: 'Criar Pasta', handler: () => navigate(`/criar-pasta/${id}`) },
    { icon: <Publish />, name: 'Publicar Conteúdo', handler: () => navigate(`/criar-conteudo/${id}`) },
    { icon: <Category />, name: 'Criar Categoria', handler: () => navigate(`/criar-categoria/${id}`) },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial para criação de conteúdo"
      sx={{ position: 'fixed', bottom: 80, right: 30 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.handler}
          sx={{
            bgcolor: '#1a1d24',
            color: '#ffffff',
            '&:hover': {
              bgcolor: '#2a2d34'
            }
          }}
        />
      ))}
    </SpeedDial>
  );
};

export default BotaoPublicarConteudo;
