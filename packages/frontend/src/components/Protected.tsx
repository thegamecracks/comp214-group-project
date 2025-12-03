import { Link, Outlet } from "react-router"

import { useAuth } from "@/lib/auth"

export default function Protected() {
  const auth = useAuth()
  if (auth.isAuthenticated()) return <Outlet />

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1 className="text-2xl font-bold">This page requires authentication!</h1>
      <p className="flex gap-4 items-center">
        Please click the following button to login.
        <Link to="/login" className="btn" viewTransition>Login</Link>
      </p>
    </div>
  )
}
