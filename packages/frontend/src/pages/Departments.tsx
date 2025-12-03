import { useEffect, useState } from "react"

import Banner from "@/components/Banner"
import Table from "@/components/Table"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import type { Department } from "@/types"

export default function Departments() {
  const auth = useAuth()
  const toast = useToast()
  const [departments, setDepartments] = useState<Department[]>([])

  useEffect(() => {
    async function getDepartments() {
      try {
        {
          const { data } = await auth.api.get("/departments", { signal })
          setDepartments(data)
        }
      } catch (error) {
        toast.error(error)
      }
    }

    const controller = new AbortController()
    const signal = controller.signal
    getDepartments()

    return () => controller.abort()
  }, [])

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
