import { useEffect, useState } from "react"
import { useParams } from "react-router"

import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import type { Department, Employee, Job } from "@/types"

export default function EditEmployee() {
  const { id } = useParams()
  const { department, employee, job } = useEmployee(id!)

  if (!employee) return (
    <div className="h-[90svh] flex items-center justify-center">
      <div className="loading loading-spinner loading-xl"></div>
    </div>
  )

  let name = employee.last_name
  if (employee.first_name) name = `${employee.first_name} ${name}`
  if (job) name = `${name}, ${job.job_title}`

  return (
    <div className="h-[90svh] mx-8 my-4">
      <h1 className="text-3xl font-bold">{name}</h1>
    </div>
  )
}

function useEmployee(employee_id: string) {
  const auth = useAuth()
  const toast = useToast()
  const [department, setDepartment] = useState<Department | null>(null)
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [job, setJob] = useState<Job | null>(null)

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await auth.api.get(`/employees/${employee_id}`, { signal })
        setEmployee(data)

        const { department_id } = data
        if (department_id) {
          const { data } = await auth.api.get(`/departments/${department_id}`, { signal })
          setDepartment(data)
        }

        const { job_id } = data
        if (job_id) {
          const { data } = await auth.api.get(`/jobs/${job_id}`, { signal })
          setJob(data)
        }
      } catch (error) {
        toast.error(error)
      }
    }

    if (employee) return;
    const controller = new AbortController()
    const signal = controller.signal
    getData()

    return () => controller.abort()
  }, [])

  return { department, employee, job }
}
