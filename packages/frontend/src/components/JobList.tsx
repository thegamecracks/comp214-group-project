import Table from "./Table"
import type { Job } from "@/types"

export default function JobList({
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
