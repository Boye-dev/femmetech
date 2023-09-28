import {
  AuthPaths,
  ConsultantPaths,
  DoctorPaths,
  PatientPaths,
} from "../routes/paths";
import { logOut } from "../utils/auth";
import { Roles } from "./roles";
import CampaignIcon from "@mui/icons-material/Campaign";
import {
  CalendarMonth,
  Campaign,
  Dashboard,
  Group,
  History,
  Message,
  Note,
  NoteAdd,
  Notifications,
  Speaker,
  Subject,
} from "@mui/icons-material";

export const PATIENT_NAV_ITEMS = [
  {
    name: "Feeds",
    url: PatientPaths.PATIENT_FEED,
    icon: <Campaign />,
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
    name: "Groups",
    url: PatientPaths.PATIENT_GROUPS,
    icon: <Group />,
    role: Roles.PATIENT,
    bottom: false,
  },
  {
    name: "Messages",
    url: PatientPaths.PATIENT_MESSAGES,
    icon: <Message />,
    role: Roles.PATIENT,
    bottom: false,
  },
  {
    name: "My Journal",
    url: PatientPaths.PATIENT_JOURNAL,
    icon: <NoteAdd />,
    role: Roles.PATIENT,
    bottom: false,
  },
];

export const CONSULTANT_NAV_ITEMS = [
  {
    name: "Feeds",
    url: ConsultantPaths.CONSULTANT_FEED,
    icon: <Campaign />,
    role: Roles.CONSULTANT,
    bottom: false,
  },
  {
    name: "Appointments",
    url: ConsultantPaths.CONSULTANT_APPOINTMENT,
    icon: <CalendarMonth />,
    role: Roles.CONSULTANT,
    bottom: false,
  },
  {
    name: "Groups",
    url: ConsultantPaths.CONSULTANT_GROUPS,
    icon: <Group />,
    role: Roles.CONSULTANT,
    bottom: false,
  },
  {
    name: "Messages",
    url: ConsultantPaths.CONSULTANT_MESSAGES,
    icon: <Message />,
    role: Roles.CONSULTANT,
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
