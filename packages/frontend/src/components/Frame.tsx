import { Link, Outlet } from "react-router"

export function Frame() {
  return (
    <div>
      <nav className="navbar flex">
        <Link to="/" className="btn btn-ghost text-xl">Home</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default Frame
