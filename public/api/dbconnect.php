<?php
class Database {
    private $dbConn = null;

    public function __construct()
    {
        $host = getenv("HTTP_DB_HOST");
        $username = getenv("HTTP_DB_USERNAME");
        $password = getenv("HTTP_DB_PASSWORD");
        $dbname = getenv("HTTP_DB_NAME");

        // Create connection
        $conn = mysqli_connect($host, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        mysqli_select_db($conn, $dbname);

        $this->dbConn = $conn;
    }

    public function getConnection(){
        return $this->dbConn;
    }

    public function query($sql){
        $result = $this->dbConn->query($sql);
        $resultArr = array();
        while ($row = $result->fetch_assoc()) 
            $resultArr[] = $row;
        return json_encode($resultArr);
    }

    public function prepare($sql){
        return $this->dbConn->prepare($sql);
    }
}
?>