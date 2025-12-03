import { PlusIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useNavigate } from "react-router"

import Banner from "@/components/Banner"
import Table from "@/components/Table"
import { useDepartments, useEmployees, useJobs } from "@/lib/state"
import type { Department, Employee, Job } from "@/types"

type EmployeeFilter = {
  department?: Department
  job?: Job
}

export default function Employees() {
  const navigate = useNavigate()
  const [departments] = useDepartments()
  const [employees] = useEmployees()
  const [jobs] = useJobs()
  const [filter, setFilter] = useState<EmployeeFilter>({})

  function filterByDepartment(department: Department) {
    if (filter.department?.department_id !== department.department_id) setFilter({ ...filter, department })
    else setFilter({ ...filter, department: undefined })
  }

  function filterByJob(job: Job) {
    if (filter.job?.job_id !== job.job_id) setFilter({ ...filter, job })
    else setFilter({ ...filter, job: undefined })
  }

  function showEmployee(employee: Employee) {
    navigate(`/employees/${employee.employee_id}`, { viewTransition: true })
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
        <DepartmentList departments={departments} selected={[filter.department?.department_id]} onSelect={filterByDepartment} />
      </section>
      <section className="row-span-2 col-span-4 overflow-auto shadow rounded">
        <Banner>
          <h1 className="text-2xl font-bold">Current Employees</h1>
          <div className="flex-1" />
          <button className="btn"><PlusIcon className="size-6" />Hire</button>
        </Banner>
        <EmployeeList employees={filteredEmployees} selected={[]} onSelect={showEmployee} />
      </section>
      <section className="row-span-1 col-span-4 overflow-auto shadow rounded">
        <Banner>
          <h1 className="text-xl font-bold">Filter by job</h1>
        </Banner>
        <JobList jobs={jobs} selected={[filter.job?.job_id]} onSelect={filterByJob} />
      </section>
    </div>
  )
}

function DepartmentList({
  departments,
  selected,
  onSelect,
}: {
  departments: Department[];
  selected: (Department["department_id"] | undefined)[];
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
          <tr key={dep.department_id} onClick={() => onSelect(dep)} className={rowStyle(selected.includes(dep.department_id))}>
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
  selected,
  onSelect,
}: {
  employees: Employee[];
  selected: (Employee["employee_id"] | undefined)[];
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
          <tr key={emp.employee_id} onClick={() => onSelect(emp)} className={rowStyle(selected.includes(emp.employee_id))}>
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
  selected,
  onSelect,
}: {
  jobs: Job[];
  selected: (Job["job_id"] | undefined)[];
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
          <tr key={job.job_id} onClick={() => onSelect(job)} className={rowStyle(selected.includes(job.job_id))}>
            <th>{job.job_id}</th>
            <td>{job.job_title}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

function rowStyle(selected: boolean) {
  return "transition-colors " + (selected ? "bg-indigo-100 hover:bg-indigo-200" : "hover:bg-base-300")
}
