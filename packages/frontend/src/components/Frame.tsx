import { useContext } from "react"
import { Link, Outlet } from "react-router"

import { AuthContext } from "@/lib/auth"

export function Frame() {
  const auth = useContext(AuthContext)!

  return (
    <div>
      <nav className="navbar flex">
        <Link to="/" className="btn btn-ghost text-xl">Home</Link>
        <div className="flex-1" />
        {!auth.isLoggedIn() ? <Link to="/login" className="btn btn-ghost text-xl">Login</Link> : <></>}
        {!auth.isLoggedIn() ? <Link to="/login" className="btn btn-ghost text-xl">Register</Link> : <></>}
        {auth.isLoggedIn() ? <button onClick={auth.clearToken} className="btn btn-ghost text-xl">Logout</button> : <></>}
      </nav>
      <Outlet />
    </div>
  )
}

export default Frame
