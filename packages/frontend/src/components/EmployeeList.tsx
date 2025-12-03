import Table from "./Table"
import type { Employee } from "@/types"

export default function EmployeeList({
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
