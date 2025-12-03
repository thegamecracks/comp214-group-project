import Banner from "@/components/Banner"
import LoadingPage from "@/components/LoadingPage"
import Table from "@/components/Table"
import { formatEmployee, useCountries, useDepartments, useEmployees, useLocations, useRegions } from "@/lib/state"
import type { Country, Department, Employee, Location, Region } from "@/types"

export default function Departments() {
  const [countries] = useCountries()
  const [departments] = useDepartments()
  const [employees] = useEmployees()
  const [locations] = useLocations()
  const [regions] = useRegions()

  if (!countries || !departments || !employees || !locations || !regions) return <LoadingPage />

  function showDepartment(department: Department) {
    // noop
  }

  return (
    <div className="mx-8 my-4 h-[90svh] flex flex-col">
      <Banner>
        <h1 className="text-xl font-bold">Departments</h1>
      </Banner>
      <DepartmentList
        departments={departments}
        onSelect={showDepartment}
        countries={countries}
        employees={employees}
        locations={locations}
        regions={regions}
      />
    </div>
  )
}

function DepartmentList({
  departments,
  onSelect,
  countries,
  employees,
  locations,
  regions,
}: {
  departments: Department[];
  onSelect: (emp: Department) => void;
  countries: Country[];
  employees: Employee[];
  locations: Location[];
  regions: Region[];
}) {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Location</th>
          <th>Country</th>
          <th>Region</th>
          <th>Manager</th>
        </tr>
      </thead>
      <tbody>
        {departments.map(dep => (
          <DepartmentRow
            department={dep}
            onSelect={onSelect}
            countries={countries}
            employees={employees}
            locations={locations}
            regions={regions}
          />
        ))}
      </tbody>
    </Table>
  )
}

function DepartmentRow({
  department,
  onSelect,
  countries,
  employees,
  locations,
  regions,
}: {
  department: Department;
  onSelect: (emp: Department) => void;
  countries: Country[];
  employees: Employee[];
  locations: Location[];
  regions: Region[];
}) {
  const { department_id } = department

  const location = locations.find(loc => loc.location_id === department.location_id)
  const country = countries.find(c => c.country_id === location?.country_id)
  const region = regions.find(r => r.region_id === country?.region_id)
  const manager = employees.find(emp => emp.employee_id === department.manager_id)

  return (
    <tr key={department_id} onClick={() => onSelect(department)} className="hover:bg-base-300 transition-colors">
      <th>{department_id}</th>
      <td>{department.name}</td>
      <td>{location?.city}</td>
      <td>{country?.name}</td>
      <td>{region?.name}</td>
      <td>{manager ? formatEmployee(manager) : ""}</td>
    </tr>
  )
}
