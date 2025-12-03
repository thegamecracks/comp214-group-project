import { useNavigate } from "react-router"

import JobForm from "@/components/JobForm"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import type { Job } from "@/types"

export default function JobsNew() {
  const navigate = useNavigate()
  const auth = useAuth()
  const toast = useToast()

  const template: Job = {
    job_id: "",
    job_title: "",
    job_description: "",
    min_salary: null,
    max_salary: null,
  }

  async function onSubmit(job: Job) {
    const payload = { ...job, job_description: undefined }
    try {
      const { data } = await auth.api.post("/jobs", payload)
      toast.success("Successfully created job!")
      navigate(`/jobs/${data.job_id}`, { viewTransition: true })
    } catch (error) {
      toast.error(error)
    }
  }

  function onCancel() {
    navigate("/jobs", { viewTransition: true })
  }

  return (
    <JobForm
      selected={template}
      mode="new"
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  )
}
