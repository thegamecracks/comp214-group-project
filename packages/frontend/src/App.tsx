import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import type { ReactNode } from "react"

import "./index.css"
import Frame from "./components/Frame"
import { Auth, AuthContext, useAuthData } from "./lib/auth"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Protected from "./components/Protected"
import { Toast, ToastContext } from "./lib/Toast"

export function App() {
  const [auth, setAuth] = useAuthData()
  const [toast, setToast] = useState<ReactNode | null>(null)

  return (
    <AuthContext value={new Auth(auth, setAuth)}>
      <ToastContext value={new Toast(setToast)}>
        {toast}
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
      </ToastContext>
    </AuthContext>
  )
}

export default App
