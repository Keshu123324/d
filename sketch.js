var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var database;
var distance = 0;

var form, player, game;

var survivors, survivor1, survivor2, survivor3, survivor4;        

var horror_house, survivor1_img, survivor2_img, survivor3_img, survivor4_img,survivor5_img;
var backgroundImage;

function preload(){
  backgroundImage=loadImage("images/deadline image.png");
 // horror_house = loadImage("images/track.jpg");
 // survivor1_img = loadImage("images/car1.png");
 // survivor2_img = loadImage("images/car2.png");
 // survivor3_img = loadImage("images/car3.png");
 // survivor4_img = loadImage("images/car4.png");
 // survivor5_img = loadImage("images/car4.png");
  
 // ground = loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
