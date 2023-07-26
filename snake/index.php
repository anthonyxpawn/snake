<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="home.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
    <script src="home.js"></script>
    <title>Snake Game</title>
</head>

<body>
    <div class="novedades" id="novedades">
        <ol>
            <li>Agregamos nuevas paletas de colores a los niveles</li>
            <li>Creamos una ventana de inicio</li>
            <li>Creamos una ventana para ver los detalles de los updates</li>
            <li>Modificamos un poco el codigo fuente</li>
        </ol>
    </div>


    <div class="fondo">
        <div class="close" id="close" onclick="mostrar()">
            <button class="cerrar">X</button>
        </div>

        <h1 class="titulo" id="titulo">snake game</h1>

        <div class="botones" id="botones">
            <div class="play">
                <button class="pla" type="submit"><a href="lvl1.php">Play</a></button>
            </div>

            <div class="news" id="news">
                <button class="sub" type="submit" onclick="ocultar()">Novedades</button>
            </div>
        </div>

        <div class="nav-bar">
            <div class="bg">
                <p>Created By: <a href="https://www.youtube.com/@xlCOPYlx/videos" target="_blank">Anthony
                        Encarnacion</a></p>
            </div>
            <div class="p">
                <p>Version 0.4</p>
            </div>
        </div>
    </div>
</body>

</html>