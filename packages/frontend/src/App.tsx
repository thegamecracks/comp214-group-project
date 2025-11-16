import { useState } from "react";

import { Auth, AuthContext } from "./auth";
import Router from "./Router";
import "./index.css";

export function App() {
  const [token, setToken] = useState("")

  return (
    <AuthContext value={new Auth(token, setToken)}>
      <Router />
    </AuthContext>
  );
}

export default App;
