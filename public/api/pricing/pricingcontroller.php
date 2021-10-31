<?php
    require "./pricinggateway.php";
    require "../responses.php";

    class PricingController {
        private $con;
        private $requestMethod;
        private $id;

        private $pricingGateway;

        public function __construct($db, $requestMethod){
            $this->con = $db;
            $this->requestMethod = $requestMethod;

            $this->pricingGateway = new PricingGateway($db);
        }

        public function processRequest()
        {
            switch ($this->requestMethod) {
            case 'GET':
                $this->id=$_GET["id"];
                if ($this->id) {
                    $response = $this->getPrice($this->id);
                } else {
                    $response = $this->getAllPrices();
                };
                break;
            case 'POST':
                $response = $this->createPriceFromRequest();
                break;
            case 'PUT':
                $response = $this->updatePriceFromRequest();
                break;
            case 'DELETE':
                $response = $this->deletePriceFromRequest();
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

        private function getAllPrices()
        {
            $result = $this->pricingGateway->findAll();
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            $response['body'] = $result;
            return $response;
        }

        private function createPriceFromRequest()
        {
            $input = (array) json_decode(file_get_contents('php://input'), TRUE);
            if (! $this->validatePrice($input)) {
                return unprocessableEntityResponse();
            }
            $this->pricingGateway->insert($input);
            $response['status_code_header'] = 'HTTP/1.1 201 Created';
            $response['body'] = null;
            return $response;
        }

        private function updatePriceFromRequest()
        {
            $input = (array) json_decode(file_get_contents('php://input'), TRUE);
            $result = $this->pricingGateway->find($input["id"]);
            if (! $result) {
                return notFoundResponse();
            }
            $result=$this->pricingGateway->update($input);
            if($result>0){
                $response['status_code_header'] = 'HTTP/1.1 200 OK';
                $response['body'] = null;
            } else {
                return unprocessableEntityResponse();
            }
            return $response;
        }

        private function deletePriceFromRequest()
        {
            $input = (array) json_decode(file_get_contents('php://input'), TRUE);
            $result = $this->pricingGateway->delete($input["id"]);
            var_dump($result);
            if ($result!=1) {
                return unprocessableEntityResponse();
            }
            return $result;
        }

        private function validatePrice($input)
        {
            if (! isset($input['id'])) {
                return false;
            }
            return true;
        }
    }
?>