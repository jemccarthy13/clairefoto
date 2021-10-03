import React from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, StaticDatePicker } from "@mui/lab";

import SocialIcons from "../socialicons";
import { TextField } from "@mui/material";

/**
 * TODO -- This needs some styling adjustments
 */
export default function BookingPage(props: Record<string, unknown>) {
  const [value, setValue] = React.useState(new Date());

  return (
    <div className="page-content" style={{ textAlign: "center" }}>
      <div className="page-header">Booking</div>
      <SocialIcons />
      <div style={{ width: "90%", margin: "auto" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="year"
            value={value}
            onChange={(newValue: Date | null) => {
              if (newValue !== null) setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
