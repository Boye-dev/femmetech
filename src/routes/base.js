import {
  PATIENT_NAV_ITEMS,
  SUPER_PATIENT_NAV_ITEMS,
} from "../constants/sidebarItems";
import { lazy } from "react";
import MainLayout from "../shared/layouts/Main";
import { BasePaths } from "./paths";

const BaseRoutes = [
  {
    path: "/*",
    exact: true,
    component: lazy(() => import("../modules/Auth/AuthRouter")),
    Layout: null,
    useAuth: false,
  },
  {
    path: `${BasePaths.PATIENT}/*`,
    exact: true,
    component: lazy(() => import("../modules/Patient/PatientRouter")),
    Layout: MainLayout,
    useAuth: true,
    // sidenavItems: PATIENT_NAV_ITEMS,
  },

  {
    path: "*",
    exact: false,
    component: lazy(() => import("../shared/components/NotFound")),
    Layout: null,
    useAuth: false,
  },
];

export default BaseRoutes;
