import React, { useState } from 'react';

interface GavetaProps {
  title: string;
  children: React.ReactNode;
}

const Gaveta: React.FC<GavetaProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles: { [key: string]: React.CSSProperties } = {
    gaveta: {
      border: '1px solid #333',
      borderRadius: '8px',
      marginBottom: '10px',
      backgroundColor: '#1E1E1E',
    },
    header: {
      padding: '15px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    content: {
      padding: '15px',
      borderTop: '1px solid #333',
    },
  };

  return (
    <div style={styles.gaveta}>
      <div style={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div style={styles.content}>{children}</div>}
    </div>
  );
};

export default Gaveta;
