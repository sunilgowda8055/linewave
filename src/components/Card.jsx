import React from 'react';

const Card = ({ children }) => {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '4px', 
      padding: '10px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      marginLeft: '20px',
      marginRight: '20px',
      width: 'auto', // Ensure the card adjusts for any screen width
      maxWidth: 'calc(100% - 40px)' // Limit the max width to adjust for margins
    }}>
      {children}
    </div>
  );
};

export default Card;
