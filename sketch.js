var bg,bgImg;
var girl,girlrunning,girldead;
var zombie,zombierunning,zombieattack;
var invisibleGround;
var obGroup,ob1,ob2,ob3,ob4;
var s=0;
var gameState="play";
var over,overImg;
var bgMusic,die;


function preload(){
bgImg=loadImage("BG.jpg");

girlrunning=loadAnimation("assets/Run (1).png","assets/Run (2).png","assets/Run (3).png","assets/Run (4).png","assets/Run (5).png","assets/Run (6).png","assets/Run (7).png","assets/Run (8).png","assets/Run (9).png","assets/Run (10).png","assets/Run (11).png");
girldead=loadAnimation("assets/Dead (30).png");

zombierunning=loadAnimation("assets/Walk (1).png","assets/Walk (2).png","assets/Walk (3).png","assets/Walk (4).png","assets/Walk (5).png","assets/Walk (6).png","assets/Walk (7).png","assets/Walk (8).png","assets/Walk (9).png","assets/Walk (10).png");
zombieattack=loadAnimation("assets/Attack (2).png","assets/Attack (4).png","assets/Attack (6).png","assets/Attack (8).png");

ob1=loadImage("assets/obstacle1.png");
 ob2=loadImage("assets/obstacle2.png");
 ob3=loadImage("assets/obstacle3.png");
 ob4=loadImage("assets/obstacle4.png");
 
 overImg=loadImage("OVER.png");

 bgMusic=loadSound("bgMusic.mp3");

 die=loadSound("assets/die.mp3");
}

function setup() {

 bgMusic.play();
 bgMusic.loop();
 bgMusic.setVolume(0.1);

 createCanvas(1500,720);

bg=createSprite(750,360);
bg.addImage(bgImg);
bg.scale=1.6;
bg.velocityX=-2;

girl=createSprite(900,600);
girl.addAnimation("running",girlrunning);
girl.addAnimation("dead",girldead);
girl.scale=0.4;

zombie=createSprite(230,550);
zombie.addAnimation("running",zombierunning);
zombie.addAnimation("attack",zombieattack);
zombie.scale=0.5;

invisibleGround=createSprite(750,690,1500,10);
invisibleGround.visible=false;
//invisibleGround.debug=true;

over=createSprite(750,300);
over.addImage(overImg);
over.visible=false;

//girl.debug=true;
girl.setCollider("circle",0,0,200);

obGroup=new Group();


}

function draw() {
 background(0);

 if(gameState==="play"){

 
if(bg.x<600){
    bg.x=bg.width/1.5;
}
s=s+Math.round(getFrameRate()/60);

if(keyDown("space")&& girl.y>=550){
    girl.velocityY=-12;
}
 girl.velocityY=girl.velocityY+0.6;

 zombie.velocityY=zombie.velocityY+0.6;
 
spawnObstacles();

if(obGroup.isTouching(zombie)){
    zombie.velocityY=-12;
}

if(obGroup.isTouching(girl)){
    
    zombie.x=girl.x;
    obGroup.setVelocityXEach(0);

    zombie.changeAnimation("attack");
    zombie.velocityY=0;
    
    girl.changeAnimation("dead");
    
    bg.velocityX=0;

    obGroup.destroyEach();

    over.visible=true;

    die.play();
    die.setVolume(0.3);

    gameState="end";


}
 }
 drawSprites();

 fill("pink");
 textFont("cursive");
 textSize(28);
 text(" SCORE: "+s,120,100);
 girl.collide(invisibleGround);

 zombie.collide(invisibleGround);



}

function spawnObstacles(){
if(frameCount % 90===0){
    var ob=createSprite(1500,670,10,40);
    ob.velocityX=-6;
    var k=Math.round(random(1,4));
    switch(k){
        case 1:ob.addImage(ob1);
        break;

        case 2:ob.addImage(ob2);
        break;

        case 3:ob.addImage(ob3);
        break;

        case 4:ob.addImage(ob4);
        break;

        default:break;
    }
    ob.scale=0.2;

    obGroup.add(ob);

//    ob.debug=true;

    ob.setCollider("circle",0,0,0.5);
    
}
}