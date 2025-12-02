import type { Employee } from "@/types"

export function EmployeeList({ employees }: { employees: Employee[] }) {
  return (
    <div className="overflow-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.employee_id}>
              <th>{emp.employee_id}</th>
              <td>{emp.first_name ? `${emp.first_name} ${emp.last_name}` : emp.last_name}</td>
              <td>{emp.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeList
