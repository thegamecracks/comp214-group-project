import { PlusIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import EmployeeList from "@/components/EmployeeList"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import type { Employee } from "@/types"

export default function Home() {
  const auth = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    async function getEmployees() {
      try {
        const { data } = await auth.api.get("/employees", { signal })
        setEmployees(data)
      } catch (error) {
        toast.error(error)
      }
    }

    const controller = new AbortController()
    const signal = controller.signal
    getEmployees()

    return () => controller.abort()
  }, [])

  function showEmployee(employee: Employee) {
    navigate(`/employees/${employee.employee_id}`, { state: { employee } })
  }

  return (
    <div className="mx-8 my-4">
      <div className="flex">
        <h1 className="text-3xl font-bold">Current Employees</h1>
        <div className="flex-1" />
        <button className="btn"><PlusIcon className="size-6" />Hire</button>
      </div>
      <EmployeeList employees={employees} onSelect={showEmployee} />
    </div>
  )
}
