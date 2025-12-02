import { Link, Outlet } from "react-router"

import { useAuth } from "@/lib/auth"

export function Frame() {
  const auth = useAuth()
  const loggedIn = auth.isAuthenticated()

  return (
    <div>
      <nav className="navbar flex">
        {loggedIn ? <Link to="/" className="btn btn-ghost text-xl">Home</Link> : <></>}
        <div className="flex-1" />
        {!loggedIn ? <Link to="/login" className="btn btn-ghost text-xl">Login</Link> : <></>}
        {!loggedIn ? <Link to="/login" className="btn btn-ghost text-xl">Register</Link> : <></>}
        {loggedIn ? <button onClick={() => auth.clearAuth()} className="btn btn-ghost text-xl">Logout</button> : <></>}
      </nav>
      <Outlet />
    </div>
  )
}

export default Frame
