import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useSyncState } from "../syncstate";
import { StandardTextFieldProps } from "@mui/material";
import { ValidateContext } from "./contactform";

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

  const [prevVal, setprevVal] = useState(false);

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
      setErrorText("");
    }
  };

  return (
    <ValidateContext.Consumer>
      {(value) => {
        if (value !== prevVal && inputRef.current) {
          _validate(inputRef.current.value);
          setprevVal(value);
        }
        return (
          <TextField
            inputRef={inputRef}
            error={errorText() !== ""}
            helperText={errorText()}
            required
            onChange={validate}
            onBlur={validate}
            {...props}
          />
        );
      }}
    </ValidateContext.Consumer>
  );
}
