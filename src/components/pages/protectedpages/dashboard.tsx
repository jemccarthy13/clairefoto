import { Grid } from "@mui/material";
import DashboardCard from "./dashboardcard";

export default function Dashboard() {
  return (
    <div className="page-content">
      <div className="page-header">Dashboard</div>
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
      </Grid>
    </div>
  );
}
