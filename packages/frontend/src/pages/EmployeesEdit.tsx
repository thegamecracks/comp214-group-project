import { useNavigate, useParams } from "react-router"

import EmployeeForm from "@/components/EmployeeForm"
import LoadingPage from "@/components/LoadingPage"
import { useAuth } from "@/lib/auth"
import { useDepartments, useEmployees, useJobs } from "@/lib/state"
import { useToast } from "@/lib/toast"
import type { Employee } from "@/types"

export default function EmployeesEdit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const auth = useAuth()
  const toast = useToast()
  const [departments] = useDepartments()
  const [employees, setEmployees] = useEmployees()
  const [jobs] = useJobs()

  if (!id) return (
    <div className="alert alert-error">
      <span>No employee ID specified.</span>
    </div>
  )

  if (!departments || !employees || !jobs) return <LoadingPage />

  const selected = employees.find(emp => String(emp.employee_id) === id)
  if (!selected) return (
    <div className="alert alert-error">
      <span>Employee #{id} not found.</span>
    </div>
  )

  async function onSubmit(emp: Employee) {
    if (!employees) return;
    const payload = { email: emp.email, phone_number: emp.phone_number, salary: emp.salary }
    try {
      const { data } = await auth.api.patch(`/employees/${emp.employee_id}`, payload)
      toast.success("Successfully updated employee!")
      setEmployees(employees.map(emp => emp.employee_id === data.employee_id ? data : emp ))
    } catch (error) {
      toast.error(error)
    }
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
