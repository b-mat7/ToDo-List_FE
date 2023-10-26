import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss'

const Login = () => {
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
        setErr("Wrong passphrase")
      }
    } catch (error) {
      console.error(error.message)
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
      <div className={styles.err_container}>
        {err && <p>{err}</p>}
      </div>
    </section>
  );
}

export default Login;