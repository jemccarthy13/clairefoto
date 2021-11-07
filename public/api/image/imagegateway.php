<?php

function warning_handler($errno, $errstr)
{
  throw new \Exception($errstr, $errno);
}

class ImageGateway
{
  private $con = null;

  public function __construct($con)
  {
    $this->con = $con;
  }

  /**
   * Process a "get" request.
   * Precondition:
   * - $dir_to_read is a valid directory (this function makes no check)
   * - $dir_to_read contains 0+ images
   * @return array of images in $dir_to_read on the server
   */
  public function get($dir_to_read)
  {
    $dir = $_SERVER["DOCUMENT_ROOT"] . "/images/" . $dir_to_read;

    $fileSystemIterator = new FilesystemIterator($dir);
    $entries = [];
    foreach ($fileSystemIterator as $fileInfo) {
      // continue if file exists
      if (file_exists($fileInfo->getPathname())) {
        // continue if mime is image/*
        // get array should only include images
        $cntTypeStr = mime_content_type($fileInfo->getPathname());
        if (preg_match("/image\/*/i", $cntTypeStr)) {
          $imgSize = getimagesize($fileInfo->getPathname());
          $myObj = new \stdClass();
          $myObj->width = $imgSize[0];
          $myObj->height = $imgSize[1];
          $myObj->src =
            "/images/" . $dir_to_read . "/" . $fileInfo->getFilename();
          $myObj->srcSet = "";
          $myObj->title = $fileInfo->getFilename();
          $entries[] = $myObj;
        }
      }
    }
    return $entries;
  }

  /**
   * Delete the file from the server
   * WARNING - This function only checks if file is an image.
   * Perform all necessary prechecks before calling this function.
   */
  public function delete($file)
  {
    $result = false;
    if ($this->_isImageFile($file)) {
      $result = unlink($file);
    }
    return $result;
  }

  /**
   * A function that
   * @return true iff extension is a whitelisted image extension
   */
  private function _isImageFile($file)
  {
    $info = pathinfo($file);
    return in_array(strtolower($info["extension"]), [
      "jpg",
      "jpeg",
      "gif",
      "png",
      "bmp",
      "avif",
      "webp",
    ]);
  }

  /**
   * Upload an image to a server directory
   *
   * @param $destination The destination /image subdirectory
   * @param $filename The filename of the new image w/extension (i.e. "myimage.jpg")
   * @param $file The file contents (base64 encoded)
   */
  public function put($destination, $filename, $file)
  {
    // Verify destination is valid....
    if (!is_dir($_SERVER["DOCUMENT_ROOT"] . "/images" . "/" . $destination)) {
      return false;
    }

    // Verify the contents of the file is a base64 encoded image
    set_error_handler("warning_handler", E_WARNING);
    $contents = null;
    try {
      $contents = file_get_contents($file);
    } catch (Exception $e) {
      return false;
    }
    if (!$contents) {
      return false;
    }
    restore_error_handler();

    if (!$this->_isImageFile($filename)) {
      return false;
    }

    // if passed checks, create the image in the desired image directory
    $result = file_put_contents(
      $_SERVER["DOCUMENT_ROOT"] .
        "/images" .
        "/" .
        $destination .
        "/" .
        $filename,
      $contents
    );
    return !($result === false);
  }
}
?>
