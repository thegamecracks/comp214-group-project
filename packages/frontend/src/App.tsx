import { StrictMode } from "react"
import { RouterProvider } from "react-router"

import "./index.css"
import { Auth, AuthContext, useAuthData } from "./lib/auth"
import router from "./Router"

export function App() {
  const [auth, setAuth] = useAuthData()

  return (
    <StrictMode>
      <AuthContext value={new Auth(auth, setAuth)}>
        <RouterProvider router={router} />
      </AuthContext>
    </StrictMode>
  )
}

export default App
