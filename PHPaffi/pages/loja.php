<?php
session_start();
    if(!isset($_SESSION['id_usuario']))
    {
        header("location: index.php");
        exit;
    }
    if($_SESSION['nome'] != "Daniel Novaaes"){
        header("location: index.php");
        exit;
    }
?>
a