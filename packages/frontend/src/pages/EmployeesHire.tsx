import { useNavigate } from "react-router"

import EmployeeForm from "@/components/EmployeeForm"
import { useAuth } from "@/lib/auth"
import { useDepartments, useEmployees, useJobs } from "@/lib/state"
import { useToast } from "@/lib/toast"
import type { Employee } from "@/types"

export default function EmployeesHire() {
  const navigate = useNavigate()
  const auth = useAuth()
  const toast = useToast()
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

  async function onSubmit(emp: Employee) {
    const payload = { ...emp, employee_id: undefined, hire_date: undefined, commission_pct: undefined }
    try {
      const { data } = await auth.api.post("/employees", payload)
      toast.success("Successfully hired employee!")
      navigate(`/employees/${data.employee_id}`, { viewTransition: true })
    } catch (error) {
      toast.error(error)
    }
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
