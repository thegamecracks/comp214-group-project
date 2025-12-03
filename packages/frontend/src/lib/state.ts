import { useEffect, useState } from "react"

import { useAuth } from "./auth"
import { useToast } from "./toast"
import type { Department, Employee, Job } from "@/types"

export function formatEmployee(selected: Employee, {
  departments = [],
  employees = [],
  jobs = [],
}: {
  departments: Department[];
  employees: Employee[];
  jobs: Job[];
}) {
  let name = selected.last_name
  if (selected.first_name) name = `${selected.first_name} ${name}`

  const job = selected.job_id && jobs.find(job => job.job_id === selected.job_id)
  if (job) name = `${name}, ${job.job_title}`

  return name
}

export function useDepartments() {
  const auth = useAuth()
  const toast = useToast()
  const state = useState<Department[] | null>(null)
  const [departments, setDepartments] = state

  useEffect(() => {
    async function getData() {
      try {
        {
          if (departments) return
          const { data } = await auth.api.get("/departments", { signal })
          setDepartments(data)
        }
      } catch (error) {
        toast.error(error)
      }
    }

    const controller = new AbortController()
    const signal = controller.signal
    getData()

    return () => controller.abort()
  }, [])

  return state
}

export function useEmployees() {
  const auth = useAuth()
  const toast = useToast()
  const state = useState<Employee[] | null>(null)
  const [employees, setEmployees] = state

  useEffect(() => {
    async function getData() {
      try {
        {
          if (employees) return
          const { data } = await auth.api.get("/employees", { signal })
          setEmployees(data)
        }
      } catch (error) {
        toast.error(error)
      }
    }

    const controller = new AbortController()
    const signal = controller.signal
    getData()

    return () => controller.abort()
  }, [])

  return state
}

export function useJobs() {
  const auth = useAuth()
  const toast = useToast()
  const state = useState<Job[] | null>(null)
  const [jobs, setJobs] = state

  useEffect(() => {
    async function getData() {
      try {
        {
          if (jobs) return
          const { data } = await auth.api.get("/jobs", { signal })
          setJobs(data)
        }
      } catch (error) {
        toast.error(error)
      }
    }

    const controller = new AbortController()
    const signal = controller.signal
    getData()

    return () => controller.abort()
  }, [])

  return state
}

export function useEmployee(employee_id: string) {
  const auth = useAuth()
  const toast = useToast()
  const [department, setDepartment] = useState<Department | null>(null)
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [job, setJob] = useState<Job | null>(null)
  const [manager, setManager] = useState<Employee | null>(null)

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

        const { manager_id } = data
        if (manager_id) {
          const { data } = await auth.api.get(`/employees/${manager_id}`, { signal })
          setManager(data)
        }
      } catch (error) {
        toast.error(error)
      }
    }

    const controller = new AbortController()
    const signal = controller.signal
    getData()

    return () => controller.abort()
  }, [])

  return { department, employee, job, manager }
}

export function useJob(job_id: string) {
  const auth = useAuth()
  const toast = useToast()
  const state = useState<Job | null>(null)
  const [job, setJob] = state

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await auth.api.get(`/jobs/${job_id}`, { signal })
        setJob(data)
      } catch (error) {
        toast.error(error)
      }
    }

    if (job) return;
    const controller = new AbortController()
    const signal = controller.signal
    getData()

    return () => controller.abort()
  }, [])

  return state
}
