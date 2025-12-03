import { useEffect, useState } from "react"

import Banner from "@/components/Banner"
import Table from "@/components/Table"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import type { Job } from "@/types"

export default function Jobs() {
  const auth = useAuth()
  const toast = useToast()
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    async function getJobs() {
      try {
        {
          const { data } = await auth.api.get("/jobs", { signal })
          setJobs(data)
        }
      } catch (error) {
        toast.error(error)
      }
    }

    const controller = new AbortController()
    const signal = controller.signal
    getJobs()

    return () => controller.abort()
  }, [])

  function showJob(job: Job) {
    // noop
  }

  return (
    <div className="mx-8 my-4 h-[90svh] flex flex-col">
      <Banner>
        <h1 className="text-xl font-bold">Jobs</h1>
      </Banner>
      <JobList jobs={jobs} onSelect={showJob} />
    </div>
  )
}

function JobList({
  jobs,
  onSelect,
}: {
  jobs: Job[];
  onSelect: (emp: Job) => void;
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
        {jobs.map(job => (
          <tr key={job.job_id} onClick={() => onSelect(job)} className="hover:bg-base-300 transition-colors">
            <th>{job.job_id}</th>
            <td>{job.job_title}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
