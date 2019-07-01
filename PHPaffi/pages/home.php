<?php
session_start();
if (!isset($_SESSION['id_usuario'])) {
    header("location: index.php");
    exit;
}
?>
<html>

<head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="../css/materialize.min.css" media="screen,projection" />
    <link type="text/css" rel="stylesheet" href="../css/home.css" media="screen,projection" />
    <link rel="icon" type="image/png" href="../src/imgs/paffi-logo1.png" sizes="16x16">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body>


    <nav style="height: 5em" class="blue accent-3">
        <div class="nav-wrapper" style="margin-right:20px;">
            <a href="#" class="brand-logo center"><img src="../src/imgs/paffi-logo.png" width="175px" height="70px"></a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down" style="margin-top:10px">
                <li><a href="sass.html">Homepage</a></li>
            <li><a href="badges.html">Restaurantes</a></li>
            <li><a href="collapsible.html">Perfil</a></li>
            <li>
            <button data-target="modal1" class="btn modal-trigger blue accent-3" style="box-shadow:none">Sair</button>
              </li>
            </ul>
        </div>
    </nav>
      <div id="modal1" class="modal" style="width:20%">
    <div class="modal-content" >
      <h5>Tem certeza que deseja sair?</h5>
    </div>
    <form method="POST"><button class="modal-close waves-effect btn-flat right" type="submit" value="sair" name="sair" style="height: 87%;box-shadow:none">Sair</button>
    <a href="#" class="modal-close waves-effect btn-flat right">Voltar</a>
    </form>
  </div>
    <ul class="sidenav" id="mobile-demo">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
     <li><a href="collapsible.html">Javascript</a></li>
        <li><a href="mobile.html">Mobile</a></li>
        <li>
                    <form method="POST">
                        <button class="hoverable btn waves-effect waves-light blue accent-3" type="submit"
           value="sair" name="sair" style="width: 99%;box-shadow:none">Sair</button>
                    </form>
                </li>
    </ul>
    <?php

    
    

    if (isset($_POST['sair'])) {
        session_destroy();
        header("location:index.php");
    }
    ?>
    <script type="text/javascript" src="../js/materialize.min.js"></script>
    <script>
        M.AutoInit();
    </script>
</body>

</html>