import { useState } from "react"
import { useLocation, useParams } from "react-router"

import type { Employee } from "@/types"

export default function Employee() {
  const { id } = useParams()
  const { state } = useLocation()
  const [employee, setEmployee] = useState<Employee | null>(state?.employee || null)

  if (!employee) return (
    <div className="h-svh flex items-center justify-center">
      <div className="loading loading-spinner loading-xl"></div>
    </div>
  )

  const name = employee.first_name ? `${employee.first_name} ${employee.last_name}` : employee.last_name
  return (
    <div>
      <h1 className="text-2xl font-bold">{name}</h1>
    </div>
  )
}
