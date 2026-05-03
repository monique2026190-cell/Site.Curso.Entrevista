import React, { useState } from 'react';
import CabecalhoEtapas from '../componentes/CabecalhoEtapas';
import ModalInserirGmail from '../componentes/ModalInserirGmail';
import { usePagina3 } from '../hooks/usePagina3';

const Pagina3 = () => {
  usePagina3();
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: '2rem',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#121212',
      color: '#FFFFFF',
      fontFamily: `"Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
    },
    question: {
      fontSize: '2.2rem',
      fontWeight: 600,
      backgroundColor: '#1E1E1E',
      padding: '1.5rem 2.5rem',
      borderRadius: '15px',
      marginBottom: '3rem',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      border: '1px solid #333',
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
    },
    optionButton: {
      padding: '1rem 2rem',
      fontSize: '1.2rem',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: '2px solid #FFFFFF',
      borderRadius: '50px',
      width: '400px',
      color: '#FFFFFF',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    }
  };

  const getButtonStyle = (index: number): React.CSSProperties => {
    if (hoveredButton === index) {
      return {
        ...styles.optionButton,
        backgroundColor: '#FFFFFF',
        color: '#121212',
      };
    }
    return styles.optionButton;
  };

  return (
    <>
      <div style={styles.container}>
        <CabecalhoEtapas etapaAtual={3} totalEtapas={3} />
        <h2 style={styles.question}>Você gostaria de ter um passo a passo claro do que dizer e fazer para aumentar suas chances de ser aprovado em entrevistas?</h2>
        <div style={styles.optionsContainer}>
          <button
            style={getButtonStyle(0)}
            onClick={handleOpenModal}
            onMouseEnter={() => setHoveredButton(0)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Sim, quero um método claro para saber exatamente o que dizer e fazer.
          </button>
          <button
            style={getButtonStyle(1)}
            onClick={handleOpenModal}
            onMouseEnter={() => setHoveredButton(1)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Sim, quero me sentir mais seguro(a) e preparado(a) nas entrevistas.
          </button>
          <button
            style={getButtonStyle(2)}
            onClick={handleOpenModal}
            onMouseEnter={() => setHoveredButton(2)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Sim, quero aumentar minhas chances de ser aprovado mais rápido.
          </button>
        </div>
      </div>
      <ModalInserirGmail isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Pagina3;
