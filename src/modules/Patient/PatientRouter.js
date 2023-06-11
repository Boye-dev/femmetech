import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const paths = [
  {
    path: "dashboard",
    element: lazy(() => import("./pages/Dashboard/pages/Dashboard")),
  },
  {
    path: "appointments",
    element: lazy(() => import("./pages/Appointments")),
  },
  // {
  //   path: "dashboard",
  //   element: lazy(() => import("./pages/Dashboard/pages/PatientDashboard")),
  // },
  //For sub paths
  // {
  //   path: "files/*",
  //   element: lazy(() => import("./pages/Files/Files")),
  //   children: [
  //     {
  //       path: "all",
  //       element: lazy(() => import("./pages/Files/AllFiles")),
  //     },
  //     {
  //       path: ":id",
  //       element: lazy(() => import("./pages/Files/FolderDetails")),
  //     },
  //     {
  //       path: "shared",
  //       element: lazy(() => import("./pages/Files/SharedFiles")),
  //     },
  //     {
  //       path: "*",
  //       element: lazy(() => import("shared/components/NotFound")),
  //     },
  //   ],
  // },

  {
    path: "*",
    element: lazy(() => import("../../shared/components/NotFound")),
  },
];

function PatientRouter() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="dashboard" replace />} />
      {paths.map(({ path, element: Element, children }) =>
        children ? (
          <Route key={path} path={path} element={<Element />}>
            {children.map(({ path, element: Element }, idx) => {
              return <Route key={path} path={path} element={<Element />} />;
            })}
          </Route>
        ) : (
          <Route key={path} path={path} element={<Element />} />
        )
      )}
    </Routes>
  );
}

export default PatientRouter;
