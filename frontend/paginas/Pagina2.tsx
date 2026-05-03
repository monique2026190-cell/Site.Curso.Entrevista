import React, { startTransition, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CabecalhoEtapas from '../componentes/CabecalhoEtapas';
import { usePagina2 } from '../hooks/usePagina2';

const Pagina2 = () => {
  usePagina2();
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  const handleNavigation = () => {
    startTransition(() => {
      navigate('/pagina3'); // This will navigate to the next page
    });
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
    <div style={styles.container}>
      <CabecalhoEtapas etapaAtual={2} totalEtapas={3} />
      <h2 style={styles.question}>Quando você participa de entrevistas, qual desses fatores mais te atrapalha?</h2>
      <div style={styles.optionsContainer}>
        <button
          style={getButtonStyle(0)}
          onClick={handleNavigation}
          onMouseEnter={() => setHoveredButton(0)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Não sei o que responder na hora.
        </button>
        <button
          style={getButtonStyle(1)}
          onClick={handleNavigation}
          onMouseEnter={() => setHoveredButton(1)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Fico nervoso(a) e travo.
        </button>
        <button
          style={getButtonStyle(2)}
          onClick={handleNavigation}
          onMouseEnter={() => setHoveredButton(2)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Não consigo me destacar dos outros candidatos
        </button>
        <button
          style={getButtonStyle(3)}
          onClick={handleNavigation}
          onMouseEnter={() => setHoveredButton(3)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Não sei o que os recrutadores querem ouvir
        </button>
      </div>
    </div>
  );
};

export default Pagina2;
