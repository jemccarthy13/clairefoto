import React, { Suspense } from "react";
import { CircularProgress } from "@mui/material";

// Internal Utilities
import { AuthContext } from "../authcontext";
const Dashboard = React.lazy(() => import("./protectedpages/dashboard"));
const PublicHomePage = React.lazy(() => import("./publicpages/publichomepage"));

/**
 * The main entry point of the home page.
 *
 * Lazy loads public/private pages for display, with a loading
 * fallback of a circular spinner.
 *
 * If authenticated, this renders the Dashboard.
 * If not authenticated, this renders the public home page.
 *
 * @returns JSX.Element Dashboard|public page
 */
export default function HomePage(): JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="page-content" style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      }
    >
      <AuthContext.Consumer>
        {(context) => (
          <div>
            {context.auth && <Dashboard />}
            {!context.auth && <PublicHomePage />}
          </div>
        )}
      </AuthContext.Consumer>
    </Suspense>
  );
}
