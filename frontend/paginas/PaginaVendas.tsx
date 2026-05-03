import React from 'react';
import Cabecalho from '../componentes/Cabecalho';
import QuemSomos from '../componentes/QuemSomos';
import Depoimentos from '../componentes/Depoimentos';
import Gaveta from '../componentes/Gaveta';
import ComoFunciona from '../componentes/ComoFunciona';
import { LINK_KIWIFY } from '../app.links';
import { usePaginaVendas } from '../hooks/usePaginaVendas'; // Importando o hook

const PaginaVendas: React.FC = () => {
  // Utilizando o hook para obter o estado e os manipuladores de eventos
  const { isButtonHovered, setIsButtonHovered, handleBuyButtonClick } = usePaginaVendas();

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      color: '#FFFFFF',
      backgroundColor: '#121212',
      textAlign: 'center',
    },
    mainContent: {
      padding: '40px 80px',
    },
    p: {
      fontSize: '18px',
      color: '#B3B3B3',
      lineHeight: '1.6',
    },
    productSection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '50px',
      marginBottom: '50px',
      backgroundColor: '#1E1E1E',
      padding: '40px',
      borderRadius: '15px',
      border: '1px solid #333',
    },
    productImage: {
      width: '300px',
      height: '300px',
      backgroundColor: '#333', // Placeholder for an image
      borderRadius: '10px',
    },
    productDetails: {
      textAlign: 'left',
      maxWidth: '500px',
    },
    productTitle: {
      fontSize: '32px',
      color: '#FFFFFF',
      marginBottom: '20px',
    },
    buyButton: {
      backgroundColor: isButtonHovered ? '#FFFFFF' : 'transparent',
      color: isButtonHovered ? '#121212' : '#FFFFFF',
      padding: '15px 30px',
      border: '2px solid #FFFFFF',
      borderRadius: '50px',
      fontSize: '20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      fontWeight: 'bold',
      marginTop: '20px',
    },
    footer: {
      padding: '20px 40px',
      borderTop: '1px solid #333',
      fontSize: '12px',
      color: '#B3B3B3',
      background: '#1E1E1E',
    },
    gavetasContainer: {
      maxWidth: '800px',
      margin: '50px auto 0 auto',
    },
  };

  return (
    <div style={styles.container}>
      <Cabecalho />
      
      <main style={styles.mainContent}>
        <div style={styles.productSection}>
          <div style={styles.productImage} />
          <div style={styles.productDetails}>
            <h2 style={styles.productTitle}>Curso Preparatório para Entrevistas</h2>
            <p style={styles.p}>
              Nosso curso completo oferece videoaulas, simulados de entrevistas com feedback personalizado e material de apoio para você se sentir seguro e preparado para qualquer desafio.
            </p>
            {/* O link agora chama a função do hook */}
            <a href={LINK_KIWIFY} onClick={handleBuyButtonClick} style={{ textDecoration: 'none' }}>
              <button 
                style={styles.buyButton}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                Adquirir Curso
              </button>
            </a>
          </div>
        </div>
        <div style={styles.gavetasContainer}>
          <Gaveta title="Quem Somos">
            <QuemSomos />
          </Gaveta>
          <Gaveta title="O que nossos alunos dizem">
            <Depoimentos />
          </Gaveta>
          <Gaveta title="Como funciona o acesso">
            <ComoFunciona />
          </Gaveta>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2024 EntrevistaPro. Todos os direitos reservados.</p>
        <p>Contato: email@entrevistapro.com</p>
      </footer>
    </div>
  );
};

export default PaginaVendas;
