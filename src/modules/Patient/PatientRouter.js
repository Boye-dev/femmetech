import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "../SharedPages/Feed";
import Appointments from "../SharedPages/Appointments";
import Groups from "./pages/Groups";
import Messages from "../SharedPages/Messages";
import Journal from "./pages/Journal";
import Note from "./components/Note";

function PatientRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/patient/feeds" />} />

      <Route exact path="/feeds" element={<Feed />} />
      <Route exact path="/appointments" element={<Appointments />} />
      <Route exact path="/groups" element={<Groups />} />
      <Route exact path="/messages" element={<Messages />} />
      <Route exact path="/my-journal" element={<Journal />} />
      <Route exact path="/my-journal/:id" element={<Note />} />
      <Route exact path="/my-journal/new" element={<Note />} />
    </Routes>
  );
}

export default PatientRouter;
