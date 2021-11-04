import React from "react";
import { Cookies } from "react-cookie-consent";
import Dropzone, {
  IFileWithMeta,
  IUploadParams,
} from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import SnackActions from "../../../../alert/alert";

interface DAProps {
  destination: string;
}

export default function DropzoneAdapter(props: DAProps) {
  function readFileAsync(file: File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  const getUploadParams = async (f: IFileWithMeta): Promise<IUploadParams> => {
    const content = await readFileAsync(f.file);

    const bstring = JSON.stringify({
      file: content,
      directory: props.destination,
      filename: f.meta.name,
    });
    return {
      url: process.env.REACT_APP_BASE_URL + "/api/image/image.php",
      method: "PUT",
      headers: {
        Authorization: "Bearer " + Cookies.get("fotojwt"),
      },
      body: bstring,
    };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = (m: any, status: any) => {
    if (status === "error_upload") {
      SnackActions.error("Error uploading: " + m.file.name);
    } else if (status === "rejected_file_type") {
      SnackActions.warning("Only images can be submitted.");
    } else if (status === "done") {
      SnackActions.success("Uploaded " + m.file.name);
    }
  };

  return (
    <Dropzone
      styles={{ dropzone: { overflow: "unset" } }}
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      accept="image/*"
      maxFiles={10}
    />
  );
}
