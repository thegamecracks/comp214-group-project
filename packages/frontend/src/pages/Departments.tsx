import Banner from "@/components/Banner"
import LoadingPage from "@/components/LoadingPage"
import Table from "@/components/Table"
import { useDepartments } from "@/lib/state"
import type { Department } from "@/types"

export default function Departments() {
  const [departments] = useDepartments()

  if (!departments) return <LoadingPage />

  function showDepartment(department: Department) {
    // noop
  }

  return (
    <div className="mx-8 my-4 h-[90svh] flex flex-col">
      <Banner>
        <h1 className="text-xl font-bold">Departments</h1>
      </Banner>
      <DepartmentList departments={departments} onSelect={showDepartment} />
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
