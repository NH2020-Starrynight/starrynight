// DRAWING MODULE


// Obtain a reference to the canvas element using its id.
var canvas = document.getElementById('nightSky');
// Obtain a graphics context on the canvas element for drawing.
var ctx = canvas.getContext('2d');

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function Star(x, y, r) {
  this.x = x;
  // NOTE: use percentage value
  this.y = y;
  this.r = r;
  this.colour = chooseColour(); // random colour
  this.alpha = 0; // start at zero
}

function chooseColour() {
  let colours = ["#e9e9e9", "#b6d3e9", "#ec8b69"]
  return (colours[Math.floor(Math.random()*(colours.length+1))])
}

Star.prototype.constructor = Star;

let stars = []


function printMousePos(event) {
    x = event.clientX;
    y = event.clientY;

    newStar(x, y)
}

function randomStar() {
  newStar(Math.floor(Math.random()*(window.innerWidth)), Math.floor(Math.random()*(window.innerHeight)));
}

function newStar(x, y) {
  stars.push(new Star(x/window.innerWidth, y/window.innerHeight, 5))
}
  
document.addEventListener("click", printMousePos); // add event

function draw() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    //...drawing code...

    //ctx.clearRect(0, 0, canvas.width, canvas.height); // clear rectangle
    
    /*
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = '5';
    ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    Debug
    */ 

    stars.forEach(function(item, index, arr) {



      ctx.beginPath();
      ctx.globalAlpha = item.alpha

      ctx.arc(item.x*window.innerWidth, item.y*window.innerHeight, item.r, 0, 2 * Math.PI);
      ctx.fillStyle = item.colour;
      ctx.fill();

      item.alpha += 0.01

      ctx.globalAlpha = 1
      ctx.closePath();
    })
  
  }

  setInterval(randomStar, 1500);
  // star generator

  setInterval(draw, 10);
  // drawer

  