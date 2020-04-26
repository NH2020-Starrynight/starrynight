// DRAWING MODULE


// Obtain a reference to the canvas element using its id.
var canvas = document.getElementById('nightSky');
// Obtain a graphics context on the canvas element for drawing.
var ctx = canvas.getContext('2d');

var START_AMOUNT = 7;

var TEXT_ALPHA = 1;

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

frameNumber = 0;

function distance(s1, s2) {
  return Math.sqrt(Math.pow(s2.x-s1.x, 2) + Math.pow(s2.y-s1.y, 2))
}

function Star(x, y, r) {
  this.x = x;
  // NOTE: use percentage value
  this.y = y;
  this.r = r;
  this.colour = chooseColour(); // random colour
  this.alpha = 0; // start at zero
  this.neighbours = [] // near neighbors

}

Star.prototype.constructor = Star;


function LocatorCircle(r) {
  this.x = 0.5;
  this.y = 0.5;
  this.r = r; // in terms of percentage
  this.z = 0;
}

LocatorCircle.prototype.constructor = LocatorCircle();

function chooseColour() {
  let colours = ["#e9e9e9", "#b6d3e9", "#ec8b69", "#f6d65a", "#fb5151", "#9ebeff"]
  return (colours[Math.floor(Math.random()*(colours.length+1))])
}

let stars = []

function populateNeighbours(star) {
  // connect to neighbours

  DIST_LIMIT = 0.2;

  
  let supercount = 0;

  for (let i = stars.length-1; i >=0 && star.neighbours.length < 4 && (stars[i].neighbours.length < 2 || (supercount <= 1 && stars[i].neighbours.length < 3)); i-=1) {
    
    if (stars[i] != star && distance(stars[i], star) < DIST_LIMIT) { // TODO check equality
      star.neighbours.push(stars[i])
      stars[i].neighbours.push(star)
    }

    if (stars[i].neighbours.length >= 2) {
      supercount += 1;
    }
  } 
}

let circles = []

let paths = []


function click(event) {
    x = event.clientX;
    y = event.clientY;
    if(stars.length == 0) {
      var audio = new Audio('Interstellar Theme.mp3');
      audio.play();
    }
    
    newStar(x, y)
}

function distrFunc(n) {
  return 1/(1+Math.exp((-8)*(n-0.5)))
}

function randomStar() {
  if (stars.length >= START_AMOUNT) {
    newStar(Math.floor(distrFunc(Math.random())*(window.innerWidth)), Math.floor(Math.random()*(window.innerHeight)));
  }
  
}

function newStar(x, y) {
  stars.push(new Star(x/window.innerWidth, y/window.innerHeight, Math.floor(Math.random()*3)+3))
  populateNeighbours(stars[stars.length-1]);
}

function locator() {

  if (stars.length >= START_AMOUNT) {
    circles.push(new LocatorCircle(1))
    console.log("circle")
  }
}

function draw() {
    frameNumber++;

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

    if (stars.length >= START_AMOUNT && TEXT_ALPHA > 0) {
      TEXT_ALPHA *= 0.99
    }

    var txt = ""

    if (stars.length == 0) {
      txt = "Click to place stars. Place down 7 stars, then sit back and watch the show."
    }
    else if (stars.length < START_AMOUNT){
      txt = "Place down " + (START_AMOUNT - stars.length) + " more star(s), then sit back and enjoy the show."
    }
    else {
      txt = "Sit back, and enjoy the show."
    }

    if (TEXT_ALPHA > 0.01) {
      ctx.globalAlpha = TEXT_ALPHA;
      ctx.font = "60px Immortal";
      ctx.fillStyle = "#ffffff"
      ctx.fillText("A Starry Night", 10, 70);
      ctx.font = "15px Immortal";
      ctx.fillText("A project by Tony Chung, Shahriyar Habib, Don Min, and Mingde Yin", 10, 110)
      ctx.font = "20px Immortal";
      ctx.fillText(txt, 10, 150)
      ctx.fillText("You can continue to place more stars simply by clicking.", 10, 170)
      ctx.globalAlpha = 1;
    }

    

    stars.forEach(function(item, index, arr) {

      if (item.r > 0.5) {
        // DRAW LINES
        item.neighbours.forEach(function(s, index, arr) {

          if (s.alpha < item.alpha) {
            ctx.globalAlpha = s.alpha
          }
          else{
            ctx.globalAlpha = item.alpha
          }
          ctx.beginPath();
          ctx.moveTo(item.x*ctx.canvas.width, item.y*ctx.canvas.height);
          ctx.lineTo(s.x*ctx.canvas.width, s.y*ctx.canvas.height);
          
          ctx.strokeStyle = "#f2e3aa"
          ctx.lineWidth = 1;

          ctx.stroke();
          
          ctx.closePath();
          ctx.globalAlpha = 1
        })
  
        // DRAW STAR
        ctx.beginPath();
        ctx.globalAlpha = item.alpha
  
        deviationX = 0.5 - item.x;
        deviationY = 0.5 - item.y;

        if (frameNumber % 6 == 0 && item.alpha >= 1) {
          if(Math.random() > 0.5) {
            item.alpha = 0.75
          }
        }
  
        ctx.arc(item.x*ctx.canvas.width, item.y*ctx.canvas.height, item.r, 0, 2 * Math.PI);
        ctx.fillStyle = item.colour;
        ctx.fill();
  
        if (item.alpha < 1) {
          item.alpha += 0.005
        }
        
  
        ctx.globalAlpha = 1
        ctx.closePath();
  
        if (stars.length >= START_AMOUNT) {
          // CHANGE VALUES
          deviationX = 0.5 - item.x;
          deviationY = 0.5 - item.y;
  
          SPEEDFACTOR = 3
  
          deviationX /= (10000/SPEEDFACTOR);
          deviationY /= (10000/SPEEDFACTOR);
  
          item.x += deviationX;
          item.y += deviationY;
          item.r *= 0.9998
  
          if (item.r < 0.1) {
            stars.r
          }
       }
      }
      else{
        item.alpha *= 0.999;
      }     

    })
    
    circles.forEach(function(item, index, arr) {
        // DRAW locator
        ctx.beginPath();
        ctx.globalAlpha =  0.5
  
        ctx.arc(0.5*ctx.canvas.width, 0.5*ctx.canvas.height, item.r*canvas.height, 0, 2 * Math.PI);
  
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();
  
        item.r *= 0.9998
  
        ctx.globalAlpha = 1
        ctx.closePath();  
      })

    
  
  }

  setInterval(draw, 10);
  // drawer

  setInterval(randomStar, 500);
  // star generator

  setInterval(locator, 12000)

  document.addEventListener("click", click); // add event

  