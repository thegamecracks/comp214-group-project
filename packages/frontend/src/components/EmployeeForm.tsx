import { useReducer, useState } from "react"

import type { Department, Employee, Job } from "@/types"

export default function EmployeeForm({
  selected,
  mode,
  departments = [],
  employees = [],
  jobs = [],
  onSubmit = async () => { },
  onCancel = () => { },
}: {
  selected: Employee;
  mode: "hire" | "edit";
  departments: Department[];
  employees: Employee[];
  jobs: Job[];
  onSubmit: (emp: Employee) => Promise<any>;
  onCancel: () => void;
}) {
  const [pending, setPending] = useState(false)
  const [state, dispatch] = useEmployeeReducer(selected)

  function handleUndo() {
    Object.entries(selected).forEach(e => dispatch([e[0], e[1]]))
  }

  function handleSubmit() {
    setPending(true)
    onSubmit(state).finally(() => setPending(false))
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="h-[90svh] mx-8 my-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{formatEmployeeName(state, { departments, employees, jobs })}</h1>
      <fieldset className="grid grid-cols-3 gap-4">
        {mode === "edit" && (
          <label className="input input-lg validator">
            <span className="label">Employee ID</span>
            <input type="number" value={state.employee_id} onChange={e => dispatch(["employee_id", e.target.value])}
              disabled
            />
          </label>
        )}
        <label className="input input-lg validator">
          <span className="label">First Name</span>
          <input type="text" value={state.first_name || ""} onChange={e => dispatch(["first_name", e.target.value])}
            disabled={mode !== "hire"}
          />
        </label>
        <label className="input input-lg validator">
          <span className="label">Last Name</span>
          <input type="text" value={state.last_name} onChange={e => dispatch(["last_name", e.target.value])}
            disabled={mode !== "hire"}
          />
        </label>
        <label className="input input-lg validator">
          <span className="label">Email</span>
          <input type="text" value={state.email} onChange={e => dispatch(["email", e.target.value])} />
        </label>
        <label className="input input-lg validator">
          <span className="label">Phone Number</span>
          <input type="text" value={state.phone_number || ""} onChange={e => dispatch(["phone_number", e.target.value])} />
        </label>
        {mode === "edit" && (
          <label className="input input-lg validator">
            <span className="label">Hire Date</span>
            <input type="date" value={state.hire_date} onChange={e => dispatch(["hire_date", e.target.value])}
              disabled
            />
          </label>
        )}
        <label className="select select-lg">
          <span className="label">Job</span>
          <select defaultValue={state.job_id} onChange={e => dispatch(["job_id", e.target.value])}
            disabled={mode !== "hire"}
          >
            {jobs.map(job => (
              <option key={job.job_id} value={job.job_id}>{job.job_title}</option>
            ))}
          </select>
        </label>
        <label className="input input-lg validator">
          <span className="label">Salary ($)</span>
          <input type="number" value={state.salary || ""} onChange={e => dispatch(["salary", e.target.value])} />
        </label>
        {mode === "edit" && (
          <label className="input input-lg validator">
            <span className="label">Commission</span>
            <input type="text" value={state.commission_pct || ""} onChange={e => dispatch(["commission_pct", e.target.value])}
              disabled
            />
          </label>
        )}
        <label className="select select-lg">
          <span className="label">Manager</span>
          <select defaultValue={state.manager_id || ""} onChange={e => dispatch(["manager_id", e.target.value])}
            disabled={mode !== "hire"}
          >
            <option value="">None</option>
            {employees.map(emp => (
              <option key={emp.employee_id} value={emp.employee_id}>{formatEmployeeName(emp, { departments, employees, jobs })}</option>
            ))}
          </select>
        </label>
        <label className="select select-lg">
          <span className="label">Department</span>
          <select defaultValue={state.department_id || ""} onChange={e => dispatch(["department_id", e.target.value])}
            disabled={mode !== "hire"}
          >
            <option value="">None</option>
            {departments.map(dep => (
              <option key={dep.department_id} value={dep.department_id}>{dep.name}</option>
            ))}
          </select>
        </label>
      </fieldset>
      <div className="flex-1" />
      <div className="flex flex-wrap justify-end gap-4">
        <button onClick={onCancel} className="btn" disabled={pending}>Cancel</button>
        <button onClick={handleUndo} className="btn" disabled={pending}>Undo</button>
        <button onClick={handleSubmit} type="submit" className="btn btn-wide" disabled={pending}>Apply</button>
      </div>
    </form>
  )
}

function formatEmployeeName(selected: Employee, {
  departments = [],
  employees = [],
  jobs = [],
}: {
  departments: Department[];
  employees: Employee[];
  jobs: Job[];
}) {
  let name = selected.last_name
  if (selected.first_name) name = `${selected.first_name} ${name}`

  const job = selected.job_id && jobs.find(job => job.job_id === selected.job_id)
  if (job) name = `${name}, ${job.job_title}`

  return name
}

function useEmployeeReducer(selected: Employee) {
  function reducer(state: Employee, [key, value]: [keyof Employee, Employee[keyof Employee]]) {
    const nullable: (keyof Employee)[] = ["first_name", "phone_number", "salary", "commission_pct", "manager_id", "department_id"]
    const numeric: (keyof Employee)[] = ["employee_id", "salary", "commission_pct", "manager_id", "department_id"]
    if (nullable.includes(key) && !value) value = null
    if (numeric.includes(key) && value !== "") value = Number(value)
    return { ...state, [key]: value }
  }

  return useReducer(reducer, selected)
}
