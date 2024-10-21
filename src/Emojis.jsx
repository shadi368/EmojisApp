import React, { useEffect, useState } from 'react';

const Emojis = () => {
  const [progress, setProgress] = useState(0);
  const [emoji, setEmoji] = useState('😀');
  const [isDone, setIsDone] = useState(false);

  const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊'];

  useEffect(() => {
    let intervalId;
    
    if (!isDone) {
      // Progress bar and emoji change
      intervalId = setInterval(() => {
        setProgress(prev => {
          if (prev < 100) {
            return prev + 2; // Fills in 50 seconds
          } else {
            clearInterval(intervalId);
            setIsDone(true); // Switch to done state
            return prev;
          }
        });

        // Change emoji every second
        setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isDone, emojis]);

  return (
    <div style={styles.modal}>
      <div style={styles.header}>
        <button style={styles.closeBtn} onClick={() => alert('Modal Closed!')}>X</button>
      </div>
      <div style={styles.content}>
        {isDone ? (
          <>
            <div style={styles.emoji}>✅</div>
            <p style={styles.message}>Done!</p>
          </>
        ) : (
          <>
            <div style={styles.emoji}>{emoji}</div>
            <p style={styles.message}>Processing...</p>
            <div style={styles.progressBarContainer}>
              <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
            </div>
            <p style={styles.timeLeft}>Remaining: {Math.max(0, (50 - Math.round(progress / 2)))} seconds</p>
          </>
        )}
      </div>
      <button style={styles.continueBtn} disabled={!isDone}>Continue</button>
    </div>
  );
};

// Styles
const styles = {
  modal: {
    width: '300px',
    height: '250px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeBtn: {
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '18px',
    cursor: 'pointer',
  },
  content: {
    marginTop: '10px',
  },
  emoji: {
    fontSize: '40px',
  },
  message: {
    fontSize: '18px',
    margin: '10px 0',
  },
  progressBarContainer: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    margin: '10px 0',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#4caf50',
    borderRadius: '4px',
  },
  timeLeft: {
    fontSize: '14px',
    color: '#888',
  },
  continueBtn: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Emojis;
