import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Protected = () => {
  const [auth, setAuth] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/validate`,
          {
            credentials: "include"
          })

        if (response.ok) {
          setAuth(true)
        } else {
          navigate("/login")
        }
      } catch (error) {
        console.error(error.message)
      }
    }
    validateToken()
  }, [])

  return (
    <section>
      {auth && <Outlet />}
    </section>
  );
}

export default Protected;