import { useReducer, useState } from "react"

import type { Job } from "@/types"

export default function JobForm({
  selected,
  mode,
  onSubmit = async () => { },
  onCancel = () => { },
}: {
  selected: Job;
  mode: "new" | "edit";
  onSubmit: (job: Job) => Promise<any>;
  onCancel: () => void;
}) {
  const [pending, setPending] = useState(false)
  const [state, dispatch] = useJobReducer(selected)
  const changed = JSON.stringify(state) !== JSON.stringify(selected)

  function handleUndo() {
    dispatch(["", selected])
  }

  function handleSubmit() {
    setPending(true)
    onSubmit(state).finally(() => setPending(false))
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="h-[90svh] mx-8 my-4 flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold">{state.job_title}</h1>
        <p className="text-lg">{state.job_description}</p>
      </div>
      <fieldset className="grid grid-cols-3 gap-4 justify-items-stretch">
        {mode === "edit" && (
          <label className="input input-lg validator w-full">
            <span className="label">Job ID</span>
            <input type="number" value={state.job_id} onChange={e => dispatch(["job_id", e.target.value])}
              disabled
            />
          </label>
        )}
        <label className="input input-lg validator w-full">
          <span className="label">Title</span>
          <input type="text" value={state.job_title || ""} onChange={e => dispatch(["job_title", e.target.value])} />
        </label>
        <label className="input input-lg validator w-full">
          <span className="label">Description</span>
          <input type="text" value={state.job_description || ""} onChange={e => dispatch(["job_description", e.target.value])} />
        </label>
        <label className="input input-lg validator w-full">
          <span className="label">Min Salary ($)</span>
          <input type="number" value={state.min_salary || ""} onChange={e => dispatch(["min_salary", e.target.value])} />
        </label>
        <label className="input input-lg validator w-full">
          <span className="label">Max Salary ($)</span>
          <input type="number" value={state.max_salary || ""} onChange={e => dispatch(["max_salary", e.target.value])} />
        </label>
      </fieldset>
      <div className="flex-1" />
      <div className="flex flex-wrap justify-end gap-4">
        <button onClick={onCancel} className="btn" disabled={pending}>Cancel</button>
        {mode === "edit" && <button onClick={handleUndo} className="btn" disabled={pending || !changed}>Undo</button>}
        <button onClick={handleSubmit} type="submit" className="btn btn-wide" disabled={pending || !changed}>
          {mode === "new" ? "New" : "Apply"}
        </button>
      </div>
    </form>
  )
}

function useJobReducer(selected: Job) {
  function reducer(state: Job, [key, value]: [keyof Job, Job[keyof Job]] | ["", Job]) {
    if (key === "") return { ...value }
    const nullable: (keyof Job)[] = ["min_salary", "max_salary"]
    const numeric: (keyof Job)[] = ["min_salary", "max_salary"]
    if (nullable.includes(key) && !value) value = null
    if (numeric.includes(key) && value !== "") value = Number(value)
    return { ...state, [key]: value }
  }

  return useReducer(reducer, selected)
}
