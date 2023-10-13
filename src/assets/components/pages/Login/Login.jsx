import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.scss'

const Login = () => {

  const navigate = useNavigate()

  const passRef = useRef()

  useEffect(() => {
    const checkToken = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/validate`,
      {
        credentials: "include"
      })
      if(response.ok) {
        navigate("/home")
      }
    }
    checkToken()
  }, [])

  const handleLogin = async () => {
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
      } else {
        // PW falsch anzeigen
      }

    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <section className={styles.login}>
      <input ref={passRef} type="text" name="passphrase" id="passphrase" placeholder='Passphrase' />
      <button onClick={handleLogin}>Login</button>
    </section>
  );
}

export default Login;