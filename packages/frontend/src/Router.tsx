import { createBrowserRouter } from "react-router"

import Frame from "./components/Frame"
import Departments from "./pages/Departments"
import EmployeesEdit from "./pages/EmployeesEdit"
import Employees from "./pages/Employees"
import EmployeesHire from "./pages/EmployeesHire"
import Home from "./pages/Home"
import Jobs from "./pages/Jobs"
import JobsEdit from "./pages/JobsEdit"
import Login from "./pages/Login"
import Protected from "./components/Protected"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Frame,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      {
        path: "/",
        Component: Protected,
        children: [
          { path: "/employees", Component: Employees },
          { path: "/departments", Component: Departments },
          { path: "/employees/:id", Component: EmployeesEdit },
          { path: "/employees/hire", Component: EmployeesHire },
          { path: "/jobs", Component: Jobs },
          { path: "/jobs/:id", Component: JobsEdit },
        ],
      },
    ],
  },
])
export default router
