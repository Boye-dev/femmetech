import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";

function Auth() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="signin" replace />} />
      <Route exact path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default Auth;
