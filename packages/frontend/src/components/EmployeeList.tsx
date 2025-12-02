import type { Employee } from "@/types"

export function EmployeeList({ employees }: { employees: Employee[] }) {
  return (
    <div className="overflow-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.employee_id} onClick={() => showEmployee(emp)} className="hover:bg-base-300 transition-colors">
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

function showEmployee(emp: Employee) {
  console.log(`Selected ${emp.last_name}`)
}

export default EmployeeList
