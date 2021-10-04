import React, { useEffect } from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CalendarPicker, LocalizationProvider } from "@mui/lab";

import SocialIcons from "../socialicons";

import DatePicker from "react-datepicker";

import "../css/datepicker.css";
import { Box, Button, CircularProgress } from "@mui/material";
import { useSyncState } from "../syncstate";
import backend from "../backend/backend";
import { BlackOutDate } from "../backend/backendinterface";
import ValidatedTextField from "./validatedtextfield";
import { ValidateContext } from "./contactform";

export default function BookingPage(props: Record<string, unknown>) {
  // Form Fields
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  // Date Picker
  const [value, setValue] = React.useState(new Date());
  const tmpDates: BlackOutDate[] = [];
  const [outDates, setOutDates] = React.useState(tmpDates);
  const [outTimes, setOutTimes] = React.useState(tmpDates);
  const [reload, setReload] = React.useState(1);

  const [validateFlag, setValidateFlag] = React.useState(false);

  const today = new Date();
  today.setHours(today.getHours() + 3);

  const [submitEnabled, setSubmitEnabled] = useSyncState(false);

  const filterTimes = (time: number) => {
    const currentDate = new Date();
    const selectedDate = new Date(value);
    selectedDate.setTime(time);

    const passed = currentDate.getTime() < selectedDate.getTime();

    let unavail = false;
    outTimes.forEach((t) => {
      if (selectedDate >= t.start && selectedDate <= t.end) {
        unavail = true;
      }
    });
    return passed && !unavail;
  };

  const checkDate = (date: Date) => {
    let blackout = false;
    outDates.forEach((d) => {
      date.setHours(12);
      if (date > d.start && date < d.end) {
        blackout = true;
      }
    });

    // TODO -- implement blackout dates
    return blackout;
  };

  const makeBooking = () => {
    console.log(value, firstName, lastName, email);
    console.log("making booking...");
    setValidateFlag(!validateFlag);
  };

  useEffect(() => {
    async function myFun() {
      const blackout = await backend.getBlackOutDates();
      setOutDates(blackout.dates);
      setOutTimes(blackout.times);
    }
    myFun();
  }, [reload]);

  return (
    <div className="page-content" style={{ textAlign: "center" }}>
      <div className="page-header">Booking</div>
      <SocialIcons />

      <div
        style={{
          display: "inline-flex",
          width: "90%",
          margin: "auto",
          paddingTop: "20px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            className={"datepicker"}
            date={value}
            minDate={today}
            onChange={(date: Date | null) => {
              if (date !== null) {
                setValue(date);
                setReload(reload + 1);
              }
            }}
            shouldDisableDate={checkDate}
            loading={outDates.length === 0}
            renderLoading={() => {
              return <CircularProgress />;
            }}
          />
          <div style={{ margin: "auto", marginLeft: "unset" }}>
            <DatePicker
              selected={value}
              onChange={(date: Date | null) => {
                if (date !== null) setValue(date);
                setSubmitEnabled(true);
              }}
              showTimeSelect
              showTimeSelectOnly
              minDate={today}
              minTime={new Date(value).setHours(6)}
              maxTime={new Date(value).setHours(20)}
              timeIntervals={30}
              dateFormat="h:mm aa"
              inline
              filterTime={filterTimes}
            />
          </div>
        </LocalizationProvider>
      </div>
      <div>
        <ValidateContext.Provider value={validateFlag}>
          <Box
            component="form"
            style={{
              paddingTop: "25px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <div style={{ display: "inline-flex" }}>
              <ValidatedTextField
                id="firstname"
                label="First Name"
                postValidate={setFirstName}
                size="small"
              />
              <ValidatedTextField
                id="lastname"
                label="Last Name"
                postValidate={setLastName}
                size="small"
              />
            </div>
            <div>
              <ValidatedTextField
                id="email"
                label="Email Address"
                postValidate={setEmail}
                size="small"
                fullWidth
              />
            </div>
            <Button disabled={!submitEnabled()} onClick={makeBooking}>
              Submit
            </Button>
          </Box>
        </ValidateContext.Provider>
      </div>
    </div>
  );
}
