import { useEffect } from "react"
import { useNavigate, useViewTransitionState } from "react-router"

import { useAuth } from "@/lib/auth"

export function Home() {
  const auth = useAuth()
  const navigate = useNavigate()
  const inTransition = useViewTransitionState("/")

  useEffect(() => {
    if (inTransition) return; // Wait for previous transition to finish
    const options = { replace: true, viewTransition: true }
    if (auth.isAuthenticated()) navigate("/employees", options)
    else navigate("/login", options)
  }, [inTransition])

  return <></>
}

export default Home
