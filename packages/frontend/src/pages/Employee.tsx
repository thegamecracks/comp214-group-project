import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"

import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import type { Employee } from "@/types"

export default function Employee() {
  const auth = useAuth()
  const toast = useToast()
  const { id } = useParams()
  const { state } = useLocation()
  const [employee, setEmployee] = useState<Employee | null>(state?.employee || null)

  useEffect(() => {
    async function getEmployee() {
      try {
        const { data } = await auth.api.get(`/employees/${id}`, { signal })
        setEmployee(data)
      } catch (error) {
        toast.error(error)
      }
    }

    if (employee) return;
    const controller = new AbortController()
    const signal = controller.signal
    getEmployee()

    return () => controller.abort()
  }, [])

  if (!employee) return (
    <div className="h-svh flex items-center justify-center">
      <div className="loading loading-spinner loading-xl"></div>
    </div>
  )

  const name = employee.first_name ? `${employee.first_name} ${employee.last_name}` : employee.last_name
  return (
    <div className="mx-8 my-4">
      <h1 className="text-3xl font-bold">{name}</h1>
    </div>
  )
}
