<?php

class BookingGateway {
    private $con=null;

    public function __construct($con){
        $this->con=$con;
    }

    public function get($type){
        // TODO -- get MYSQL based on 'type' of bookings
        $entries = array();
        return $entries;
    }

    public function put($input) {
        // modify booking on server
        return false;
    }
    
    public function post($input){
        // post to server
        return false;
    }

    public function delete($input){
        // delete booking or blackout from server
        return false;
    }
}
?>