<?php

require "./token.php";

class SessionGateway {
    private $con=null;

    public function __construct($con){
        $this->con=$con;
    }
    
    public function find(Array $input)
    {
        if($input['username']==NULL){
            return false;
        }
        $statement=$this->con->prepare("SELECT * FROM `users` WHERE username = ?;");
        $statement->bind_param("s", $input['username']);
        $result=$statement->execute();

        $statement->bind_result($_email, $_username, $fn, $ln, $phone, $pw, $role);

        while ($statement->fetch()) {
        }        

        $jwt="";
        if (password_verify($input['password'], $pw)){
            $user = array(
                "email"=>$_email,
                "username"=>$_username,
                "fname"=>$fn,
                "lname"=>$ln,
                "phone"=>$phone,
                "role"=>$role);
    
            $jwt = createToken($user);
        }
        return $jwt;
    }

    public function delete($id){

    }
}
?>