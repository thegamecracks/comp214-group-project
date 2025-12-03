import type { ReactNode } from "react"

export default function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-auto">
      <table className="table table-zebra table-xs xl:table-md">
        {children}
      </table>
    </div>
  )
}
