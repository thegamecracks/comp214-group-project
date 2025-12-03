import Table from "./Table"
import type { Department } from "@/types"

export default function DepartmentList({
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
