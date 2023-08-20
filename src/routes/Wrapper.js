import { Routes, Route } from "react-router-dom";
import Auth from "../modules/Auth/AuthRouter";

import MainLayout from "../shared/layouts/Main";
import PatientRouter from "../modules/Patient/PatientRouter";

export const RoutesWrapper = () => {
  return (
    <Routes>
      <Route exact path="/*" element={<Auth />} />

      <Route element={<MainLayout />}>
        {/* <Route element={<PatientGuard />}> */}
        <Route path="/patient/*" element={<PatientRouter />} />
        {/* </Route> */}
      </Route>
    </Routes>
  );
};
