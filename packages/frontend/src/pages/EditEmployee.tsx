import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { FormEvent } from "react"

import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import type { Department, Employee, Job } from "@/types"

export default function EditEmployee() {
  const { id } = useParams()
  const { department, employee, job, manager } = useEmployee(id!)
  const [email, setEmail] = useState(employee?.email || "")
  const [phoneNumber, setPhoneNumber] = useState(employee?.phone_number || "")
  const [salary, setSalary] = useState(String(employee?.salary ?? ""))

  useEffect(() => {
    if (!employee) return;
    setEmail(employee.email)
    setPhoneNumber(employee.phone_number || "")
    setSalary(String(employee?.salary ?? ""))
  }, [employee])

  if (!employee) return (
    <div className="h-[90svh] flex items-center justify-center">
      <div className="loading loading-spinner loading-xl"></div>
    </div>
  )

  function editEmployee(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(email)
    console.log(phoneNumber)
    console.log(salary)
  }

  let name = employee.last_name
  if (employee.first_name) name = `${employee.first_name} ${name}`
  if (job) name = `${name}, ${job.job_title}`

  let managerName = manager?.last_name ?? ""
  if (manager?.first_name) managerName = `${manager.first_name} ${managerName}`

  return (
    <form onSubmit={editEmployee} className="h-[90svh] mx-8 my-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{name}</h1>
      <fieldset className="grid grid-cols-3 gap-4">
        <label className="input input-lg validator">
          <span className="label">Employee ID</span>
          <input type="text" value={employee.employee_id} disabled />
        </label>
        <label className="input input-lg validator">
          <span className="label">First Name</span>
          <input type="text" value={employee.first_name || ""} disabled />
        </label>
        <label className="input input-lg validator">
          <span className="label">Last Name</span>
          <input type="text" value={employee.last_name} disabled />
        </label>
        <label className="input input-lg validator">
          <span className="label">Email</span>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="input input-lg validator">
          <span className="label">Phone Number</span>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <label className="input input-lg validator">
          <span className="label">Hire Date</span>
          <input type="date" value={employee.hire_date} disabled />
        </label>
        <label className="input input-lg validator">
          <span className="label">Job</span>
          <input type="text" value={job?.job_title} disabled />
        </label>
        <label className="input input-lg validator">
          <span className="label">Salary ($)</span>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </label>
        <label className="input input-lg validator">
          <span className="label">Commission</span>
          <input type="text" value={employee.commission_pct || ""} disabled />
        </label>
        <label className="input input-lg validator">
          <span className="label">Manager</span>
          <input type="text" value={managerName} disabled />
        </label>
        <label className="input input-lg validator">
          <span className="label">Department</span>
          <input type="text" value={department?.name} disabled />
        </label>
      </fieldset>
      <div className="flex-1" />
      <div className="flex flex-wrap justify-end gap-4">
        <button className="btn">Cancel</button>
        <button className="btn btn-wide">Apply</button>
      </div>
    </form>
  )
}

function useEmployee(employee_id: string) {
  const auth = useAuth()
  const toast = useToast()
  const [department, setDepartment] = useState<Department | null>(null)
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [job, setJob] = useState<Job | null>(null)
  const [manager, setManager] = useState<Employee | null>(null)

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await auth.api.get(`/employees/${employee_id}`, { signal })
        setEmployee(data)

        const { department_id } = data
        if (department_id) {
          const { data } = await auth.api.get(`/departments/${department_id}`, { signal })
          setDepartment(data)
        }

        const { job_id } = data
        if (job_id) {
          const { data } = await auth.api.get(`/jobs/${job_id}`, { signal })
          setJob(data)
        }

        const { manager_id } = data
        if (manager_id) {
          const { data } = await auth.api.get(`/employees/${manager_id}`, { signal })
          setManager(data)
        }
      } catch (error) {
        toast.error(error)
      }
    }

    const controller = new AbortController()
    const signal = controller.signal
    getData()

    return () => controller.abort()
  }, [])

  return { department, employee, job, manager }
}
