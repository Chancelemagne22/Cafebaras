import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './designs/index.css';

const InactivityWrapper = ({ timeout = 500000, pictureSrc }) => {
  const [showPicture, setShowPicture] = useState(false);

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      setShowPicture(false); // Hide picture on activity
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowPicture(true); // Show picture after inactivity
      }, timeout);
    };

    // Set up mousemove listener
    window.addEventListener('mousemove', resetTimer);

    // Start the timer initially
    resetTimer();

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
    };
  }, [timeout]);

  return (
    <div>
      {showPicture ? (
        <img src={pictureSrc} alt="Inactivity" style={{ width: 'auto', height: '100%' }} />
      ) : (
        <App />
      )}
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InactivityWrapper timeout={500000} pictureSrc="Cafebara_GIF1.gif" />
  </StrictMode>
);
