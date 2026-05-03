import React from 'react';
import { useModalEmail } from '../hooks/useModalEmail';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalInserirGmail: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { email, setEmail, handleSubmit } = useModalEmail(onClose);

  if (!isOpen) {
    return null;
  }

  const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#2c2c2c',
      padding: '30px',
      borderRadius: '15px',
      width: '90%',
      maxWidth: '500px',
      textAlign: 'center',
      border: '1px solid #444',
      color: '#FFFFFF',
    },
    h2: {
      fontSize: '24px',
      marginBottom: '15px',
    },
    p: {
      fontSize: '16px',
      color: '#B3B3B3',
      marginBottom: '25px',
    },
    input: {
      width: 'calc(100% - 20px)',
      padding: '12px',
      marginBottom: '20px',
      borderRadius: '8px',
      border: '1px solid #555',
      backgroundColor: '#3a3a3a',
      color: '#FFFFFF',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#FFFFFF',
      color: '#121212',
      padding: '12px 25px',
      border: 'none',
      borderRadius: '50px',
      fontSize: '18px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'transform 0.2s ease',
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.h2}>Reserve sua Vaga</h2>
        <p style={styles.p}>
          Para reservar sua vaga, nos informe o seu e-mail.
        </p>
        <input 
          type="email"
          style={styles.input} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="seu.melhor.email@exemplo.com"
        />
        <button onClick={handleSubmit} style={styles.button}>Reservar Vaga</button>
      </div>
    </div>
  );
};

export default ModalInserirGmail;
