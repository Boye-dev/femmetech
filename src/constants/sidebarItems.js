import { AuthPaths, SuperAdminPaths, AdminPaths } from "../routes/paths";
import { logOut } from "../utils/auth";
import { NavigateFunction } from "react-router-dom";
import { Roles } from "./roles";

export const ADMIN_NAV_ITEMS = [
  {
    name: "Dashboard",
    url: AdminPaths.ADMIN_DASHBOARD,
    // icon: (active: boolean) => < />,
    role: Roles.ADMIN,
    bottom: false,
  },
];

export const LOGOUT_NAV = {
  name: "Logout",
  url: "",
  // icon: (superAdmin) => (superAdmin ? <LogoutOff /> : <LogoutOn />),
  onClick: (navigate) =>
    logOut(() => navigate(AuthPaths.SIGNIN, { replace: true })),
};
