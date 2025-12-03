import { useEffect, useState } from "react"

import { useAuth } from "./auth"
import { useToast } from "./toast"
import type { Department, Employee, Job } from "@/types"

export function useDepartments() {
  const auth = useAuth()
  const toast = useToast()
  const state = useState<Department[]>([])
  const [departments, setDepartments] = state

  useEffect(() => {
    async function getData() {
      try {
        {
          if (departments.length > 0) return
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
  const state = useState<Employee[]>([])
  const [employees, setEmployees] = state

  useEffect(() => {
    async function getData() {
      try {
        {
          if (employees.length > 0) return
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
  const state = useState<Job[]>([])
  const [jobs, setJobs] = state

  useEffect(() => {
    async function getData() {
      try {
        {
          if (jobs.length > 0) return
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
