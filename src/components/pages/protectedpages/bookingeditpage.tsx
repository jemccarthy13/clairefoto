import { useEffect, useState } from "react";

// External Utilities
import { Link } from "react-router-dom";

// Internal Utilities
//import backend from "../../../backend/backend";

// Internal UI Components
import ConfirmDialog from "../../confirmdialog";

// MUI Library
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

/**
 * A Component that renders the UI for the Admin's Booking page,
 * where an admin can update, edit, remove, and manage bookings
 * and blackout dates for the public booking page.
 *
 * @returns JSX.Element to render
 */
export default function BookingEditor() {
  // Flag for the delete dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  // TODO -- update this, and use useConfirmDialog instead
  useEffect(() => {
    setDialogOpen(false);

    // try {
    //   backend.getPricing().then((data) => {
    //     data.forEach((d: any) => {
    //       d.options = JSON.parse(d.options);
    //       d.booking = d.booking === "1" ? true : false;
    //     });
    //     setPrices(data);
    //     setLoaded(true);
    //   });
    // } catch {
    //   setLoadError(true);
    //   SnackActions.error("Couldn't load data. Please refresh the page.");
    // }
  }, []);

  return (
    <div className="page-content">
      <div className="page-header">
        Booking Editor{" "}
        <IconButton
          style={{ verticalAlign: "baseline" }}
          component={Link}
          to="/booking"
        >
          <VisibilityIcon />
        </IconButton>
      </div>
      <div>Coming soon.</div>
      <div style={{ height: "400px" }}>
        <ConfirmDialog
          title={"Confirm delete?"}
          open={dialogOpen}
          callback={() => {}}
          description={
            "You are about to permanently delete this pricing option. Are you sure?"
          }
        />
      </div>
    </div>
  );
}
