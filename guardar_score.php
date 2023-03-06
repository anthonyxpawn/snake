<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "highscores";

// Conectarse a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si la conexión tuvo éxito
if ($conn->connect_error) {
  die("La conexión a la base de datos falló: " . $conn->connect_error);
}

// Obtener los datos del jugador y su puntaje enviados por AJAX
$playerName = $_POST["playerName"];
$score = $_POST["score"];

// Obtener el número de registros en la tabla highscore
$sql = "SELECT COUNT(*) as count FROM highscore";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$count = $row["count"];

// Verificar si la tabla está vacía o si el jugador rompió el record del top 10
if ($count < 10 || $score > getLowestScore()) {
  // Insertar los datos del jugador y su puntaje en la tabla highscore
  $sql = "INSERT INTO highscore (player_name, score) VALUES ('$playerName', $score)";
  if ($conn->query($sql) === TRUE) {
    echo "Los datos del jugador fueron guardados exitosamente";
  } else {
    echo "Error al guardar los datos del jugador: " . $conn->error;
  }
} else {
  echo "El puntaje del jugador no es suficiente para estar en el top 10";
}

// Obtener el puntaje más bajo del top 10
function getLowestScore() {
  global $conn;
  $sql = "SELECT score FROM highscore ORDER BY score ASC LIMIT 1 OFFSET 9";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  return $row["score"];
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
