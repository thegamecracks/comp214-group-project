import { createContext } from "react"

export class Auth {
  token: string
  _setToken: (token: string) => void

  constructor(token: string, setToken: (token: string) => void) {
    this.token = token
    this._setToken = setToken
  }

  setToken(token: string) {
    sessionStorage.setItem("token", token)
    this._setToken(token)
  }

  clearToken() {
    sessionStorage.removeItem("token")
    this._setToken("")
  }

  isLoggedIn() {
    return !!this.token
  }

  getFullURL(path: string) {
    return `${import.meta.env.VITE_API_BASE}${path}`
  }

  async authFetch(input: RequestInfo | URL, init?: RequestInit | undefined) {
    if (!this.isLoggedIn()) throw new Error("Missing authorization token")

    init = init || {}
    const headers = new Headers(init.headers || {})
    headers.set("Authorization", this.token)
    return await fetch(input, { ...init, headers })
  }
}
export const AuthContext = createContext<Auth | null>(null)
