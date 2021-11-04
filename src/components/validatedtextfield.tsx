import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useSyncState } from "../syncstate";
import { StandardTextFieldProps } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";

interface ValidatedTFProps extends Partial<StandardTextFieldProps> {
  id: string;
  label: string;
  postValidate: (val: string) => void;
  email?: boolean;
}

export default function ValidatedTextField(props: ValidatedTFProps) {
  const inputRef = React.createRef<HTMLInputElement>();

  const [errorText, setErrorText] = useSyncState("");
  const required = "Required";

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const validate = (event: any) => {
    if (props.email) {
      _emailCheck(event.target.value);
    } else {
      _validate(event.target.value);
    }
  };

  const _validate = (val: string) => {
    if (val.length < 1) {
      setErrorText(required);
    } else {
      props.postValidate(val);
      setErrorText("");
    }
  };

  const _emailCheck = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) {
      setErrorText("Invalid email");
    } else {
      props.postValidate(val);
      setErrorText("");
    }
  };

  const { email, postValidate, type, ...rest } = props;

  let updatedType = type;
  if (type === "password" && showPassword) {
    updatedType = "input";
  }

  return (
    <TextField
      inputRef={inputRef}
      error={errorText() !== ""}
      helperText={errorText()}
      required
      onChange={validate}
      onBlur={validate}
      type={updatedType}
      {...rest}
      InputProps={
        type === "password"
          ? {
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
}
