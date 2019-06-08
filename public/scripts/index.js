const BALL_SIZE = 40;

class Coordinate{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  copy(){
    return new Coordinate(this.x, this.y);
  }
}

class Ball{
  constructor(coordinate, color){
    this.coordinate = coordinate
    this.color = color;
  }
}

function initBoard(){
  var colors = ['yellow', 'blue', 'Chocolate', 'purple','orange','green','red','black', 'Brown', 'Cyan', 'DarkGreen', 'DarkSalmon', 'DimGrey', 'GoldenRod', 'FireBrick'];
  var balls = [];
  var coordinate = new Coordinate(800, 250);
  var coordinate2 = new Coordinate(800, 250);
  var coordinates = [coordinate];
  var levels = [1, 3, 6, 10];
  for (var i = 0; i < 16; i++){
    let nextCoord = coordinates.shift();
    balls.push(new Ball(nextCoord, colors[i]));
    coordinates.push(new Coordinate(nextCoord.x + BALL_SIZE * 0.89, nextCoord.y - BALL_SIZE / 2))
    if(levels.includes(i)){
      coordinates.push(new Coordinate(nextCoord.x + BALL_SIZE * 0.89, nextCoord.y + BALL_SIZE / 2))
    }
  }
  return balls;
}

function draw(c, ball ){
  var {coordinate, color} = ball;
  var {x, y } = coordinate;
  ctx = c.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x,y,BALL_SIZE/2,0,2*Math.PI);
  ctx.fill();
}
// Code to run when page is loaded
function draw2(i, ctx,  c){
   const context = c.getContext('2d');
   context.clearRect(0, 0, c.width, c.height);
   ctx.beginPath();
   ctx.fillStyle = "white";
   ctx.arc(95+i,50+i,40,0,2*Math.PI);
   ctx.fill();
   ctx.beginPath();
   ctx.fillStyle = "red";
   ctx.arc(800-i,50+i,40,0,2*Math.PI);
   ctx.fill();
 }

function move(ctx, c) {
  let time = 0;  
  function render(){
    draw2(time/2, ctx, c)
    if (time > 1000) {
      clearInterval(id);
    }
    time += 10;
  }
  var id = setInterval(render, 10);  
}

$( document ).ready(function() {
  console.log('hello there')
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  //move(ctx, c);
  balls = initBoard();
  console.log(balls)
  balls.forEach(ball => {
    draw(c, ball);
  });
});




