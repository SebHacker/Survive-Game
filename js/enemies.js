var enemySpeed = 3; 
var totalEnemies ;
// var enemies =[];
var sources =["up","left","up","left","right","right","up","left","right","up","up","left","right","left","right","up","left","right","up","left","right","up","left","right"]
// // var sources =["up","left","up","left"]
// var sources =["up","left"]
var enemiesInField=[];
var enemyWidth = 20;
var enemyHeight = 20;

class Enemy{    
    constructor(){
        this.positionLeft = 150;
        this.positionTop = -50;
        this.source; // (up, left, right)
        //this.HTMLElement;
    }
}
// left entre 0 et 900px en haut de l'écran 
// top entre 0 et 480 px 


// arrivée du haut : left = aleatoire, top = 0px
// arrivée de gauche : top = aléatoire , left = 0px 
//arrivée de droite : top = aléatoire , left = 1150px

function sendEnemy(source){
    let enemy = new Enemy;
    HtmlElement = createEnemy();
    playingArea.appendChild(HtmlElement);
    HtmlElement.classList.add('enemy');
    enemy.source=source; 
    if (source =="up"){
        enemy.positionLeft= fetchpositionLeft();
        enemy.positionTop = 0; 
    }else if(source == "left"){
        enemy.positionLeft= 0;
        enemy.positionTop = fetchpositionTop(); 
    }else if(source =="right"){
        enemy.positionLeft=1150;
        enemy.positionTop = fetchpositionTop(); 
    }
    HtmlElement.style.top = enemy.positionTop + "px";
    HtmlElement.style.left = enemy.positionLeft + "px";
    enemiesInField.push ({enemy,HtmlElement})
}

function createEnemy() {
    return document.createElement('div');
}


function fetchpositionLeft(){
    // renvoie une position de départ sur le x 
    return Math.floor(Math.random()*1130);
}

function fetchpositionTop(){
    // renvoie une position sur le y 
    return Math.floor(Math.random()*630);
}


function removeEnemy(index) {
    console.log(index)
    console.log(enemiesInField[index]);
    if (enemiesInField[index].HtmlElement){
        enemiesInField[index].HtmlElement.remove();
    }
    
    enemiesInField.splice(index,1);
}
// let isLost = false;
function moveEnemies(){
    for (let i =0; i<enemiesInField.length; i ++){
        // enemySpeed en fonction de la difficulté ****************
        // console.log("moving ennemies");
        enemySpeed = Math.floor(Math.random()*10);
        if (checkEnemyImpact(enemiesInField[i].enemy)==false){
            if(enemiesInField[i].HtmlElement){
                if (enemiesInField[i].enemy.positionLeft < playerPos.x){
                    enemiesInField[i].enemy.positionLeft += enemySpeed;
                    enemiesInField[i].HtmlElement.style.left = enemiesInField[i].enemy.positionLeft + "px";
                } else {
                    enemiesInField[i].enemy.positionLeft -= enemySpeed;
                    enemiesInField[i].HtmlElement.style.left = enemiesInField[i].enemy.positionLeft + "px";
                }
                if (enemiesInField[i].enemy.positionTop < playerPos.y){
                    enemiesInField[i].enemy.positionTop += enemySpeed;
                    enemiesInField[i].HtmlElement.style.top = enemiesInField[i].enemy.positionTop + "px";
                } else {
                    enemiesInField[i].enemy.positionTop -= enemySpeed;
                    enemiesInField[i].HtmlElement.style.top = enemiesInField[i].enemy.positionTop + "px";
                }
            } 
        } else {
            if (playerInjured == false){
                playerLives-=1;
                updateLivesInDom(playerLives);
                console.log("laaaa");
                
                playerInjured = true; 
                setTimeout(() => {
                    killablePlayer ();
                }, 1500);
            }
            // else {
            //     setTimeout(() => {
            //         console.log("killable player called");
            //         killablePlayer ();
            //     }, 1000);  
            // }
            console.log("Player Lives" + playerLives)
            if (isGameOver() ){
                console.log("ici")
                // isLost = true;
                gameOver();
                return;
            }
        }
    }
}

function checkEnemyImpact(enemy){
// impact between the player and the enemy 
    if (enemy.positionLeft >= playerPos.x && enemy.positionLeft <= playerPos.x +playerWidth && enemy.positionTop >= playerPos.y && enemy.positionTop <= playerPos.y + playerHeight){
        //(currentLaserX >= currentEnemyX && currentLaserX <= currentEnemyX +enemyWidth && currentLaserY >= currentenemyY && currentLaserY <= currentenemyY + enemyHeight)
        return true; 
    } else if (enemy.positionLeft + enemyWidth <= playerPos.x + playerWidth && enemy.positionLeft + enemyWidth >= playerPos.x && enemy.positionTop >= playerPos.y && enemy.positionTop <= playerPos.y + playerHeight){
        //(currentLaserX + laserWidth <= currentEnemyX + enemyWidth && currentLaserX + laserWidth >= currentEnemyX && currentLaserY >= currentenemyY && currentLaserY <= currentenemyY +enemyHeight)
        return true; 
    } else if (enemy.positionTop + enemyHeight >= playerPos.y && enemy.positionTop <= playerPos.y + playerHeight && enemy.positionLeft>= playerPos.x && enemy.positionLeft <= playerPos.x + playerWidth){
        //(currentLaserY + laserHeight >= currentenemyY && currentLaserY <= currentenemyY + enemyHeight && currentLaserX>= currentEnemyX && currentLaserX<= currentEnemyX + enemyWidth)
        return true; 
    } else if (enemy.positionTop + enemyHeight >= playerPos.y && enemy.positionTop + enemyHeight <= playerPos.y + playerHeight && enemy.positionLeft + enemyWidth <= playerPos.x + playerWidth && enemy.positionLeft + enemyWidth >= playerPos.x){
        //(currentLaserY + laserHeight >= currentenemyY && currentLaserY +laserHeight <= currentenemyY + enemyHeight && currentLaserX + laserWidth <= currentEnemyX + enemyWidth && currentLaserX + laserWidth >= currentEnemyX){
        return true;
    } return false; 
}

//player kill 
//        if (Math.floor(currentLaser[1])== Math.floor(playerPos.y) && Math.floor(currentLaser[2])==Math.floor(playerPos.x))

function checkEnemyKill(laserDirection){
//  console.log ("checking enemy kill by laser")
let lasers =[];
    if (laserDirection =="up"){
        lasers = lasersUp;
    }else if (laserDirection =="left"){
        lasers = lasersLeft;
    }else if (laserDirection == "right"){
        lasers = lasersRight;
    }
    for (let i = 0; i<lasers.length; i ++){
        let currentLaser = lasers[i];
        let currentLaserX = Math.floor(currentLaser[0].style.left.replace("px",""));
        let currentLaserY = Math.floor(currentLaser[0].style.top.replace("px",""));
        for (let j =0; j<enemiesInField.length;j++){
            // check enemy and laser in the same position 
            if(enemiesInField[j].HtmlElement){
                let currentEnemy = enemiesInField[j].HtmlElement;
                let currentEnemyX = Math.floor(currentEnemy.style.left.replace("px","")); 
                let currentenemyY = Math.floor(currentEnemy.style.top.replace("px","")); 
                if (currentLaserX >= currentEnemyX && currentLaserX <= currentEnemyX +enemyWidth && currentLaserY >= currentenemyY && currentLaserY <= currentenemyY + enemyHeight){
                    playingArea.removeChild(enemiesInField[j].HtmlElement);
                    delete enemiesInField[j].HtmlElement;
                    enemiesInField.splice(j,1);
                    if (currentLaser[0]){
                        currentLaser[0].remove();
                        removeLaser(laserDirection, i)
                    }
                    isLevelOver();
                }
                else if(currentLaserX + laserWidth <= currentEnemyX + enemyWidth && currentLaserX + laserWidth >= currentEnemyX && currentLaserY >= currentenemyY && currentLaserY <= currentenemyY +enemyHeight){
                    playingArea.removeChild(enemiesInField[j].HtmlElement);
                    delete enemiesInField[j].HtmlElement;
                    enemiesInField.splice(j,1);
                    if (currentLaser[0]){
                        currentLaser[0].remove();
                        removeLaser(laserDirection, i)
                    }
                    isLevelOver();
                }
                else if (currentLaserY + laserHeight >= currentenemyY && currentLaserY <= currentenemyY + enemyHeight && currentLaserX>= currentEnemyX && currentLaserX<= currentEnemyX + enemyWidth){
                    playingArea.removeChild(enemiesInField[j].HtmlElement);
                    delete enemiesInField[j].HtmlElement;
                    enemiesInField.splice(j,1);
                    if (currentLaser[0]){
                        currentLaser[0].remove();
                        removeLaser(laserDirection, i)
                    }
                    isLevelOver();
                }
                else if (currentLaserY + laserHeight >= currentenemyY && currentLaserY +laserHeight <= currentenemyY + enemyHeight && currentLaserX + laserWidth <= currentEnemyX + enemyWidth && currentLaserX + laserWidth >= currentEnemyX){
                    playingArea.removeChild(enemiesInField[j].HtmlElement);
                    delete enemiesInField[j].HtmlElement;
                    enemiesInField.splice(j,1);
                    if (currentLaser[0]){
                        currentLaser[0].remove();
                        removeLaser(laserDirection, i)
                    }
                    isLevelOver();
                }
            }
        }

    }
}

function removeLaser(laserDirection, i){
    if (laserDirection =="up"){
        lasersUp.splice(i,1);
    }else if (laserDirection =="left"){
        lasersLeft.splice(i,1);;
    }else if (laserDirection == "right"){
        lasersRight.splice(i,1);;
    } 
    // ajouter effet au moment du kill 
}

function addRandomEnemies(nbElements){
// ajoute nbElements d'ennemis 
    let directionsArray = ["left", "right", "up"];
    let randomIndex;

    for (let i=0; i<nbElements; i++){
        randomIndex = directionsArray[Math.floor(Math.random()*directionsArray.length)];
        sendEnemy (randomIndex);
    }
 }


// function checkEnnemiesCollision(enemyObject, index){
//     let enemy = enemyObject.enemy;
//     let HtmlElement = enemyObject.HtmlElement;
//     for (let i=0; i<enemiesInField.length; i++){
//         console.log("enemies in field")
//         console.log(enemiesInField);
//         if (i!==index){
//             let currentEnemy = enemiesInField[i].enemy;
//             if (enemy.positionLeft >= currentEnemy.positionLeft && enemy.positionLeft <= currentEnemy.positionLeft + enemyWidth && enemy.positionTop >= currentEnemy.positionTop && enemy.positionTop <= currentEnemy.positionTop + enemyHeight){
//                 removeEnemy(i);
//                 return true; 
//             } else if (enemy.positionLeft + enemyWidth <= currentEnemy.positionLeft + enemyWidth && enemy.positionLeft + enemyWidth >= currentEnemy.positionLeft && enemy.positionTop >= currentEnemy.positionTop && enemy.positionTop <= currentEnemy.positionTop + enemyHeight){
//                 removeEnemy(i);
//                 return true; 
//             } else if (enemy.positionTop + enemyHeight >= currentEnemy.positionTop && enemy.positionTop <= currentEnemy.positionTop + enemyHeight && enemy.positionLeft>= currentEnemy.positionLeft && enemy.positionLeft <= currentEnemy.positionLeft + enemyWidth){
//                 removeEnemy(i);
//                 return true; 
//             } else if (enemy.positionTop + enemyHeight >= currentEnemy.positionTop && enemy.positionTop + enemyHeight <= currentEnemy.positionTop + enemyHeight && enemy.positionLeft + enemyWidth <= currentEnemy.positionLeft + enemyWidth && enemy.positionLeft + enemyWidth >= currentEnemy.positionLeft){
//                 removeEnemy(i);
//                 return true;  
//             } 
//         }
//     }
// }

