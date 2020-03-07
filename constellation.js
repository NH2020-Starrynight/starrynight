// DRAWING MODULE


// Obtain a reference to the canvas element using its id.
var canvas = document.getElementById('nightSky');
// Obtain a graphics context on the canvas element for drawing.
var ctx = canvas.getContext('2d');

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function Star(x, y, r, colour) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.colour = colour;
}

Star.prototype.constructor = Star;

let stars = []

function printMousePos(event) {
    x = event.clientX;
    y = event.clientY;

    stars.push(Star(x, y, 10, "#e9e9e9"))
  }
  
document.addEventListener("click", printMousePos); // add event

function draw() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    //...drawing code...

    //ctx.clearRect(0, 0, canvas.width, canvas.height); // clear rectangle
    
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = '5';
    ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);

    stars.forEach(function(item, index, array) {
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.r, 0, 2 * Math.PI);
      ctx.fillStyle = item.colour;
      ctx.fill();
      ctx.closePath();
    })

    

  }
  setInterval(draw, 10);