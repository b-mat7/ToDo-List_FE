import { useRef } from 'react';

import styles from './Login.module.scss'

const Login = () => {

  const passRef = useRef()

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/login`, {
        method: "POST",
        headers: {
          // siehe http only...
          "content-type": "application/json"
        },
        body: JSON.stringify({passphrase : passRef.current.value})
      })

      if(response.ok) {
        const result = await response.json()
        console.log(result)
        // navigate /home
      }

      else {
        const result = await response.json()
        console.log(result)
      }

    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <section className={styles.login}>
      <input ref={passRef} type="text" name="passphrase" id="passphrase" placeholder='Passphrase'/>
      <button onClick={handleLogin}>Login</button>
    </section>
  );
}

export default Login;