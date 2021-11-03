import React from "react";
import { Cookies } from "react-cookie-consent";
import Dropzone, { IUploadParams } from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import SnackActions from "../../../../alert/alert";

interface DAProps {
  destination: string;
}

export default function DropzoneAdapter(props: DAProps) {
  const getUploadParams = (m: any): IUploadParams => {
    console.log("Should upload to " + props.destination);
    return {
      url: process.env.REACT_APP_BASE_URL + "/api/image/image.php",
      method: "PUT",
      headers: {
        Authorization: "Bearer " + Cookies.get("fotojwt"),
      },
    };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = (m: any, status: any) => {
    if (status === "error_upload") {
      SnackActions.error("Error uploading: " + m.file.name);
    } else if (status === "rejected_file_type") {
      SnackActions.warning("Only images can be submitted.");
    }
  };

  return (
    <Dropzone
      styles={{ dropzone: { overflow: "unset" } }}
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      accept="image/*,audio/*,video/*"
      maxFiles={10}
    />
  );
}
