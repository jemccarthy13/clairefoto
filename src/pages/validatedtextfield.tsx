import React from "react";
import { TextField } from "@mui/material";
import { useSyncState } from "../syncstate";
import { StandardTextFieldProps } from "@mui/material";

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
}
