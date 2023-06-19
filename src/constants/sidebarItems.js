import { AuthPaths, PatientPaths } from "../routes/paths";
import { logOut } from "../utils/auth";

import { Roles } from "./roles";
import CampaignIcon from '@mui/icons-material/Campaign';
import { CalendarMonth, Dashboard } from "@mui/icons-material";

export const PATIENT_NAV_ITEMS = [
  {
    name: "Dashboard",
    url: PatientPaths.PATIENT_DASHBOARD,
    icon: <Dashboard />,
    role: Roles.PATIENT,
    bottom: false,
  },
  {
    name: "Appointments",
    url: PatientPaths.PATIENT_APPOINTMENT,
    icon: <CalendarMonth />,
    role: Roles.PATIENT,
    bottom: false,
  },
  {
    name: "Announcements",
    url: PatientPaths.PATIENT_ANNOUNCEMENTS,
    icon: <CampaignIcon />,
    role: Roles.PATIENT,
    bottom: false,
  },
];

export const LOGOUT_NAV = {
  name: "Logout",
  url: "",
  // icon: (superPatient) => (superPatient ? <LogoutOff /> : <LogoutOn />),
  onClick: (navigate) =>
    logOut(() => navigate(AuthPaths.SIGNIN, { replace: true })),
};
