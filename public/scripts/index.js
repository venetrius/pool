const BALL_SIZE = 23;
const factor = 0.6; // determines the with of border of the table, as well as the size of the holes

class PoolBall extends Ball{
  constructor(coordinate, color, speedx, speedy){
    super(coordinate, BALL_SIZE, speedx, speedy);
    this.color = color;
  }
}

function placeBalls(){
  let colors = ['yellow', 'blue', 'Chocolate', 'purple','orange','green','red','black', 'Brown', 'Cyan', 'DarkGreen', 'DarkSalmon', 'DimGrey', 'GoldenRod', 'FireBrick'];
  let balls = [];
  let coordinates = [new Coordinate(800, 250)];
  let levels = [1, 3, 6, 10];
  for (var i = 0; i < 16; i++){
    let nextCoord = coordinates.shift();
    balls.push(new PoolBall(nextCoord, colors[i]));
    coordinates.push(new Coordinate(nextCoord.x + BALL_SIZE * 0.89, nextCoord.y - BALL_SIZE / 2))
    if(levels.includes(i)){
      coordinates.push(new Coordinate(nextCoord.x + BALL_SIZE * 0.89, nextCoord.y + BALL_SIZE / 2))
    }
  }
  return balls;
}

function drawTable(cb){
  let ctx = cb.getContext("2d");
  ctx.beginPath();
  ctx.lineWidth = "52";
  ctx.strokeStyle = "black";
  ctx.rect(0, 0, 1039, 531);
  ctx.stroke();
  const maxX = 1039;
  const maxY = 531;
  // add holes
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

function clearCanvas(c){
  const context = c.getContext('2d');
  context.clearRect(0, 0, c.width, c.height);
}

function draw(c, ball){
  var {coordinate, color} = ball;
  var {x, y } = coordinate;
  ctx = c.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, BALL_SIZE / 2, 0,2 * Math.PI);
  ctx.fill();
}

function singleWhite(c, container, ball){
  let count = 0;
  function render2(){
    container.getBounce(ball)
    ball.coordinate.x = ball.coordinate.x + ball.momentum.x;
    ball.coordinate.y = ball.coordinate.y + ball.momentum.y;
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
  let cb = document.getElementById("backgroundCanvas");
  drawTable(cb);
  const container = new ContainerP(BALL_SIZE * factor, 1016 + BALL_SIZE * factor , BALL_SIZE * factor, 508 + BALL_SIZE * factor); 
  var c = document.getElementById("myCanvas");
  balls = placeBalls();
  balls.forEach(ball => {
    draw(cb, ball);
  });
  const whiteBall = new PoolBall(new Coordinate(200, 255),'white', 10, 5);
  draw(c,whiteBall);
  singleWhite(c, container, whiteBall); // single white ball bounceing
  
});




