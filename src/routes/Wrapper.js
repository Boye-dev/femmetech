import AuthGuard from "../shared/components/AuthGuard";
import { Suspense, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../shared/components/Loader";
import BaseRoutes from "./base";

const renderRoute = ({ component: Component, ...route }) => {
  const { Layout, useAuth } = route;

  return (
    <Route
      key={route.path}
      path={route.path}
      element={
        <>
          {Layout ? (
            <Layout>
              <Suspense fallback={<Loader />}>
                {useAuth ? (
                  <AuthGuard>
                    <Component />
                  </AuthGuard>
                ) : (
                  <Component />
                )}
              </Suspense>
            </Layout>
          ) : (
            <Fragment>
              <Suspense fallback={<Loader />}>
                {useAuth ? (
                  <AuthGuard>
                    <Component />
                  </AuthGuard>
                ) : (
                  <Component />
                )}
              </Suspense>
            </Fragment>
          )}
        </>
      }
    />
  );
};

export const RoutesWrapper = () => {
  return <Routes>{BaseRoutes.map((route) => renderRoute(route))}</Routes>;
};
