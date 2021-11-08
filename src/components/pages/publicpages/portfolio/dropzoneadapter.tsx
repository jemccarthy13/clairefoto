// External Utilities
import { Cookies } from "react-cookie-consent";
import Dropzone, {
  IFileWithMeta,
  IUploadParams,
} from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

// Internal Utilities
import SnackActions from "../../../../alert/alert";

/**
 * Expose to the rest of the app the properties required to make
 * the dropzone-uploader
 * @member {string} destination directory to place the files
 */
interface DAProps {
  destination: string;
}

/**
 * Wrap react-dropzone-uploader so we can plug and play third party
 * libraries if required.
 *
 * @param props The external properties required to make the dropzone work
 * @returns UI Dropzone Component
 */
export default function DropzoneAdapter(props: DAProps) {
  /**
   * Utility function to get file contents
   * @param file File to read
   * @returns An awaitable Promise, that returns the contents of the file
   */
  function readFileAsync(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise(
      (resolve: (v: string | ArrayBuffer | null) => any, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
      }
    );
  }

  /**
   * Override the upload parameters with our own, to allow the backend
   * api to correctly process the request.
   *
   * @param f a File with some metadata added by the Dropzone library
   * @returns {IUploadParams} mainly, URL/Method, and file contents in body
   */
  const getUploadParams = async (f: IFileWithMeta): Promise<IUploadParams> => {
    // turn the file into a string
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

  /**
   * Function called whenever a file's status is changed. We monitor
   * the status change for error status / completion.
   *
   * @param metafile The file with metadata added by the Dropzone.
   * @param status String status of the file's upload request
   */
  const handleChangeStatus = (metafile: IFileWithMeta, status: string) => {
    if (status === "error_upload") {
      SnackActions.error("Error uploading: " + metafile.file.name);
    } else if (status === "rejected_file_type") {
      SnackActions.warning("Only images can be submitted.");
    } else if (status === "done") {
      SnackActions.success("Uploaded " + metafile.file.name);
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
