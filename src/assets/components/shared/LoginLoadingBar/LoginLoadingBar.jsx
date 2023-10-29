import React, { useEffect, useState } from 'react';
import styles from './LoginLoadingBar.module.scss'


const LoginLoadingBar = ({ message, duration, onComplete }) => {
  const [percentage, setPercentage] = useState(0.5);
  const intervalTime = 100; // Interval time in milliseconds
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => Math.min(prev + 100 * (intervalTime / duration), 100));
    }, intervalTime);

    const timeoutMessageUpdate = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, duration);

    const timeoutResetBar = setTimeout(() => {
      setPercentage(0); // Reset percentage to 0 at the end of each message
    }, duration + intervalTime);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutMessageUpdate);
      clearTimeout(timeoutResetBar);
    };
  }, [message, duration, onComplete]);

  return (
    <div>
      <div className={styles.loading_bar_container}>
        <div className={styles.loading_bar} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className={styles.loading_message}>{message}</div>
    </div>
  );
};


export default LoginLoadingBar;