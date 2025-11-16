import { BrowserRouter, Route, Routes } from "react-router";

import Frame from "./Frame";
import Home from "./Home";

function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Frame />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}

export default Router
