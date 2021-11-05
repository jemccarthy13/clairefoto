<?php
require "./bookinggateway.php";
require "../responses.php";

class BookingController
{
    private $con;
    private $requestMethod;
    private $id;

    private $bookingGateway;

    public function __construct($db, $requestMethod)
    {
        $this->con = $db;
        $this->requestMethod = $requestMethod;

        $this->bookingGateway = new BookingGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case "GET":
                $response = $this->getBookingFromRequest();
                break;
            case "POST":
                validateToken();
                $response = $this->postBookingFromRequest();
                break;
            case "PUT":
                validateToken();
                $response = $this->putBookingFromRequest();
                break;
            case "DELETE":
                validateToken();
                $response = $this->deleteBookingFromRequest();
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

    private function getBookingFromRequest()
    {
        $input = json_decode(file_get_contents("php://input"), true);

        // IF input invalid, return not found
        // if ($dir_to_read == "") {
        //     return notFoundResponse();
        // }
        
        // TODO -- determine?
        // type = 'blackout' return blackouts
        // type = 'appt' return appointments
        // type = 'all' return all?
        $type = "all";
        $arr = $this->bookingGateway->get($type);

        $response["status_code_header"] = "HTTP/1.1 200 OK";
        $response["body"] = json_encode($arr);
        return $response;
    }

    private function postBookingFromRequest()
    {
        $input = json_decode(file_get_contents("php://input"), true);
       
        // CHECK input
        // if($destination===NULL || $file===NULL || $filename===NULL){
        //     return unprocessableEntityResponse();
        // }

        $result = $this->imageGateway->post();
        
        if ($result){
            $response["status_code_header"] = "HTTP/1.1 200 OK";
        } else {
            $response["status_code_header"] = "HTTP/1.1 500 Internal Server Error";
        }
        return $response;
    }

    private function putBookingFromRequest()
    {
        $input = json_decode(file_get_contents("php://input"), true);
       
        // CHECK input
        // if($destination===NULL || $file===NULL || $filename===NULL){
        //     return unprocessableEntityResponse();
        // }

        $result = $this->imageGateway->put();
        
        if ($result){
            $response["status_code_header"] = "HTTP/1.1 200 OK";
        } else {
            $response["status_code_header"] = "HTTP/1.1 500 Internal Server Error";
        }
        return $response;
    }

    private function deleteBookingFromRequest()
    {
        $input = json_decode(file_get_contents("php://input"), true);
        
        // CHECK input
        // if ($file == null) {
        //     return unprocessableEntityResponse();
        // }

        $result = $this->imageGateway->delete($input);
        if (!$result) {
            return unprocessableEntityResponse();
        }
        $response["status_code_header"] = "HTTP/1.1 200 OK";
        return $response;
    }
}
?>