<?php

require "./token.php";

class SessionGateway {
    private $con=null;

    public function __construct($con){
        $this->con=$con;
    }

    private function _select(Array $input){
        $statement=$this->con->prepare("SELECT * FROM `users` WHERE username = ?;");
        $statement->bind_param("s", $input['username']);
        $result=$statement->execute();

        $statement->bind_result($_email, $_username, $fn, $ln, $phone, $pw, $role);

        while ($statement->fetch()) {
        }  

        $user = array(
            "email"=>$_email,
            "username"=>$_username,
            "fname"=>$fn,
            "lname"=>$ln,
            "phone"=>$phone,
            "role"=>$role,
            "password"=>$pw
        );
        return $user;
    }
    
    public function update(Array $input){
        if($input['username']==NULL || $input['password']==NULL||$input['newpassword']==NULL){
            return -1;
        }
        
        $hash = password_hash($input['newpassword'], PASSWORD_BCRYPT);

        $user = $this->_select($input);

        if ($user['username']){
            if (password_verify($input['password'], $user['password'])){
                $statement=$this->con->prepare("UPDATE `users` SET `password`=? WHERE `username`=?;");
                $statement->bind_param("ss", $hash,$user['username']);
                $statement->execute();
            }
        }
        return $statement->affected_rows;
    }

    public function find(Array $input)
    {
        if($input['username']==NULL){
            return false;
        }
             
        $user = $this->_select($input);

        $jwt="";
        if( $user['username']!==NULL){
            if (password_verify($input['password'], $user['password'])){
                $jwt = createToken($user);
            }
        }
        return $jwt;
    }
}
?>