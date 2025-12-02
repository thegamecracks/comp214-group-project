import { Link, Outlet } from "react-router"

import { useAuth } from "@/lib/auth"

export function Frame() {
  const auth = useAuth()

  return (
    <div>
      <nav className="navbar flex">
        <Link to="/" className="btn btn-ghost text-xl">Home</Link>
        <div className="flex-1" />
        {!auth.isAuthenticated() ? <Link to="/login" className="btn btn-ghost text-xl">Login</Link> : <></>}
        {!auth.isAuthenticated() ? <Link to="/login" className="btn btn-ghost text-xl">Register</Link> : <></>}
        {auth.isAuthenticated() ? <button onClick={() => auth.clearAuth()} className="btn btn-ghost text-xl">Logout</button> : <></>}
      </nav>
      <Outlet />
    </div>
  )
}

export default Frame
