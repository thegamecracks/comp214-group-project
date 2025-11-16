import { Link } from "react-router"

export function Navbar() {
  return (
    <nav className="navbar flex">
      <Link to="/" className="btn btn-ghost text-xl">Home</Link>
    </nav>
  )
}

export default Navbar
