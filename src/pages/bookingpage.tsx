import React, { useEffect } from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CalendarPicker, LocalizationProvider } from "@mui/lab";

import SocialIcons from "../socialicons";

import DatePicker from "react-datepicker";

import "../css/datepicker.css";
import { Box, Button, CircularProgress, MenuItem } from "@mui/material";
import { useSyncState } from "../syncstate";
import backend from "../backend/backend";
import { BlackOutDate, BookingAppointment } from "../backend/backendinterface";
import ValidatedTextField from "./validatedtextfield";
import SnackActions from "../alert/alert";

export default function BookingPage() {
  // Form Fields
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [type, setType] = React.useState("");

  // Date Picker
  const [value, setValue] = React.useState(new Date());
  const tmpDates: BlackOutDate[] = [];
  const [outDatesLoaded, setLoaded] = React.useState(false);
  const [outDates, setOutDates] = React.useState(tmpDates);
  const [outTimes, setOutTimes] = React.useState(tmpDates);
  const [reload, setReload] = React.useState(1);

  // Booking submitted
  const [submitted, setSubmitted] = React.useState(false);

  const today = new Date();
  today.setHours(today.getHours() + 3);

  const [submitEnabled, setSubmitEnabled] = useSyncState(false);

  const filterTimes = (time: number) => {
    const currentDate = new Date();
    const selectedDate = new Date(value);
    selectedDate.setTime(time);

    const passed = currentDate.getTime() <= selectedDate.getTime();

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
    return blackout;
  };

  const makeBooking = (event: any) => {
    event.currentTarget.form.reportValidity();
    console.log(value, firstName, lastName, email);
    console.log("making booking...");

    const end = new Date(value.getTime() + 30 * 60000);

    let appt: BookingAppointment = {
      start: { dateTime: value.toISOString() },
      end: { dateTime: end.toISOString() },
      status: "tentative",
      summary: "30-minute",
      attendees: [
        {
          email: "jemccarthy13@gmail.com", //TODO -- change to clairemariefotografie@yahoo.de
        },
        { email: email, displayName: firstName + " " + lastName },
      ],
    };

    const result: any = backend.submitBookingAppt(appt);

    console.log(result);

    if (result) {
      setSubmitted(true);
    } else {
      SnackActions.error("Submission failed. Please try again later.");
    }
  };

  useEffect(() => {
    setLoaded(false);
    async function myFun() {
      const blackout = await backend.getBlackOutDates();
      setOutDates(blackout.dates);
      setOutTimes(blackout.times);
    }
    myFun();
    setLoaded(true);
  }, [reload]);

  useEffect(() => {
    const queryString = window.location.hash;
    console.log(queryString.replace("#/booking", ""));
    const urlParams = new URLSearchParams(queryString.replace("#/booking", ""));
    console.log(urlParams);
    const t = urlParams.get("type");
    console.log(t);
    setType(t === null ? "30-minute" : t);
  }, []);

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
            loading={!outDatesLoaded}
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
              minTime={new Date(value).setHours(5)}
              maxTime={new Date(value).setHours(21)}
              timeIntervals={30}
              dateFormat="h:mm aa"
              inline
              filterTime={filterTimes}
            />
          </div>
        </LocalizationProvider>
      </div>
      <div>
        <Box
          component="form"
          style={{
            paddingTop: "25px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <div style={{ display: "inline-flex", width: "100%" }}>
            <ValidatedTextField
              id="firstname"
              label="First Name"
              postValidate={setFirstName}
              size="small"
              fullWidth
            />
            <ValidatedTextField
              id="lastname"
              label="Last Name"
              postValidate={setLastName}
              size="small"
              fullWidth
            />
          </div>
          <div style={{ display: "inline-flex", width: "100%" }}>
            <ValidatedTextField
              id="email"
              label="Email Address"
              postValidate={setEmail}
              size="small"
              fullWidth
            />
            <ValidatedTextField
              id="shoot_type"
              label="Session"
              size="small"
              postValidate={setType}
              select
              fullWidth
              value={type}
            >
              <MenuItem value={"30-minute"}>30-minute</MenuItem>
              <MenuItem value={"45-minute"}>45-minute</MenuItem>
            </ValidatedTextField>
          </div>
          <Button disabled={!submitEnabled()} onClick={makeBooking}>
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
}
