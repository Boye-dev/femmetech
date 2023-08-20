import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";

function PatientRouter() {
  return (
    <Routes>
      <Route exact path="/feeds" element={<Feed />} />
    </Routes>
  );
}

export default PatientRouter;
