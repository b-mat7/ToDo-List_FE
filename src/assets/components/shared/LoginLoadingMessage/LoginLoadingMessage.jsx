import React, { useState } from 'react';
import LoginLoadingBar from '../LoginLoadingBar/LoginLoadingBar';
import styles from "./LoginLoadingMessage.module.scss"


const LoginLoadingMessage = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "Sending request...",
    "Establishing connection...",
    "Starting Server...",
    "Trying to log in...",
  ];
  const durations = [3000, 5000, 6000, 6000];

  const onComplete = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage((prev) => prev + 1);
    }
  };

  return (
    <LoginLoadingBar
      message={messages[currentMessage]}
      duration={durations[currentMessage]}
      onComplete={onComplete}
    />
  );
};

export default LoginLoadingMessage;