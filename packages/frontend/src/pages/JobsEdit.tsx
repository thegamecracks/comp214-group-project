import { useNavigate, useParams } from "react-router"

import JobForm from "@/components/JobForm"
import LoadingPage from "@/components/LoadingPage"
import { useAuth } from "@/lib/auth"
import { useJob } from "@/lib/state"
import { useToast } from "@/lib/toast"
import type { Job } from "@/types"

export default function EmployeesEdit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const auth = useAuth()
  const toast = useToast()
  const { job } = useJob(id!)

  if (!job) return <LoadingPage />

  async function onSubmit(job: Job) {
    const payload = { ...job, job_id: undefined }
    try {
      const { data } = await auth.api.patch(`/jobs/${job.job_id}`, payload)
      toast.success("Successfully updated job!")
    } catch (error) {
      toast.error(error)
    }
  }

  function onCancel() {
    navigate("/jobs", { viewTransition: true })
  }

  return (
    <JobForm
      selected={job}
      mode="edit"
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  )
}
