class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){     
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
   
   }

  play(){

    form.hide();

    survivor1 = createSprite(100,200,50,50);
    //survivor1.addImage();
    survivor2 = createSprite(300,200,50,50);
    //survivor2.addImage();
    survivor3 = createSprite(500,200,50,50);
    //survivor3.addImage();
    survivor4 = createSprite(700,200,50,50);
    //survivor4.addImage();
    
    survivors = [survivor1,survivor2,survivor3,survivor4];
    Player.getPlayerInfo();
    player.getSurvivorsAtEnd();
   
    
    if(allPlayers !== undefined){
     // background(rgb(198,135,103));
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        survivors[index-1].x = x;
        survivors[index-1].y = y;

        if (index === player.index){
        //  stroke(10);
        //  fill("red");
        //  ellipse(x,y,60,60);
          survivors[index - 1].shapeColor = "red";
          camera.position.x = survivors[index-1].x;
          camera.position.y = survivors[index-1].y;
        }
       
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){

      survivors[index-1].y-=3;
     
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){

      survivors[index-1].y+=3;
     
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){

      survivors[index-1].x-=3;
     
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){

      survivors[index-1].x+=3;
     
    }


    if(player.live === 0){
      gameState = 2;
      player.rank = player.rank + 1;
      Player.updateSurvivorsAtEnd(player.rank);
    }
   
    drawSprites();
  }


  end(){
    console.log("Game Ended");
    console.log("Your rank is "+player.rank);
  }
}
