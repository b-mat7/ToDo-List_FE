import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss'

const Login = () => {
  const [err, setErr] = useState("")

  const navigate = useNavigate()

  const passRef = useRef()

  useEffect(() => {
    const checkToken = async () => {
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
        console.log(response.statusText)
        setErr(response.statusText)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <section className={styles.login}>
      <input ref={passRef} type="password" name="passphrase" id="passphrase" placeholder='Passphrase' />
      <button onClick={handleLogin}>Login</button>
      <p>{err}</p>
    </section>
  );
}

export default Login;