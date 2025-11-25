import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import type { FormEvent } from "react"

import { AuthContext } from "@/lib/auth"

function Login() {
  const auth = useContext(AuthContext)!
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function tryLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const url = auth.getFullURL("/auth/token")
    const body = new FormData(e.currentTarget)
    try {
      const res = await fetch(url, { body, method: "POST" })
      const payload = await res.json()
      if (payload.error) throw new Error(payload.error.message)
      if (!res.ok) throw new Error(`HTTP ${res.status} (${res.statusText})`)

      auth.setToken(`${payload.token_type} ${payload.access_token}`)
      navigate("/", { replace: true })
    } catch (error) {
      setError(String(error))
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <form onSubmit={tryLogin} className="flex flex-col p-4 gap-4 bg-base-200">
        <h1 className="text-2xl font-bold">Log In</h1>
        <label className="input w-md">
          Name
          <input type="text" name="username" placeholder="johndoe1234" required />
        </label>
        <label className="input w-md">
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit" className="btn btn-primary">Login</button>
        {error ? <p className="alert alert-error">{error}</p> : <></>}
      </form>
    </div>
  )
}

export default Login
