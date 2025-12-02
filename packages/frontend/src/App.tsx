import { StrictMode } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

import "./index.css"
import Frame from "./components/Frame"
import { Auth, AuthContext, useAuthData } from "./lib/auth"
import EditEmployee from "./pages/EditEmployee"
import Employees from "./pages/Employees"
import Login from "./pages/Login"
import Protected from "./components/Protected"

export function App() {
  const [auth, setAuth] = useAuthData()

  return (
    <StrictMode>
      <AuthContext value={new Auth(auth, setAuth)}>
        <BrowserRouter>
          <Routes>
            <Route element={<Frame />}>
              <Route element={<Protected />}>
                <Route index element={<Employees />} />
                <Route path="/employees/:id" element={<EditEmployee />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext>
    </StrictMode>
  )
}

export default App
