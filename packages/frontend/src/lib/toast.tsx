import axios from "axios"
import { createContext, useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import type { ReactNode } from "react"

import { useAuth } from "./auth"

export function ExpiredSessionToast() {
  const auth = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  function login() {
    auth.clearAuth()
    toast.clear()
    navigate("/login")
  }

  return (
    <ErrorToast>
      <span>Your session has expired. Please log in again!</span>
      <button onClick={login} className="btn btn-sm btn-primary">Login</button>
    </ErrorToast>
  )
}

export function ErrorToast({ children }: { children: ReactNode }) {
  const toast = useToast()
  startToastTimeout(toast)
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-error">
        {children}
      </div>
    </div>
  )
}

export function SuccessToast({ children }: { children: ReactNode }) {
  const toast = useToast()
  startToastTimeout(toast)
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        {children}
      </div>
    </div>
  )
}

function startToastTimeout(toast: Toast) {
  useEffect(() => {
    const id = setTimeout(() => toast.clear(), 10000)
    return () => clearTimeout(id)
  }, [toast])
}

export class Toast {
  setNode: (node: ReactNode) => void

  constructor(setNode: (node: ReactNode) => void) {
    this.setNode = setNode
  }

  success(message: string | ReactNode) {
    const node = typeof message === "string" ? <span>{message}</span> : message
    const toast = <SuccessToast>{node}</SuccessToast>
    this.setNode(toast)
  }

  error(error: any) {
    if (error.name === "CanceledError") return;

    let toast = (
      <ErrorToast>
        <span>{error.message || error}</span>
      </ErrorToast>
    )

    if (axios.isAxiosError(error) && error.config?.baseURL == process.env.BUN_PUBLIC_API) {
      const message = error.response?.data?.detail
      const messageString = message ? String(message) : ""

      if (error.status === 401) {
        toast = <ExpiredSessionToast />
      } else if (messageString) {
        toast = <ErrorToast><span>{messageString}</span></ErrorToast>
      }
    }

    this.setNode(toast)
  }

  clear() {
    this.setNode(null)
  }
}

export const ToastContext = createContext<Toast | null>(null)
export const useToast = () => useContext(ToastContext)!
