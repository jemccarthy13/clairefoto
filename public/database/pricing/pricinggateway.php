<?php
    class PricingGateway {
        private $con=null;

        public function __construct($con){
            $this->con=$con;
        }

        public function getTitles(){
            return $this->con->query("SELECT `title` from `pricing`");
        }
        
        public function findAll(){
            return $this->con->query("SELECT * from `pricing`");
        }

        public function delete($id){
            $statement=$this->con->prepare("DELETE FROM `pricing` WHERE id = :id");
            $result = $statement->execute(array('id'=>$id));
            return $result->rowCount();
        }

        public function update($id, Array $input){
            $statement=$this->con->prepare("UPDATE `pricing` SET ".
                "`title` = :title,".
                "`price` = :price,".
                "`options` = :options,".
                "`booking` = :booking".
                "WHERE id = :id");
            $result = $statement->execute(array(
                'id' => (int) $id,
                'title' => $input['title'],
                'price'  => $input['price'],
                'booking' => $input['booking'],
                'options' => $input['options'] ?? null,
            ));
            return $result->rowCount();
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
            var_dump($statement->error);
            return $result->rowCount();
        }
    }
?>