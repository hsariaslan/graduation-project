<?php
if (!function_exists('apiCrypt')) {
    function apiCrypt ($data)
    {
        $cipher = 'AES-128-ECB';
        $key = env('CRYPT_KEY');
        $encoded = openssl_encrypt($data, $cipher, $key);
        return $encoded;
    }
}
