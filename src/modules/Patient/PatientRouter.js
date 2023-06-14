import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/pages/Dashboard";
import Appointments from "./pages/Appointments";

function PatientRouter() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="dashboard" replace />} />
      <Route exact path="dashboard" element={<Dashboard />} />
      <Route exact path="appointments" element={<Appointments />} />
    </Routes>
  );
}

export default PatientRouter;
