import { useNavigate, useParams } from "react-router"

import EmployeeForm from "@/components/EmployeeForm"
import { useDepartments, useEmployees, useJobs } from "@/lib/state"
import type { Employee } from "@/types"

export default function EmployeesHire() {
  const navigate = useNavigate()
  const [departments] = useDepartments()
  const [employees] = useEmployees()
  const [jobs] = useJobs()

  if (!departments || !employees || !jobs) return (
    <div className="h-[90svh] flex items-center justify-center">
      <div className="loading loading-spinner loading-xl"></div>
    </div>
  )

  const template: Employee = {
    employee_id: 0,
    first_name: null,
    last_name: "",
    email: "",
    phone_number: null,
    hire_date: "",
    job_id: "",
    salary: null,
    commission_pct: null,
    manager_id: null,
    department_id: null,
  }

  async function onSubmit(e: Employee) {
    console.log(e)
  }

  function onCancel() {
    navigate("/employees", { viewTransition: true })
  }

  return (
    <EmployeeForm
      selected={template}
      mode="hire"
      departments={departments}
      employees={employees}
      jobs={jobs}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  )
}
