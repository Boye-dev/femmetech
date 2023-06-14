import { Routes, Route } from "react-router-dom";
import Auth from "../modules/Auth/AuthRouter";
import PatientRouter from "../modules/Patient/PatientRouter";
import MainLayout from "../shared/layouts/Main";

export const RoutesWrapper = () => {
  return (
    <Routes>
      <Route exact path="/*" element={<Auth />} />

      <Route element={<MainLayout />}>
        <Route exact path="/patient/*" element={<PatientRouter />} />
      </Route>
    </Routes>
  );
};
