import React from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CalendarPicker, LocalizationProvider } from "@mui/lab";

import SocialIcons from "../socialicons";

import DatePicker from "react-datepicker";

import "../css/datepicker.css";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useSyncState } from "../syncstate";

/**
 * TODO -- This needs some styling adjustments
 */

export default function BookingPage(props: Record<string, unknown>) {
  const [value, setValue] = React.useState(new Date());
  const [fetched, _setFetched] = React.useState(true);

  const today = new Date();
  today.setHours(today.getHours() + 3);

  const firstNameRef = React.createRef<HTMLInputElement>();
  const lastNameRef = React.createRef<HTMLInputElement>();
  const emailRef = React.createRef<HTMLInputElement>();

  const required = "Required";

  const [emailErrorTxt, setEmailErrorTxt] = useSyncState("");
  const [fNameErrorTxt, setFNameErrorTxt] = useSyncState("");
  const [lNameErrorTxt, setLNameErrorTxt] = useSyncState("");
  const [submitEnabled, setSubmitEnabled] = useSyncState(false);

  const emailValidate = (event: any) => {
    _emailCheck(event.target.value);
  };

  const _emailCheck = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) {
      setEmailErrorTxt("Invalid email");
    } else {
      setEmailErrorTxt("");
    }
  };

  const firstNameValidate = (event: any) => {
    _fNameCheck(event.target.value);
  };

  const _fNameCheck = (val: string) => {
    if (val.length < 1) {
      setFNameErrorTxt(required);
    } else {
      setFNameErrorTxt("");
    }
  };

  const lastNameValidate = (event: any) => {
    _lNameCheck(event.target.value);
  };

  const _lNameCheck = (val: string) => {
    if (val.length < 1) {
      setLNameErrorTxt(required);
    } else {
      setLNameErrorTxt("");
    }
  };

  const filterPassedTime = (time: number) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const checkDate = (date: Date) => {
    // TODO -- implement blackout dates
    return false;
  };

  const makeBooking = () => {
    console.log(value);
  };

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
              if (date !== null) setValue(date);
            }}
            shouldDisableDate={checkDate}
            loading={!fetched}
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
              filterTime={filterPassedTime}
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
          <div style={{ display: "inline-flex" }}>
            <TextField
              inputRef={firstNameRef}
              error={fNameErrorTxt() !== ""}
              helperText={fNameErrorTxt()}
              required
              size="small"
              id="firstname"
              label="First Name"
              onChange={firstNameValidate}
              onBlur={firstNameValidate}
            />
            <TextField
              inputRef={lastNameRef}
              error={lNameErrorTxt() !== ""}
              helperText={lNameErrorTxt()}
              required
              size="small"
              id="lastname"
              label="Last Name"
              onChange={lastNameValidate}
              onBlur={lastNameValidate}
            />
          </div>
          <div>
            <TextField
              inputRef={emailRef}
              error={emailErrorTxt() !== ""}
              helperText={emailErrorTxt()}
              fullWidth
              required
              size="small"
              id="email"
              label="Email Address"
              onBlur={emailValidate}
            />
          </div>
          <Button disabled={!submitEnabled()} onClick={makeBooking}>
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
}
