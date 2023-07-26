<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="lvl3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
    <script src="lvl3.js"></script>
    <title>Snake Game</title>
</head>

<body>
    <div class="audios">
        <audio id="bg-music" src="../../sounds/music.mp3" loop></audio>
        <audio id="game-over" src="../../sounds/game-over.mp3"></audio>
        <audio id="comida" src="../../sounds/mordida.mp3"></audio>
    </div>

    <div class="wrapper">
        <div class="game-details">
            <span>Level: 3</span>
            <span class="score">Score: 0</span>
            <span class="high-score">High Score: 0</span>
        </div>

        <div class="play-board"></div>

        <div class="controls">
            <i data-key="ArrowLeft" class="fa-solid fa-arrow-left-long"></i>
            <i data-key="ArrowUp" class="fa-solid fa-arrow-up-long"></i>
            <i data-key="ArrowDown" class="fa-solid fa-arrow-down-long"></i>
            <i data-key="ArrowRight" class="fa-solid fa-arrow-right-long"></i>
        </div>
    </div>

    <div class="highscore-container">
        <h2>High Scores</h2>
        <table class="highscore-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody id="highscores-table-body">
                {{#each highscores}}
                  <tr data-id="{{id}}">
                    <td>{{player_name}}</td>
                    <td>{{score}}</td>
                    <td>{{date_created}}</td>
                  </tr>
                {{/each}}
              </tbody>
        </table>
        <form class="highscore">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name">
            <input type="submit" value="Submit">
        </form>
    </div>

    <div class="nav-bar">
        <div class="bg">
            <p>Made By &nbsp;<i class="fas fa-heart"></i>&nbsp; by <a href="#">Your Name</a></p>
        </div>
    </div>
    <div class="nav-bar">
        <div class="bg">
            <p>Created By: <a href="https://www.youtube.com/@xlCOPYlx/videos" target="_blank">Anthony Encarnacion</a></p>
        </div>
        <div class="p">
            <p>Version 0.4</p>
        </div>
    </div>
</body>
</html>