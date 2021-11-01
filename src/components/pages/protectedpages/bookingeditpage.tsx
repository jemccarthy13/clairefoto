import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
//import backend from "../../../backend/backend";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../confirmdialog";

export default function BookingEditor() {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setDialogOpen(false); // TODO -- remove this

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
