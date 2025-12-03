import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { Link, useNavigate } from "react-router"

import Banner from "@/components/Banner"
import LoadingPage from "@/components/LoadingPage"
import Table from "@/components/Table"
import { useJobs } from "@/lib/state"
import type { Job } from "@/types"

export default function Jobs() {
  const navigate = useNavigate()
  const [jobs] = useJobs()
  const [search, setSearch] = useState("")

  if (!jobs) return <LoadingPage />

  function showJob(job: Job) {
    navigate(`/jobs/${job.job_id}`, { viewTransition: true })
  }

  const filteredJobs = jobs.filter(job => (
    job.job_id.toLowerCase().includes(search.toLowerCase())
    || job.job_title.toLowerCase().includes(search.toLowerCase())
    || job.job_description.toLowerCase().includes(search.toLowerCase())
    || String(job.min_salary).includes(search.toLowerCase())
    || String(job.max_salary).includes(search.toLowerCase())
  ))

  return (
    <div className="mx-8 my-4 h-[90svh] flex flex-col">
      <Banner>
        <h1 className="text-xl font-bold">Jobs</h1>
          <div className="flex-1" />
          <label className="input">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter" />
            <MagnifyingGlassIcon className="size-6" />
          </label>
          <Link to="/jobs/new" className="btn" viewTransition><PlusIcon className="size-6" />New</Link>
      </Banner>
      <JobList jobs={filteredJobs} onSelect={showJob} />
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
