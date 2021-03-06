<?php
require "./imagegateway.php";
require "../responses.php";
require "../login/token.php";

/**
 * Class for processing requests to /api/image/image.php.
 *
 * This is the 'middle man', responsible for validating preconditions
 * and verifying parameters before handling the server manipulation.
 *
 * Also verifies token validity for protected functions.
 */
class ImageController
{
  private $con;
  private $requestMethod;
  private $id;

  private $imageGateway;

  public function __construct($db, $requestMethod)
  {
    $this->con = $db;
    $this->requestMethod = $requestMethod;

    $this->imageGateway = new ImageGateway($db);
  }

  /**
   * Main controller entry point - based on the request method,
   * call the appropriate handler function(s).
   */
  public function processRequest()
  {
    // switch only handles processible request types
    switch ($this->requestMethod) {
      case "POST":
        $response = $this->getImagesFromRequest();
        break;
      case "PUT":
        validateToken();
        $response = $this->putImageFromRequest();
        break;
      case "DELETE":
        validateToken();
        $response = $this->deleteImageFromRequest();
        break;
      case "OPTIONS":
        $response["status_code_header"] = "HTTP/1.1 200 OK";
        break;
      default:
        $response = notFoundResponse();
        break;
    }

    header($response["status_code_header"]);
    if ($response["body"]) {
      echo $response["body"];
    }
  }

  /**
   * Get request handler -- return array of images from the desired
   * server directory.
   *
   * @return response with header, if successful the body
   * will contain an array of JSON objects that are compatible with
   * the frontend gallery - height/width, src, and title
   */
  private function getImagesFromRequest()
  {
    $input = json_decode(file_get_contents("php://input"), true);
    $dir_to_read = $input["directory"];

    // Check the input 'directory' parameter to exist and be a
    // valid image directory.
    if ($dir_to_read == "") {
      return notFoundResponse();
    }
    if (!is_dir($_SERVER["DOCUMENT_ROOT"] . "/images/" . $dir_to_read)) {
      return unprocessableEntityResponse();
    }

    // At this point since the image directory exists, create the return
    // arr for all images in the given server directory
    $arr = $this->imageGateway->get($dir_to_read);
    $response["status_code_header"] = "HTTP/1.1 200 OK";
    $response["body"] = json_encode($arr);
    return $response;
  }

  /**
   * Upload an image from the request.
   */
  private function putImageFromRequest()
  {
    // Separate request params, only continue if basic param checks
    $input = json_decode(file_get_contents("php://input"), true);
    $destination = $input["directory"];
    $file = $input["file"];
    $filename = $input["filename"];

    if ($destination === null || $file === null || $filename === null) {
      return unprocessableEntityResponse();
    }

    // Do the upload, $result is false when an error is encountered
    // in the gateway put
    $result = $this->imageGateway->put($destination, $filename, $file);
    if (!$result) {
      return internalServerError();
    }

    $response["status_code_header"] = "HTTP/1.1 200 OK";
    return $response;
  }

  /**
   * Perform some prechecks to determine if the file is safe to delete.
   * If it is, delete the image.
   */
  private function deleteImageFromRequest()
  {
    $input = json_decode(file_get_contents("php://input"), true);
    $file = $input["file"];

    // Don't allow '..' directory movement
    if (preg_match("/.*\.\..*/", $file)) {
      return unprocessableEntityResponse();
    }
    // Only allow /images directory
    if (!preg_match("/\/images\/.*/", $file)) {
      return unprocessableEntityResponse();
    }

    $file = $_SERVER["DOCUMENT_ROOT"] . $file;

    // Prevent warnings for unlink file !exists
    if ($file == null || !is_file($file)) {
      return unprocessableEntityResponse();
    }

    // try to do the delete
    $result = $this->imageGateway->delete($file);
    if (!$result) {
      return unprocessableEntityResponse();
    }
    $response["status_code_header"] = "HTTP/1.1 200 OK";
    return $response;
  }
}
?>
