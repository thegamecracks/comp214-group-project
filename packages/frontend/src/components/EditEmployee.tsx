import type { Employee } from "@/types"

export function EditEmployee({
  employee,
  onChange,
}: {
  employee: Employee;
  onChange: (emp: Employee) => void;
}) {
  const name = employee.first_name ? `${employee.first_name} ${employee.last_name}` : employee.last_name
  return (
    <div>
      <h1 className="text-2xl font-bold">{name}</h1>
    </div>
  )
}

export default EditEmployee
