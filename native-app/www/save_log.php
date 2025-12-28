<?php
    // DB 접속 정보
    $host = "localhost";
    $user = "nam002422";
    $pw = "A00242nam!!";
    $db = "nam002422";

    $conn = mysqli_connect($host, $user, $pw, $db);

    //앱에서 보낸 데이터 받기
    $device = $_GET['device'];
    $action = $_GET['action'];

    if($device && $action){
        $sql = "INSERT INTO tv_control_logs (device_name, action_type) VALUES ('$device', '$action')";
        mysqli_query($conn, $sql);

        echo "성공적으로 기록되었습니다!";
    } else {
        echo "데이터가 부족합니다.";
    }


    
?>