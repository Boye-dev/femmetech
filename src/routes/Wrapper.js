// import AuthGuard from "../shared/components/AuthGuard";
// import { Suspense, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
// import Loader from "../shared/components/Loader";
// import BaseRoutes from "./base";

// import { ErrorBoundary } from "react-error-boundary";
import Auth from "../modules/Auth/AuthRouter";
// const renderRoute = ({ component: Component, ...route }) => {
//   const { Layout, useAuth } = route;
//   const logError = (error, info) => {
//     console.log(error, info);
//     // Do something with the error, e.g. log to an external API
//   };

//   return (
//     <Route
//       key={route.path}
//       path={route.path}
//       element={
//         <>
//           {Layout ? (
//             <Layout>
//               <ErrorBoundary
//                 fallback={<div>Something went wrong</div>}
//                 onError={logError}
//               >
//                 <Suspense fallback={<Loader />}>
//                   {useAuth ? (
//                     <AuthGuard>
//                       <Component />
//                     </AuthGuard>
//                   ) : (
//                     <Component />
//                   )}
//                 </Suspense>
//               </ErrorBoundary>
//             </Layout>
//           ) : (
//             <Fragment>
//               <ErrorBoundary
//                 fallback={<div>Something went wrong</div>}
//                 onError={logError}
//               >
//                 <Suspense fallback={<Loader />}>
//                   {useAuth ? (
//                     <AuthGuard>
//                       <Component />
//                     </AuthGuard>
//                   ) : (
//                     <Component />
//                   )}
//                 </Suspense>
//               </ErrorBoundary>
//             </Fragment>
//           )}
//         </>
//       }
//     />
//   );
// };

export const RoutesWrapper = () => {
  return (
    <Routes>
      <Route exact path="/*" element={<Auth />} />
    </Routes>
  );
};
