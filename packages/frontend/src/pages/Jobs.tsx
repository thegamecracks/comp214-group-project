import { PlusIcon } from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router"

import Banner from "@/components/Banner"
import LoadingPage from "@/components/LoadingPage"
import Table from "@/components/Table"
import { useJobs } from "@/lib/state"
import type { Job } from "@/types"

export default function Jobs() {
  const navigate = useNavigate()
  const [jobs] = useJobs()

  if (!jobs) return <LoadingPage />

  function showJob(job: Job) {
    navigate(`/jobs/${job.job_id}`, { viewTransition: true })
  }

  return (
    <div className="mx-8 my-4 h-[90svh] flex flex-col">
      <Banner>
        <h1 className="text-xl font-bold">Jobs</h1>
          <div className="flex-1" />
          <Link to="/jobs/new" className="btn" viewTransition><PlusIcon className="size-6" />New</Link>
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
          <th>Description</th>
          <th>Minimum Salary ($)</th>
          <th>Maximum Salary ($)</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map(job => (
          <tr key={job.job_id} onClick={() => onSelect(job)} className="hover:bg-base-300 transition-colors">
            <th>{job.job_id}</th>
            <td>{job.job_title}</td>
            <td>{job.job_description}</td>
            <td>{job.min_salary}</td>
            <td>{job.max_salary}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
