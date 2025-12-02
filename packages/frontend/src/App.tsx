import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

import "./index.css"
import Frame from "./components/Frame"
import { Auth, AuthContext, useAuthData } from "./lib/auth"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Protected from "./components/Protected"

export function App() {
  const [auth, setAuth] = useAuthData()

  return (
    <AuthContext value={new Auth(auth, setAuth)}>
      <BrowserRouter>
        <Routes>
          <Route element={<Frame />}>
            <Route element={<Protected />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext>
  )
}

export default App
