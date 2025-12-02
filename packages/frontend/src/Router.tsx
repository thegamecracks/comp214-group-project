import { createBrowserRouter } from "react-router"

import Frame from "./components/Frame"
import Departments from "./pages/Departments"
import EditEmployee from "./pages/EditEmployee"
import Employees from "./pages/Employees"
import Jobs from "./pages/Jobs"
import Login from "./pages/Login"
import Protected from "./components/Protected"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Frame,
    children: [
      {
        path: "/",
        Component: Protected,
        children: [
          { index: true, Component: Employees },
          { path: "/departments", Component: Departments },
          { path: "/employees/:id", Component: EditEmployee },
          { path: "/jobs", Component: Jobs },
        ],
      },
      {
        path: "login",
        Component: Login,
      }
    ],
  },
])
export default router
