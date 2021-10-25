<?php
    require "./pricinggateway.php";
    require "../responses.php";

    class PricingController {
        private $con;
        private $requestMethod;
        private $id;

        private $pricingGateway;

        public function __construct($db, $requestMethod, $id){
            $this->con = $db;
            $this->requestMethod = $requestMethod;
            $this->id = $id;

            $this->pricingGateway = new PricingGateway($db);
        }

        public function processRequest()
        {
            switch ($this->requestMethod) {
            case 'GET':
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
                $response = $this->updatePriceFromRequest($this->id);
                break;
            case 'DELETE':
                $response = $this->deletePrice($this->id);
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

        private function validatePrice($input)
        {
            if (! isset($input['id'])) {
                return false;
            }
            return true;
        }
    }
?>