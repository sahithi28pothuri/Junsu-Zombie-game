var PLAY = 1;
var END = 0;
var gameState = PLAY;

var soldier;

var zombie;

var bg;

var stone;

var soldierImg, zombieImg, stoneImg, canImg, bgImg;

var score=0;

var gameOver, restart;

var gameOverImg, restartImg;

var invisibleGround, invisibleGround2, invisibleGround3;

var bullet, bullets=[], showbullet, bulletImg;

var info, infoImg;

function preload(){
soldierImg=loadImage("soldier.png");
zombieImg=loadImage("zombie1.png");

stone=loadImage("stone1.png");

bgImg=loadImage("bg.png");

gameOverImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");

infoImg=loadImage("info icon.png");
}

function setup() {
 createCanvas(1000, 600);

 bg=createSprite(500, 200);
 bg.addImage(bgImg);
 bg.velocityX=-4;
 bg.scale=1.1;

 soldier=createSprite(700, 500, 50, 50);
 soldier.addImage(soldierImg);
 soldier.scale=0.5;

 zombie=createSprite(90, 490, 50, 50);
 zombie.addImage(zombieImg);
 zombie.scale=0.2;
 zombie.velocityX=2;

 gameOver=createSprite(500, 200, 50, 50);
 gameOver.addImage(gameOverImg);

 restart=createSprite(500, 300, 50, 50);
 restart.addImage(restartImg);

 gameOver.scale=0.5;
 restart.scale=0.5;

 gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(600,590,1200,10);
  invisibleGround.visible = false;

  invisibleGround2 = createSprite(50, 620, 10, 400);
  invisibleGround2.visible=false;

  invisibleGround3=createSprite(1100, 620, 10, 400);
  invisibleGround3.visible=false;

  soldier.setCollider("rectangle",0,0,270, 370);
  soldier.debug = false;

  zombie.setCollider("rectangle",0,0,570, 970);
  zombie.debug = false;
  
  info=createSprite(800, 50, 10, 10);
  info.addImage(infoImg);
  info.scale=0.1;
}

function draw() {
 background(0);

 drawSprites();

 fill("white");
 textSize(20);
 textFont("Times New Roman")
 text("SCORE: "+ score, 850,50);

 //Info is made visible through out the game
  if (mousePressedOver(info)){
      fill("white");
    textSize(20);
    textFont("Arial")
    text("Press SPACE key to jump,"+"D to move forward,"+"W to shoot gun[backward]", 250,150);
  }

 if(gameState===PLAY){
    soldier.velocityX=-5;
    zombie.velocityX=2;
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX=-6;
    if(keyDown("space") && soldier.y >= 159) {
            soldier.velocityY = -12;
    }
    if (keyDown("D")){
      soldier.velocityX=5;
      zombie.velocityX=-2;
    }
    if (keyDown("W")){
      showBullet();
    }
    if (zombie.x>=1200){
      zombie.x=90;
    }
    soldier.velocityY = soldier.velocityY + 0.8;

    if(bg.x < 537 ){
        bg.x = bg.width/2;
    }

    //A loop is given which reads/parses each element in array and when bullet touches zombies,game is paused
    for(var i = 0; i<bullets.length;i++){
      if(bullets[i].isTouching(zombie)){
        pause();
      }
    }
    soldier.collide(invisibleGround);
    soldier.collide(invisibleGround3);
    soldier.collide(invisibleGround2);
    zombie.collide(invisibleGround);
    zombie.collide(invisibleGround2);
    zombie.collide(invisibleGround3);
    if(zombie.isTouching(soldier)){
        gameState=END;
    }
 }
 else if(gameState===END){
    gameOver.visible = true;
    restart.visible = true;
    
    bg.velocityX=0;
    zombie.velocityX=0;
    zombie.x=90;
    zombie.y=490;
    soldier.x=700;
    soldier.y=500;
    soldier.velocityX=0;
    soldier.collide(invisibleGround);

    
    if(mousePressedOver(restart)) {
      reset();
    }
 }
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  zombie.x=150;
  soldier.x=700;
  zombie.y=490;
  soldier.y=500;
  zombie.velocityX=2;
  score = 0;
}
function showBullet()
{
  bullet = createSprite(600,120,11,8);
  bullet.y = soldier.y
  bullet.x= soldier.x;
  bullet.velocityX = -20;
  bullet.lifetime = 1200;
  bullets.push(bullet);
}

function information(){
    info=createSprite(900,50,10,10);
    info.loadImage("info",infoImg);
}

function pause(){
    gameOver.visible = false;
    restart.visible = false;
    zombie.velocity=0;
    zombie.x=150;
    soldier.x=700;
    zombie.y=490;
    soldier.y=500;
    fill("white");
    textSize(20);
    textFont("Arial")
    text("YOU WON!!!", 250,350);
    
    fill("white");
    textSize(20);
    textFont("Arial")
    text("YOU SCORED:"+score, 250,10);
}