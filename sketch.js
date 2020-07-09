//Create variables here
var dog, dogIMG, happyDog, happyDogIMG, database, foodS, foodStock;
//var feed, addFood, fedTime, lastFed, foodObj;

function preload(){
  //load images here
  dogIMG = loadImage("images/dogImg.png");

  happyDogIMG = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,1,1);
  dog.addImage(dogIMG);
  dog.scale = 0.5;
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  /*foodObj = new Food(100,100);

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);*/
}


function draw() {
  background(46,139,87);

  //foodObj.display();

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogIMG);
  }

  drawSprites();

  //add styles here

  /*fedTime database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });*/
  
  fill(255,255,254);
  textSize(15);
  text("Press up arrow key to feed the dog",150,30);
  /*if(lastFed >= 12){
    text("Last Feed : " + lastFed%12 + " PM",350,30);
  }else if(lastFeed === 0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : " + lastFed + " AM",350,30);
  }*/

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

