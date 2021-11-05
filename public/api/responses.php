<?php
    function unprocessableEntityResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
        return $response;
    }

    function internalServerError(){
        $response['status_code_header'] = 'HTTP/1.1 500 Internal Server Error';
        // TODO -- pass PHP optional param $msg?
        // $response['body'] = json_encode([
        //     'error' => $msg
        // ]);
        return $response;
    }

    function unauthorizedResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 401 Unauthorized';
        $response['body'] = json_encode([
            'error' => 'No auth'
        ]);
        return $response;
    }

    function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
?>