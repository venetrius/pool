const BALL_SIZE = 23;

class Ball{
  constructor(coordinate, color){
    this.coordinate = coordinate
    this.color = color;
  }
}
Ball.prototype.radius = BALL_SIZE;
console.log(Ball.prototype.radius);
Ball.prototype[movableIF] = function() {
  return {
      x : this.coordinate.x,
      y : this.coordinate.y,
      radius : Ball.prototype.radius
  };
}
function initBoard(){
  let colors = ['yellow', 'blue', 'Chocolate', 'purple','orange','green','red','black', 'Brown', 'Cyan', 'DarkGreen', 'DarkSalmon', 'DimGrey', 'GoldenRod', 'FireBrick'];
  let balls = [];
  //let coordinate = new Coordinate(800, 250);
  let coordinates = [new Coordinate(800, 250)];
  let levels = [1, 3, 6, 10];
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
function clearCanvas(c){
  const context = c.getContext('2d');
  context.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();
  ctx.lineWidth = "52";
  ctx.strokeStyle = "black";
  ctx.rect(0, 0, 1039, 531);
  ctx.stroke();
  const factor = 0.6; 
  const maxX = 1039;
  const maxY = 531;
  ctx.beginPath();
  ctx.fillStyle = 'grey';
  ctx.arc(BALL_SIZE,BALL_SIZE,BALL_SIZE*factor,0,2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = 'grey';
  ctx.arc(maxX - BALL_SIZE,maxY - BALL_SIZE,BALL_SIZE*factor,0,2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = 'grey';
  ctx.arc(BALL_SIZE,maxY - BALL_SIZE,BALL_SIZE*factor,0,2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = 'grey';
  ctx.arc(maxX - BALL_SIZE,BALL_SIZE,BALL_SIZE*factor,0,2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = 'grey';
  ctx.arc(maxX / 2 - BALL_SIZE,maxY - BALL_SIZE,BALL_SIZE*factor,0,2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = 'grey';
  ctx.arc(maxX / 2 - BALL_SIZE,BALL_SIZE,BALL_SIZE*factor,0,2*Math.PI);
  ctx.fill();
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

function singleWhite(c, container, ball, speed){
  let count = 0;
  function render2(){
    /*if(container.isHitByCircle(ball)){
      speed.x = + speed.y;
      speed.y = - speed.x;}*/
    //console.log(count);
    speed = container.getBounce(ball, speed)
    ball.coordinate.x = ball.coordinate.x + speed.x;
    ball.coordinate.y = ball.coordinate.y + speed.y;
 //   console.log(container.isHitByCircle(ball))
/*
    if(container.isHitByCircle(ball)){
      speed.x = - speed.x;
      speed.y = - speed.y;
      ball.coordinate.x = ball.coordinate.x +2 * speed.x;
      ball.coordinate.y = ball.coordinate.y + 2*  speed.y;      
    }*/
    clearCanvas(c);
    draw(c, ball);
    count ++;
    if (count > 2000){
      clearInterval(id);
    }
  }
  var id = setInterval(render2, 10);  
}

$( document ).ready(function() {
//  initBoard();
  const factor = 0.6;
  const container = new ContainerP(BALL_SIZE * factor, 1016, BALL_SIZE * factor, 508); 
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  //move(ctx, c);
  balls = initBoard();
  balls.forEach(ball => {
    draw(c, ball);
  });
  const whiteBall = new Ball(new Coordinate(200, 255),'white');
 // singleWhite();
 // draw(c,whiteBall);
  singleWhite(c, container, whiteBall, {x:2, y:2});
});




