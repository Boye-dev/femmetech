import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "../SharedPages/Feed";
import Appointments from "../SharedPages/Appointments";
import Messages from "../SharedPages/Messages";
import AuthHelper from "./components/AuthHelper";
import { FemmetechContextProvider } from "../../context/FemmetechContext";
import Groups from "../Patient/pages/Groups";
import Profile from "../SharedPages/Profile";

function ConsultantRouter() {
  return (
    <FemmetechContextProvider>
      <Routes>
        <Route element={<AuthHelper />}>
          <Route path="/" element={<Navigate to="/consultant/feeds" />} />

          <Route exact path="/feeds" element={<Feed />} />
          <Route exact path="/appointments" element={<Appointments />} />
          <Route exact path="/groups" element={<Groups />} />
          <Route exact path="/profile" element={<Profile />} />

          <Route exact path="/messages" element={<Messages />} />
        </Route>
      </Routes>
    </FemmetechContextProvider>
  );
}

export default ConsultantRouter;
