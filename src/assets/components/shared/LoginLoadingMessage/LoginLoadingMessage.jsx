import React, { useState } from 'react';
import LoginLoadingBar from '../LoginLoadingBar/LoginLoadingBar';
import styles from "./LoginLoadingMessage.module.scss"


const LoginLoadingMessage = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "Sending request...",
    "Establishing connection...",
    "Waiting for Server response...",
    "Attempting log in...",
  ];
  const durations = [3000, 4000, 7000, 6000];

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