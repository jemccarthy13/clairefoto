import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="page-content">
      <div className="page-header">Dashboard</div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to="/pricingedit">
              <CardMedia
                component="img"
                height="140"
                image="/images/pricing.jpg"
                alt="pricing"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Pricing Editor
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add, remove and update pricing options and photoshoot
                  packages.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to="/bookingedit">
              <CardMedia
                component="img"
                height="140"
                image="/images/emails/calendar-transparent.png"
                alt="calendar"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Booking / Appointments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Blackout dates for booking, review pending bookings, interact
                  with customers.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
