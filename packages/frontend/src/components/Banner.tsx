import type { ReactNode } from "react"

export default function Banner({ children }: { children: ReactNode }) {
  return (
    <div className="sticky top-0 z-10 min-h-12 flex bg-base-200 items-center px-4 py-2 shadow">
      {children}
    </div>
  )
}
