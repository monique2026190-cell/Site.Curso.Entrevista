import React from 'react';

interface CabecalhoEtapasProps {
  etapaAtual: number;
  totalEtapas: number;
}

const CabecalhoEtapas: React.FC<CabecalhoEtapasProps> = ({ etapaAtual, totalEtapas }) => {
  // A barra de progresso reflete as etapas concluídas (etapaAtual - 1).
  // O progresso total é dividido pelo número total de etapas.
  const progresso = etapaAtual > 1 ? ((etapaAtual - 1) / totalEtapas) * 100 : 0;

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: '100%',
      padding: '20px 0',
      textAlign: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    barraContainer: {
      width: '80%',
      maxWidth: '500px',
      height: '4px',
      backgroundColor: '#333',
      borderRadius: '2px',
      margin: '0 auto',
      position: 'relative',
    },
    barraProgresso: {
      width: `${progresso}%`,
      height: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: '2px',
      transition: 'width 0.5s ease-in-out',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.barraContainer}>
        <div style={styles.barraProgresso}></div>
      </div>
    </div>
  );
};

export default CabecalhoEtapas;