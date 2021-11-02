<?php
    class PricingGateway {
        private $con=null;

        public function __construct($con){
            $this->con=$con;
        }

        public function getTitles(){
            return $this->con->query("SELECT `title` from `pricing`");
        }
        
        public function find($id)
        {
            if($id==NULL){
                return false;
            }
            $statement=$this->con->prepare("SELECT id, title, price, booking, options FROM `pricing` WHERE id = ?;");
            $statement->bind_param("i", $id);
            $result=$statement->execute();
            return $result;
        }

        public function findAll(){
            return $this->con->query("SELECT * from `pricing`");
        }

        public function delete($id){
            $statement=$this->con->prepare("DELETE FROM `pricing` WHERE id = ?");
            $statement->bind_param("i", $id);
            $result = $statement->execute();
            return $statement->affected_rows;
        }

        public function update(Array $input){
            $statement=$this->con->prepare("UPDATE `pricing` SET ".
                "title = ?,".
                "price = ?,".
                "options = ?,".
                "booking = ? ".
                "WHERE id = ?;");
            $statement->bind_param("ssssi",
                $input['title'],
                $input['price'],
                json_encode($input['options']),
                $input['booking'],
                $input['id']
            );
            $result = $statement->execute();
            return $statement->affected_rows;
        }

        public function insert(Array $input){
            $statement = $this->con->prepare("INSERT INTO `pricing` (`id`, `title`, `price`, `options`, `booking`) VALUES ".
            "(?, ?, ?, ?, ?)");
            if (!isset($input['booking'])){
                $input['booking']=false;
            }
            $statement->bind_param(
                "issss", 
                $input['id'], 
                $input['title'],
                $input['price'],
                $input['options'],
                $input['booking']);
            $result = $statement->execute();
            return $statement->affected_rows;
        }
    }
?>