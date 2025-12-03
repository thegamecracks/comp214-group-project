import { PlusIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import Banner from "@/components/Banner"
import Table from "@/components/Table"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import type { Department, Employee, Job } from "@/types"

type EmployeeFilter = {
  department?: Department
  job?: Job
}

export default function Employees() {
  const auth = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [departments, setDepartments] = useState<Department[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [filter, setFilter] = useState<EmployeeFilter>({})

  useEffect(() => {
    async function getData() {
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
    getData()

    return () => controller.abort()
  }, [])

  function filterByDepartment(department: Department) {
    if (filter.department?.department_id !== department.department_id) setFilter({ ...filter, department })
    else setFilter({ ...filter, department: undefined })
  }

  function filterByJob(job: Job) {
    if (filter.job?.job_id !== job.job_id) setFilter({ ...filter, job })
    else setFilter({ ...filter, job: undefined })
  }

  function showEmployee(employee: Employee) {
    navigate(`/employees/${employee.employee_id}`, { state: { employee }, viewTransition: true })
  }

  const filteredEmployees = employees.filter(emp => {
    if (filter.department && emp.department_id !== filter.department.department_id) return false
    if (filter.job && emp.job_id !== filter.job.job_id) return false
    return true
  })

  return (
    <div className="mx-8 my-4 h-[90svh] grid grid-flow-col grid-cols-5 grid-rows-3 gap-4">
      <section className="row-span-3 col-span-1 overflow-auto shadow rounded">
        <Banner>
          <h1 className="text-xl font-bold">Filter by department</h1>
        </Banner>
        <DepartmentList departments={departments} onSelect={filterByDepartment} />
      </section>
      <section className="row-span-2 col-span-4 overflow-auto shadow rounded">
        <Banner>
          <h1 className="text-2xl font-bold">Current Employees</h1>
          <div className="flex-1" />
          <button className="btn"><PlusIcon className="size-6" />Hire</button>
        </Banner>
        <EmployeeList employees={filteredEmployees} onSelect={showEmployee} />
      </section>
      <section className="row-span-1 col-span-4 overflow-auto shadow rounded">
        <Banner>
          <h1 className="text-xl font-bold">Filter by job</h1>
        </Banner>
        <JobList jobs={jobs} onSelect={filterByJob} />
      </section>
    </div>
  )
}

function DepartmentList({
  departments,
  onSelect,
}: {
  departments: Department[];
  onSelect: (emp: Department) => void;
}) {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {departments.map(dep => (
          <tr key={dep.department_id} onClick={() => onSelect(dep)} className="hover:bg-base-300 transition-colors">
            <th>{dep.department_id}</th>
            <td>{dep.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

function EmployeeList({
  employees,
  onSelect,
}: {
  employees: Employee[];
  onSelect: (emp: Employee) => void;
}) {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.employee_id} onClick={() => onSelect(emp)} className="hover:bg-base-300 transition-colors">
            <th>{emp.employee_id}</th>
            <td>{emp.first_name ? `${emp.first_name} ${emp.last_name}` : emp.last_name}</td>
            <td>{emp.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

function JobList({
  jobs,
  onSelect,
}: {
  jobs: Job[];
  onSelect: (emp: Job) => void;
}) {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map(job => (
          <tr key={job.job_id} onClick={() => onSelect(job)} className="hover:bg-base-300 transition-colors">
            <th>{job.job_id}</th>
            <td>{job.job_title}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
