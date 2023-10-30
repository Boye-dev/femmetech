import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "../SharedPages/Feed";
import Appointments from "../SharedPages/Appointments";
import Groups from "./pages/Groups";
import Messages from "../SharedPages/Messages";
import Journal from "./pages/Journal";
import Note from "./components/Note";
import AuthHelper from "./components/AuthHelper";
import { FemmetechContextProvider } from "../../context/FemmetechContext";
import CreateAppointment from "../SharedPages/CreateAppointment";
import Profile from "../SharedPages/Profile";

function PatientRouter() {
  return (
    <FemmetechContextProvider>
      <Routes>
        <Route element={<AuthHelper />}>
          <Route path="/" element={<Navigate to="/patient/feeds" />} />

          <Route exact path="/feeds" element={<Feed />} />
          <Route exact path="/appointments" element={<Appointments />} />
          <Route
            exact
            path="/appointments/create-appointment"
            element={<CreateAppointment />}
          />
          <Route
            exact
            path="/appointments/update-appointment/:id"
            element={<CreateAppointment />}
          />
          <Route exact path="/groups" element={<Groups />} />
          <Route exact path="/messages" element={<Messages />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/my-journal" element={<Journal />} />
          <Route exact path="/my-journal/:id" element={<Note />} />
          <Route exact path="/my-journal/new" element={<Note />} />
        </Route>
      </Routes>
    </FemmetechContextProvider>
  );
}

export default PatientRouter;
