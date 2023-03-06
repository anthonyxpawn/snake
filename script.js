window.onload = function () {
  // Seleccionar el contenedor del tablero de juego
  const playBoard = document.querySelector('.play-board');
  const scoreElement = document.querySelector('.score');
  const highScoreElement = document.querySelector('.high-score');
  const controls = document.querySelectorAll(".controls i");

  // Inicializar variables
  let gameOver = false;
  let foodX, foodY;
  let snakeX = 5, snakeY = 10;
  let snakeBody = [];
  let velocityX = 0, velocityY = 0;
  let setIntervalId;
  let score = 0;
  let highScore = localStorage.getItem("high-score") || 0; //obtiene la puntuacion maxima de localstorage
  highScoreElement.innerText = `High Score: ${highScore}`;

  // Funcion para musica de fondo
  function backgroundSound() {
    const music = document.getElementById('bg-music');
    music.play();
    music.volume = 0.3;
  };
  function bgEnded() {
    const end = document.getElementById('bg-music');
    end.pause();
  }

  // Funcion para musica de mordida
  function comidaSound() {
    const mordida = document.getElementById('comida');
    mordida.play();
    mordida.volume = 1;
    mordida.currentTime = 0;
  }

  // Funcion para musica de game over
  function gameOverSound() {
    const gameoverSound = document.getElementById('game-over');
    gameoverSound.play();
    gameoverSound.volume = 1;
  }

  // Funcion para redireccionar al nivel 2
  function levelTwo(){
    location.href = "/levels/level2/lvl2.html";
  }
  // Función para generar la posición aleatoria de la comida
  const RandomFoodPosition = () => {
    // Generar una posición aleatoria para la comida en el contenedor
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
  }

  // arrow funcion para parar el juego
  const TheGameIsOver = () => {
    clearInterval(setIntervalId); //limpia el tiempo
    alert("The Game is Over, press OK to replay...");
    location.reload(); //reinicia la pagina cuando presionamos ok
  }
  // Función para inicializar el juego y actualizar el tablero
  const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`; // Generar el HTML para la comida
    //playBoard.innerHTML = htmlMarkup; // Agregar la comida al tablero

    // Actualizar la posición de la cabeza de la serpiente según la velocidad actual
    snakeX += velocityX;
    snakeY += velocityY;

    // Chequear si la serpiente choca con la pared
    if (snakeX <= 0 || snakeY <= 0 || snakeX > 30 || snakeY > 30) {
      gameOver = true;
      gameOverSound();
      bgEnded();
    }

    if (score >= 2) {
      clearInterval(setIntervalId);
      alert("Felicidades, avanzaste al siguiente nivel. Presiona OK para redirigirte...");
      levelTwo();
    }

    //si la variable gameOver es true, ejecuta la funcion TheGameIsOver();
    if (gameOver) return TheGameIsOver();

    // Chequear si la serpiente choca con la comida
    if (snakeX === foodX && snakeY === foodY) {
      RandomFoodPosition(); // Generar una nueva posición aleatoria para la comida
      comidaSound();
      snakeBody.push([foodX, foodY]); // Agregar la comida a la serpiente
      score++; //incrementa el score en 1 evidentemente
      highScore = score >= highScore ? score : highScore; //obtienes un highscore si el score es mayor o igual al highScore
      localStorage.setItem("high-score", highScore); //guardamos el valor de high score en local storage con la clase high score del DOM
      scoreElement.innerText = `Score: ${score}`; // imprime la variable score en el DOM
      highScoreElement.innerText = `High Score: ${highScore}`; // imprime la variable highScore en el DOM
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1]; //cambia los valores de los elementos al frente del cuerpo de la serpiente
    }

    snakeBody[0] = [snakeX, snakeY]; // Actualizar la posición de la cabeza de la serpiente en el array de partes del cuerpo

    // Actualizar el HTML para cada parte del cuerpo de la serpiente
    for (let i = 0; i < snakeBody.length; i++) {
      htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; // Generar el HTML para la parte del cuerpo
      //chequear si la serpiente choca con su body
      if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
        gameOver = true;
        gameOverSound();
        bgEnded();
      }
    }
    playBoard.innerHTML = htmlMarkup; // Agregar la comida al tablero
  }

  // Función para cambiar la dirección de la serpiente según la tecla presionada
  const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
      velocityX = 0;
      velocityY = -1;
      backgroundSound();
    } else if (e.key === "ArrowDown" && velocityY != -1) {
      backgroundSound();
      velocityX = 0;
      velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
      backgroundSound();
      velocityX = -1;
      velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
      backgroundSound();
      velocityX = 1;
      velocityY = 0;
    }

    
    if (music === music.ended()) {
      music.play();
    };
  }

  controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key })); //llama la funcion changeDirection al escuchar un click en cada uno
  });

  // Generar una posición aleatoria para la comida y actualizar el tablero cada 100ms
  RandomFoodPosition();
  setIntervalId = setInterval(initGame, 100);

  // Escuchar los eventos del teclado para cambiar la dirección de la serpiente
  document.addEventListener("keydown", changeDirection);
}



function guardarScore(playerName, score) {
  $.ajax({
    type: "POST",
    url: "guardar_score.php",
    data: { playerName: playerName, score: score },
    success: function (response) {
      console.log(response);
    }
  });
}


// obtener el tbody de la tabla
const highscoreTableBody = document.getElementById('highscore-table-body');

// función para actualizar la tabla de puntuaciones en la base de datos
function updateHighscoresInDB(playerName, score) {
  // crear una nueva instancia de XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // preparar una solicitud POST para la URL del archivo que maneja la inserción de datos en la base de datos
  xhr.open('POST', 'insert_highscore.php', true);

  // establecer el tipo de contenido de la solicitud
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  // enviar la solicitud con los datos de jugador y puntuación
  xhr.send(`player_name=${playerName}&score=${score}`);

  // manejar la respuesta de la solicitud
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // si se ha insertado correctamente, mostrar un mensaje de éxito en la consola
      console.log('Highscore inserted successfully!');
    }
  }

  // función para mostrar el formulario de envío de puntuaciones
function showSubmitForm() {
  // obtener el último elemento de la tabla de puntuaciones
  const lastHighscore = highscoreTableBody.lastElementChild;

  // si la tabla está vacía o la puntuación del jugador es mayor que la del último elemento de la tabla
  if (!lastHighscore || score > parseInt(lastHighscore.cells[1].textContent)) {
    // mostrar el formulario de envío de puntuaciones
    document.getElementById('submit-form').style.display = 'block';
  }
}

// función para manejar el envío del formulario de envío de puntuaciones
function handleSubmitForm(event) {
  // evitar que se envíe el formulario
  event.preventDefault();

  // obtener el nombre del jugador y la puntuación
  const playerName = document.getElementById('player-name').value;
  const score = document.getElementById('score').value;

  // actualizar la tabla de puntuaciones en la base de datos
  updateHighscoresInDB(playerName, score);

  // ocultar el formulario de envío de puntuaciones
  document.getElementById('submit-form').style.display = 'none';

  // actualizar la tabla de puntuaciones en la página
  initHighscoreTable();
}

// agregar un event listener al formulario de envío de puntuaciones
document.getElementById('submit-form').addEventListener('submit', handleSubmitForm);

// función para inicializar la tabla de puntuaciones en la página
function initHighscoreTable() {
  // crear una nueva instancia de XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // preparar una solicitud GET para la URL del archivo que maneja la obtención de datos de la base de datos
  xhr.open('GET', 'get_highscores.php', true);

  // manejar la respuesta de la solicitud
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // parsear los datos JSON devueltos por el archivo PHP
      const highscores = JSON.parse(xhr.responseText);

      // limpiar la tabla de puntuaciones
      highscoreTableBody.innerHTML = '';

      // crear una fila para cada puntuación y agregarla a la tabla
      for (let i = 0; i < highscores.length; i++) {
        const highscore = highscores[i];
      }
    }
  }
}

function updateHighscoresTable() {
  const tableBody = document.getElementById('highscores-table-body');
  tableBody.innerHTML = '';

  fetch('/api/highscores')
    .then((response) => response.json())
    .then((highscores) => {
      highscores.forEach((highscore) => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', highscore.id);

        const playerNameCell = document.createElement('td');
        playerNameCell.textContent = highscore.player_name;
        row.appendChild(playerNameCell);

        const scoreCell = document.createElement('td');
        scoreCell.textContent = highscore.score;
        row.appendChild(scoreCell);

        const dateCreatedCell = document.createElement('td');
        dateCreatedCell.textContent = highscore.date_created;
        row.appendChild(dateCreatedCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}

fetch('/api/highscores', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ player_name: playerName, score }),
})
  .then(() => {
    console.log('Score saved');
    updateHighscoresTable();
  })
  .catch((error) => console.error(error));

}

// función para mostrar el formulario de envío de puntuaciones
function showSubmitForm() {
  // obtener el último elemento de la tabla de puntuaciones
  const lastHighscore = highscoreTableBody.lastElementChild;

  // si la tabla está vacía o la puntuación del jugador es mayor que la del último elemento de la tabla
  if (!lastHighscore || score > parseInt(lastHighscore.cells[1].textContent)) {
    // mostrar el formulario de envío de puntuaciones
    document.getElementById('submit-form').style.display = 'block';
  }
}

// función para manejar el envío del formulario de envío de puntuaciones
function handleSubmitForm(event) {
  // evitar que se envíe el formulario
  event.preventDefault();

  // obtener el nombre del jugador y la puntuación
  const playerName = document.getElementById('player-name').value;
  const score = document.getElementById('score').value;

  // actualizar la tabla de puntuaciones en la base de datos
  updateHighscoresInDB(playerName, score);

  // ocultar el formulario de envío de puntuaciones
  document.getElementById('submit-form').style.display = 'none';

  // actualizar la tabla de puntuaciones en la página
  initHighscoreTable();
}

// agregar un event listener al formulario de envío de puntuaciones
document.getElementById('submit-form').addEventListener('submit', handleSubmitForm);

// función para inicializar la tabla de puntuaciones en la página
function initHighscoreTable() {
  // crear una nueva instancia de XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // preparar una solicitud GET para la URL del archivo que maneja la obtención de datos de la base de datos
  xhr.open('GET', 'get_highscores.php', true);

  // manejar la respuesta de la solicitud
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // parsear los datos JSON devueltos por el archivo PHP
      const highscores = JSON.parse(xhr.responseText);

      // limpiar la tabla de puntuaciones
      highscoreTableBody.innerHTML = '';

      // crear una fila para cada puntuación y agregarla a la tabla
      for (let i = 0; i < highscores.length; i++) {
        const highscore = highscores[i];
      }
    }
  }
}

function updateHighscoresTable() {
  const tableBody = document.getElementById('highscores-table-body');
  tableBody.innerHTML = '';

  fetch('/api/highscores')
    .then((response) => response.json())
    .then((highscores) => {
      highscores.forEach((highscore) => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', highscore.id);

        const playerNameCell = document.createElement('td');
        playerNameCell.textContent = highscore.player_name;
        row.appendChild(playerNameCell);

        const scoreCell = document.createElement('td');
        scoreCell.textContent = highscore.score;
        row.appendChild(scoreCell);

        const dateCreatedCell = document.createElement('td');
        dateCreatedCell.textContent = highscore.date_created;
        row.appendChild(dateCreatedCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}

fetch('/api/highscores', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ player_name: playerName, score }),
})
  .then(() => {
    console.log('Score saved');
    updateHighscoresTable();
  })
  .catch((error) => console.error(error));
