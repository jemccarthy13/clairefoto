import React from "react";

// External Utilities
import { Cookies } from "react-cookie-consent";
import { RouteComponentProps, withRouter } from "react-router";

// Internal Utilities
import { AuthContext } from "../../authcontext";
import DashboardCard from "./dashboardcard";

// MUI library
import { Grid } from "@mui/material";

/**
 * A functional Component to render the Admin Dashboard.
 *
 * @param props RouteComponentProps from withRouter
 * @returns JSX.Element to render the Admin Dashboard
 */
function Dashboard(props: RouteComponentProps): JSX.Element {
  return (
    <div className="page-content">
      <div className="page-header">Dashboard</div>
      {/* Render all of the admin action cards */}
      <Grid container spacing={2}>
        <DashboardCard
          to="/pricingedit"
          imgSrc="/images/dashboard/pricing.jpg"
          imgAlt="pricing"
          cardTitle="Pricing Editor"
          cardDescription="Add, remove and update pricing options and photoshoot packages."
        />
        <DashboardCard
          to="/bookingedit"
          imgSrc="/images/dashboard/calendar-transparent.png"
          imgAlt="calendar"
          cardTitle="Booking / Appointments"
          cardDescription="Blackout dates for booking and review pending bookings."
        />
        <DashboardCard
          to="/accountedit"
          className="media-card"
          imgSrc="/images/dashboard/account.png"
          imgAlt="account"
          cardTitle="Manage Account"
          cardDescription="Change password for this account"
        />
        <AuthContext.Consumer>
          {(value) => (
            <DashboardCard
              imgSrc="/images/dashboard/logout.png"
              className="media-card"
              imgAlt="account"
              cardTitle="Logout"
              cardDescription="Logout and view the public version of the site."
              onClick={() => {
                Cookies.remove("fotojwt");
                value.setAuth(false);
                props.history.replace("/");
              }}
            />
          )}
        </AuthContext.Consumer>
      </Grid>
    </div>
  );
}

export default React.memo(withRouter(Dashboard));
