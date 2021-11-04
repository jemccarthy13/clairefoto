<?php
    require "./sessiongateway.php";
    require "../responses.php";

    class SessionController {
        private $con;
        private $requestMethod;
        private $id;

        private $sessionGateway;

        public function __construct($db, $requestMethod){
            $this->con = $db;
            $this->requestMethod = $requestMethod;

            $this->sessionGateway = new SessionGateway($db);
        }

        public function processRequest()
        {
            switch ($this->requestMethod) {
            case 'POST':
                $response = $this->login();
                break;
            case "PUT":
                $response = $this->changePassword();
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

        private function login()
        {
            $input = (array) json_decode(file_get_contents('php://input'), TRUE);
            $result = $this->sessionGateway->find($input);
            if ($result=="") {
                return unauthorizedResponse();
            }
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            $arr=array("jwt"=>$result, 'expires'=>time()+60*60*6);
            $response['body'] = json_encode($arr);
            return $response;
        }

        private function changePassword(){
            $input = (array) json_decode(file_get_contents('php://input'), TRUE);
            $result = $this->sessionGateway->update($input);
            if ($result<1 || $result==NULL) {
                return unauthorizedResponse();
            }
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            return $response;
        }
    }
?>