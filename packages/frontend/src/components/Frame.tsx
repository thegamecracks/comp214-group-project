import { useState } from "react"
import { Link, Outlet } from "react-router"
import type { ReactNode } from "react"

import { useAuth } from "@/lib/auth"
import { Toast, ToastContext } from "@/lib/toast"

export function Frame() {
  const auth = useAuth()
  const [toast, setToast] = useState<ReactNode | null>(null)

  const loggedIn = auth.isAuthenticated()

  return (
    <ToastContext value={new Toast(setToast)}>
      <nav className="navbar flex min-h-0 px-4 py-2 bg-base-100 shadow">
        {loggedIn ? <Link to="/" className="btn btn-ghost text-xl" viewTransition>Employees</Link> : <></>}
        <div className="flex-1" />
        {!loggedIn ? <Link to="/login" className="btn btn-ghost text-xl" viewTransition>Login</Link> : <></>}
        {!loggedIn ? <Link to="/login" className="btn btn-ghost text-xl" viewTransition>Register</Link> : <></>}
        {loggedIn ? <Link to="/login" onClick={() => auth.clearAuth()} className="btn btn-ghost text-xl">Logout</Link> : <></>}
      </nav>
      <Outlet />
      {toast}
    </ToastContext>
  )
}

export default Frame
