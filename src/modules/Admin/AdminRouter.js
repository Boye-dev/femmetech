import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const paths = [
  {
    path: "admindashboard",
    element: lazy(() => import("./pages/Dashboard/pages/AdminDashboard")),
  },

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

function AdminRouter() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="admindashboard" replace />} />
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

export default AdminRouter;
