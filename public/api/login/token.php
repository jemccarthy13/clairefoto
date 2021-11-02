<?php
    function createToken($user){
        // Create token header as a JSON string
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

        // Create token payload as a JSON string
        $iat = new DateTimeImmutable();
        $user['exp'] = $iat->modify("+6 hours")->getTimestamp();
        $user['iat'] = $iat->getTimestamp();
        $user['iss'] = 'claremariefotografie';
        $user['nbf'] = $iat->getTimestamp();
        $payload = json_encode($user);

        // Encode Header to Base64Url String
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

        // Encode Payload to Base64Url String
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

        // Create Signature Hash
        $secret = getenv("HTTP_JWT_SECRET");
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);

        // Encode Signature to Base64Url String
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        // Create JWT
        $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

        return $jwt;
    }

    function validateToken(){
        if (! preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
            header('HTTP/1.0 400 Bad Request');
            echo 'Token not found in request';
            exit;
        }
        $jwt = $matches[1];
        if (! $jwt) {
            // No token was able to be extracted from the authorization header
            header('HTTP/1.0 400 Bad Request');
            exit;
        }
        $secret = getenv("HTTP_JWT_SECRET");

        $tks = \explode('.', $jwt);
        list($headb64, $bodyb64, $cryptob64) = $tks;

        $body_decoded = jwt_decode($bodyb64);
        $head_decoded = jwt_decode($headb64);

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($head_decoded)));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($body_decoded)));
 
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
        $verifySign = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        $now = new DateTimeImmutable();
        $serverName = "claremariefotografie";

        $token = $body_decoded;
        
        if ($token->iss !== $serverName ||
            $token->nbf > $now->getTimestamp() ||
            $token->exp < $now->getTimestamp())
        {
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }

        return $verifySign == $cryptob64;
    }

    function jwt_decode($input) {
        $decoded = \base64_decode(\strtr($input, '-_', '+/'));
        $obj = \json_decode($decoded);
        return $obj;
    }

?>