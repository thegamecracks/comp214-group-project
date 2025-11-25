import axios from "axios"
import { createContext } from "react"
import type { AxiosInstance } from "axios"

const BASE_URL = `${process.env.BUN_PUBLIC_API}`

export class Auth {
  client: AxiosInstance

  private token: string
  private _setToken: (token: string) => void

  constructor(token: string, setToken: (token: string) => void) {
    this.token = token
    this._setToken = setToken

    const headers = token ? { Authorization: token } : {}
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: headers,
      timeout: 3000,
    })
  }

  get api() : AxiosInstance {
    if (!this.isLoggedIn()) throw new Error("Missing authorization token")
    return this.client
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
}
export const AuthContext = createContext<Auth | null>(null)
