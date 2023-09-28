import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AuthHelper from "./components.js/AuthHelper";
import VerifyPage from "./pages/VerifyPage";
import VerifyUser from "./pages/VerifyUser";

function Auth() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="signin" replace />} />
      <Route element={<AuthHelper />}>
        <Route exact path="/signin" element={<Signin />} />
      </Route>
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/verify" element={<VerifyPage />} />
      <Route exact path="/verify-user/:token" element={<VerifyUser />} />
    </Routes>
  );
}

export default Auth;
