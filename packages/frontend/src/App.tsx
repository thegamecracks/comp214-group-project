import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import type { ReactNode } from "react"

import "./index.css"
import Frame from "./components/Frame"
import { Auth, AuthContext, useAuthData } from "./lib/auth"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Protected from "./components/Protected"
import { Toast, ToastContext } from "./lib/toast"

export function App() {
  const [auth, setAuth] = useAuthData()
  const [toast, setToast] = useState<ReactNode | null>(null)

  return (
    <AuthContext value={new Auth(auth, setAuth)}>
      <BrowserRouter>
        <ToastContext value={new Toast(setToast)}>
          {toast}
          <Routes>
            <Route element={<Frame />}>
              <Route element={<Protected />}>
                <Route index element={<Home />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </ToastContext>
      </BrowserRouter>
    </AuthContext>
  )
}

export default App
