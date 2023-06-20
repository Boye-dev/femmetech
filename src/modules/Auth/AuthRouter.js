import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { SignupContextProvider } from "../../context/SignupContext";
import AuthHelper from "./components.js/AuthHelper";

function Auth() {
  return (
    <SignupContextProvider>
      <Routes>
        <Route path="" element={<Navigate to="home" replace />} />
        <Route path="/home" exact element={<Home />} />
        <Route element={<AuthHelper />}>
          <Route path="/signin" exact element={<Signin />} />
        </Route>
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </SignupContextProvider>
  );
}

export default Auth;
