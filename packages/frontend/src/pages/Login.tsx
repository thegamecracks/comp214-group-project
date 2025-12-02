import axios from "axios"
import { useNavigate } from "react-router"
import type { FormEvent } from "react"

import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  async function tryLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const res = await auth.client.post("/auth/token", e.target)
      auth.saveAuthFromResponse(res)
      navigate("/", { replace: true, viewTransition: true })
    } catch (error) {
      if (!axios.isAxiosError(error)) toast.error(error)
      else if (error.status === 401) toast.error("Sorry, you entered an incorrect username or password.")
      else toast.error(error)
    }
  }

  return (
    <div className="h-[90svh] flex flex-col items-center justify-center">
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
      </form>
    </div>
  )
}
