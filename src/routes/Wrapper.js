import { Routes, Route } from "react-router-dom";
import Auth from "../modules/Auth/AuthRouter";
import PatientRouter from "../modules/Patient/PatientRouter";
import MainLayout from "../shared/layouts/Main";
import AuthGuard from "../shared/components/AuthGuard";
import PatientGuard from "../shared/components/PatientGuard";
import DoctorRouter from "../modules/Doctor/DoctorRouter";
import DoctorGuard from "../shared/components/DoctorGuard";
import VerifyPatientSuccess from "../modules/Auth/pages/VerifyPatientSuccess";
import VerifyDoctorSuccess from "../modules/Auth/pages/VerifyDoctorSuccess";

export const RoutesWrapper = () => {
  return (
    <Routes>
      <Route exact path="/*" element={<Auth />} />
      
      <Route path="/patient/verify-account/:patientId/:uniqueString" exact element={<VerifyPatientSuccess />} />
      <Route path="/doctor/verify-account/:doctorId/:uniqueString" exact element={<VerifyDoctorSuccess />} />
      <Route element={<PatientGuard />}>
        <Route element={<MainLayout />}>
          <Route exact path="/patient/*" element={<PatientRouter />} />
        </Route>
      </Route>
      <Route element={<DoctorGuard />}>
        <Route element={<MainLayout />}>
          <Route exact path="/doctor/*" element={<DoctorRouter />} />
        </Route>
      </Route>
    </Routes>
  );
};
