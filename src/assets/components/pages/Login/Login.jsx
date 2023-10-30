import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss'

import LoginLoadingBar from '../../shared/LoginLoadingBar/LoginLoadingBar';
import LoginLoadingMessage from '../../shared/LoginLoadingMessage/LoginLoadingMessage';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState("")

  const navigate = useNavigate()
  const passRef = useRef()


  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/validate`,
          {
            credentials: "include"
          })

        if (response.ok) {
          navigate("/home")
        }
      } catch (error) {
        console.error(error.message)
      }
    }
    validateToken()
  }, [])


  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ passphrase: passRef.current.value })
      })

      if (response.ok) {
        navigate("/home")
        setIsLoading(false)
      } else {
        setErr("Wrong passphrase")
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <section className={styles.login}>
      <div className={styles.passphrase_container}>
        <input
          ref={passRef}
          type="password"
          name="passphrase"
          id="passphrase"
          placeholder='Passphrase' />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className={styles.animation_container}>
        {isLoading &&
          <>
            <LoginLoadingBar />
            <LoginLoadingMessage />
          </>
        }
        {err && <p>{err}</p>}
      </div>
    </section>
  );
}

export default Login;