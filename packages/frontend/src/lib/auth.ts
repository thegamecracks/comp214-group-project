import { createContext } from "react"

const BASE_URL = `${process.env.BUN_PUBLIC_API}`.replace(/\/$/, "")

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
    return `${BASE_URL}${path}`
  }

  async fetch(path: string, init?: RequestInit | undefined) {
    if (!this.isLoggedIn()) throw new Error("Missing authorization token")

    init = init || {}
    const input = this.getFullURL(path)
    const headers = new Headers(init.headers || {})
    headers.set("Authorization", this.token)
    return await fetch(input, { ...init, headers })
  }

  async get(path: string, init?: RequestInit | undefined) {
    return await this.fetch(path, { ...init, method: "GET" })
  }

  async post(path: string, init?: RequestInit | undefined) {
    return await this.fetch(path, { ...init, method: "POST" })
  }

  async put(path: string, init?: RequestInit | undefined) {
    return await this.fetch(path, { ...init, method: "PUT" })
  }

  async patch(path: string, init?: RequestInit | undefined) {
    return await this.fetch(path, { ...init, method: "PATCH" })
  }

  async delete(path: string, init?: RequestInit | undefined) {
    return await this.fetch(path, { ...init, method: "DELETE" })
  }
}
export const AuthContext = createContext<Auth | null>(null)
