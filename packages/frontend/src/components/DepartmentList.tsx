import type { Department } from "@/types"

export function DepartmentList({
  departments,
  onSelect,
}: {
  departments: Department[];
  onSelect: (emp: Department) => void;
}) {
  return (
    <div className="overflow-auto">
      <table className="table table-sm table-zebra">
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
      </table>
    </div>
  )
}

export default DepartmentList
