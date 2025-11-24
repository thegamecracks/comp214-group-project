import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

import "./index.css"
import Frame from "./components/Frame"
import { Auth, AuthContext } from "./lib/auth"
import Home from "./pages/Home"

export function App() {
  const [token, setToken] = useState("")

  return (
    <AuthContext value={new Auth(token, setToken)}>
      <BrowserRouter>
        <Routes>
          <Route element={<Frame />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext>
  )
}

export default App
