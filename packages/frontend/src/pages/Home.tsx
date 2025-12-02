import { useEffect, useState } from "react"

import EmployeeList from "@/components/EmployeeList"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import type { Employee } from "@/types"

export function Home() {
  const auth = useAuth()
  const toast = useToast()
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    async function getEmployees() {
      try {
        const { data } = await auth.api.get("/employees/", { signal })
        setEmployees(data)
      } catch (error) {
        toast.error(error)
      }
    }

    const controller = new AbortController()
    const signal = controller.signal
    getEmployees()

    return () => controller.abort()
  }, [auth])

  return (
    <div className="mx-8 my-4">
      <h1 className="text-3xl font-bold">Current Employees</h1>
      <EmployeeList employees={employees} />
    </div>
  )
}

export default Home
