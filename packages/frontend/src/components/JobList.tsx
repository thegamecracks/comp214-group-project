import type { Job } from "@/types"

export function JobList({
  jobs,
  onSelect,
}: {
  jobs: Job[];
  onSelect: (emp: Job) => void;
}) {
  return (
    <div className="overflow-auto">
      <table className="table table-sm table-zebra">
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
      </table>
    </div>
  )
}

export default JobList
