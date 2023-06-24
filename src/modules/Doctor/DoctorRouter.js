import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/pages/Dashboard";
import Appointments from "./pages/Appointments";
import Announcements from "./pages/Announcements";
import Messages from "./pages/Messages";

function DoctorRouter() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="dashboard" replace />} />
      <Route exact path="dashboard" element={<Dashboard />} />
      <Route exact path="appointments" element={<Appointments />} />
      <Route exact path="announcements" element={<Announcements />} />
      <Route exact path="messages" element={<Messages />} />
    </Routes>
  );
}

export default DoctorRouter;
