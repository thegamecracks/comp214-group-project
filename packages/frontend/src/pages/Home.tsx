import { useEffect, useState } from "react"

import EditEmployee from "@/components/EditEmployee"
import EmployeeList from "@/components/EmployeeList"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import type { Employee } from "@/types"

export default function Home() {
  const auth = useAuth()
  const toast = useToast()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selected, setSelected] = useState<Employee | null>(null)

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
  }, [auth])

  function onEmployeeChange(emp: Employee) {
    setEmployees(employees.map((e) => e.employee_id === emp.employee_id ? emp : e))
  }

  return (
    <div className="mx-8 my-4">
      <h1 className="text-3xl font-bold">Current Employees</h1>
      <EmployeeList employees={employees} onSelect={(emp) => setSelected(emp)} />

      {selected ? (
        <section onClick={() => setSelected(null)} className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity block">
          <div className="m-8 h-svh bg-base-100 rounded-md">
            <button onClick={() => setSelected(null)} className="btn btn-circle btn-ghost float-right m-2">X</button>
            <div className="px-8 py-4">
              <EditEmployee employee={selected} onChange={onEmployeeChange} />
            </div>
          </div>
        </section>
      ) : <></>}
    </div>
  )
}
