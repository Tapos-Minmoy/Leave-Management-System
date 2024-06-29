import React from 'react';

const Oops = () => {

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Access Denied</h1>
      <p style={styles.message}>You do not have permission to access this page. Please log in with the appropriate account to continue.</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  heading: {
    fontSize: '2em',
    color: '#333',
  },
  message: {
    fontSize: '1.2em',
    color: '#666',
    margin: '20px 0',
    textAlign: 'center',
  },
  button: {
    fontSize: '1em',
    padding: '10px 20px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Oops;
