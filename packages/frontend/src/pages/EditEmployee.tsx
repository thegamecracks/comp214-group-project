import { useNavigate, useParams } from "react-router"

import EmployeeForm from "@/components/EmployeeForm"
import { useDepartments, useEmployees, useJobs } from "@/lib/state"
import type { Employee } from "@/types"

export default function EditEmployee() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [departments] = useDepartments()
  const [employees] = useEmployees()
  const [jobs] = useJobs()

  if (!id) return (
    <div className="alert alert-error">
      <span>No employee ID specified.</span>
    </div>
  )

  if (!departments || !employees || !jobs) return (
    <div className="h-[90svh] flex items-center justify-center">
      <div className="loading loading-spinner loading-xl"></div>
    </div>
  )

  const selected = employees.find(emp => String(emp.employee_id) === id)
  if (!selected) return (
    <div className="alert alert-error">
      <span>Employee #{id} not found.</span>
    </div>
  )

  async function onSubmit(e: Employee) {
    console.log(e)
  }

  function onCancel() {
    navigate("/employees", { viewTransition: true })
  }

  return (
    <EmployeeForm
      selected={selected}
      mode="edit"
      departments={departments}
      employees={employees}
      jobs={jobs}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  )
}
