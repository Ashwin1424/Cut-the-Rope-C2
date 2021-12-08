const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var rope;
var fruit;
var fruitCon;
var backgroundImg, fruitImg, rabbitImg;
var rabbit;
var button;

function preload(){
  backgroundImg = loadImage("background.png");
  fruitImg = loadImage("melon.png");
  rabbitImg = loadImage("Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  imageMode(CENTER);


  ground = new Ground(250, 690, 500, 20);

  rope = new Rope(6, {x:245, y:30});

  var fruitOptions = {
    density:0.001
  }
  fruit = Bodies.circle(300, 300, 15, fruitOptions);
  Matter.Composite.add(rope.body, fruit);

  fruitCon = new Link(rope, fruit);

  rabbit = createSprite(250, 600, 100, 100);
  rabbit.addImage(rabbitImg);
  rabbit.scale = 0.2;

  button = createImg("cut_button.png");
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(51);
  image(backgroundImg, width/2, height/2, width, height)
  Engine.update(engine);
   
  ground.show();
  rope.show();
  image(fruitImg, fruit.position.x, fruit.position.y, 60, 60);

  drawSprites();
}


function drop(){
  rope.break();
  fruitCon.detatch();
  fruitCon = null;
}


