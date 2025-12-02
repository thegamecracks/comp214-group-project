import { PlusIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import type { ReactNode } from "react"

import DepartmentList from "@/components/DepartmentList"
import EmployeeList from "@/components/EmployeeList"
import JobList from "@/components/JobList"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import type { Department, Employee, Job } from "@/types"

type EmployeeFilter = {
  department?: Department
  job?: Job
}

export default function Home() {
  const auth = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [departments, setDepartments] = useState<Department[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [filter, setFilter] = useState<EmployeeFilter>({})

  useEffect(() => {
    async function getEmployees() {
      try {
        {
          const { data } = await auth.api.get("/departments", { signal })
          setDepartments(data)
        }
        {
          const { data } = await auth.api.get("/employees", { signal })
          setEmployees(data)
        }
        {
          const { data } = await auth.api.get("/jobs", { signal })
          setJobs(data)
        }
      } catch (error) {
        toast.error(error)
      }
    }

    const controller = new AbortController()
    const signal = controller.signal
    getEmployees()

    return () => controller.abort()
  }, [])

  function filterByDepartment(department: Department) {
    setFilter({ ...filter, department })
  }

  function filterByJob(job: Job) {
    setFilter({ ...filter, job })
  }

  function showEmployee(employee: Employee) {
    navigate(`/employees/${employee.employee_id}`, { state: { employee } })
  }

  const filteredEmployees = employees.filter(emp => {
    if (filter.department && emp.department_id !== filter.department.department_id) return false
    if (filter.job && emp.job_id !== filter.job.job_id) return false
    return true
  })

  return (
    <div className="mx-8 my-4 h-[90svh] grid grid-flow-col grid-cols-5 grid-rows-3 gap-4">
      <section className="row-span-3 col-span-1 overflow-auto shadow rounded">
        <Header>
          <h1 className="text-xl font-bold">Filter by department</h1>
        </Header>
        <DepartmentList departments={departments} onSelect={filterByDepartment} />
      </section>
      <section className="row-span-2 col-span-4 overflow-auto shadow rounded">
        <Header>
          <h1 className="text-2xl font-bold">Current Employees</h1>
          <div className="flex-1" />
          <button className="btn"><PlusIcon className="size-6" />Hire</button>
        </Header>
        <EmployeeList employees={filteredEmployees} onSelect={showEmployee} />
      </section>
      <section className="row-span-1 col-span-4 overflow-auto shadow rounded">
        <Header>
          <h1 className="text-xl font-bold">Filter by job</h1>
        </Header>
        <JobList jobs={jobs} onSelect={filterByJob} />
      </section>
    </div>
  )
}

function Header({ children }: { children: ReactNode }) {
  return (
    <div className="sticky top-0 z-10 min-h-12 flex bg-base-200 items-center px-4 py-2 shadow">
      {children}
    </div>
  )
}
