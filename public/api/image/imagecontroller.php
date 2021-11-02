<?php
    require "./imagegateway.php";
    require "../responses.php";

    class ImageController {
        private $con;
        private $requestMethod;
        private $id;

        private $imageGateway;

        public function __construct($db, $requestMethod){
            $this->con = $db;
            $this->requestMethod = $requestMethod;

            $this->imageGateway = new ImageGateway($db);
        }

        public function processRequest()
        {
            switch ($this->requestMethod) {
            case 'POST':
                $response = $this->getImagesFromRequest();
                break;
            case 'PUT':
                $response = $this->putImageFromRequest();
                break;
            case 'DELETE':
                $response = $this->logout();
                break;
            case 'OPTIONS':
                $response['status_code_header'] = 'HTTP/1.1 200 OK';
                break;
            default:
                $response = notFoundResponse();
                break;
            }
            
            header($response['status_code_header']);
            if ($response['body']) {
                echo $response['body'];
            }
        }

        private function getImagesFromRequest()
        {
            $input = json_decode(file_get_contents('php://input'), true);
            $dir_to_read=$input['directory'];

            if ($dir_to_read=="") {
                return notFoundResponse();
            }

            $arr = $this->imageGateway->get($dir_to_read);

            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            $response['body'] = json_encode($arr);
            return $response;
        }

        private function putImageFromRequest(){
            $input = json_decode(file_get_contents('php://input'), true);
            $destination=$input['directory'];
            $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
            var_dump($destination);
        }
    }
?>