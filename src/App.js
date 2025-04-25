import React, { useState } from 'react';

function CareerAdvice() {
  const [jobRole, setJobRole] = useState('');
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setJobRole(e.target.value);
  };

  const getCareerAdvice = async () => {
    if (!jobRole) {
      setError('Please provide a job role.');
      setAdvice('');
      return;
    }

    setError('');
    setAdvice('');

    try {
      const response = await fetch('http://127.0.0.1:5000/get-career-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_role: jobRole }),
      });

      const data = await response.json();

      if (response.ok) {
        setAdvice(data.response);
      } else {
        setError(data.error || 'Something went wrong!');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎯 AI Career Coach</h1>

        <p style={styles.subtitle}>Get a personalized roadmap for any job role.</p>

        <input
          type="text"
          placeholder="Enter job role (e.g. Data Scientist)"
          value={jobRole}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button onClick={getCareerAdvice} style={styles.button}>
          Get Career Advice
        </button>

        {error && <div style={styles.error}>⚠️ {error}</div>}

        {advice && (
          <div style={styles.responseBox}>
            <h3 style={{ marginBottom: '10px' }}>🧭 Career Advice</h3>
            <pre style={styles.pre}>{advice}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #e0f7fa, #ffffff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  title: {
    fontSize: '28px',
    marginBottom: '10px',
    color: '#007BFF',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    outline: 'none',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  error: {
    marginTop: '15px',
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  responseBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'left',
    marginTop: '25px',
    whiteSpace: 'pre-wrap',
    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.05)',
  },
  pre: {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.5',
    fontFamily: 'inherit',
  },
};

export default CareerAdvice;





