  var playerInjured = false; 
  var playerLives =3;
  var currentLevel;
  var allLevelsCompleted = false ;
  var playerWidth = 50;
  var playerHeight = 50; 
  // var livesInDom ;
  
  movePlayer=()=> { 
    if (key.right === true) {
      playerPos.x += playerSpeed;
    } else if (key.left === true) {
      playerPos.x -= playerSpeed;
    }
    if (key.up === true) {
      playerPos.y -= playerSpeed;
    } else if (key.down === true) {
      playerPos.y += playerSpeed;
    }
    if (playerPos.x < playingArea.leftBoundary) {
      playerPos.x = playingArea.leftBoundary;
    }
    if (playerPos.x > playingArea.rightBoundary) {
      playerPos.x = playingArea.rightBoundary;
    }
    if (playerPos.y < playingArea.topBoundary) {
      playerPos.y = playingArea.topBoundary;
    }
    if (playerPos.y > playingArea.bottomBoundary) {
      playerPos.y = playingArea.bottomBoundary;
    }
    player.style.left = playerPos.x + 'px';
    player.style.top = playerPos.y + 'px';
  }

  function isGameOver(){
    if (playerLives < 0){
      return true;
    }return false; 
  }

  function gameOver(){
    // console.log("je suis passé par ici x fois")
    killOldGame();  
    alert("Game Over");
      // afficher modale game Over ****************
  }

  function nextLevel(){
    // Mettre à jour l'affichage du niveau (et le fond d'écran) ? 
    if (enemiesInField.length ==0){
      currentLevel = document.getElementById("level-select-box").value;
      if (currentLevel == "Easy"){
        currentLevel = "Medium";
      } else if (currentLevel =="Medium"){
        currentLevel ="Hard";
      } else if (currentLevel =="Hard"){
        currentLevel ="Extreme";
      } else {
        currentLevel ="Game Completed"
        allLevelsCompleted = true; 
      }
      goToNextLevel(currentLevel);
    } 
  }

function goToNextLevel(level){
  console.log("going to next level")
  console.log(level)
  if (level !="Game Completed"){
    console.log("goTonextlevel marche")
    killOldGame();
    updateLevelInDom(level);
    loadNewGame (level);
    playGame(level);
  } else{
    // congratulations message ************
  }
}

  function isLevelOver(){
    if (enemiesInField.length==0){
      // level finished message **************
      console.log("level over"); 
      nextLevel();
    }
  }
  
  function killOldGame(){
    window.clearInterval(interval.player);
    window.clearInterval(interval.enemies);
    window.clearInterval(interval.laser);
    window.clearInterval(interval.randomEnemies);
  }


function killablePlayer(){
  playerInjured = false;
}

function updateLivesInDom(playerLives){
  let livesInDom = document.getElementById("lives-count");
  if (playerLives>=0){
    livesInDom.innerHTML = "Lives: " + playerLives;
  }
}

function updateLevelInDom(currentLevel){
  let levelInDom = document.getElementById("level-count");
  levelInDom.innerHTML = "Level: " + currentLevel;
}

 


